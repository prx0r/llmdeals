import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/seed.json'), 'utf8'));

const providerById = Object.fromEntries(seed.providers.map(p => [p.id, p]));
const offerById = Object.fromEntries(seed.offers.map(o => [o.id, o]));
const modelById = Object.fromEntries(seed.models.map(m => [m.id, m]));
const assessmentByRoute = Object.fromEntries(seed.assessments.map(a => [a.route_id, a]));

function blended(inP, outP) { return inP + outP * 3; }

// Agent request profile from dell2 verified math (graph.py): 830 input +
// 71,500 cache-read + 295 output tokens per request. Uses PER-MODEL cached
// price (fixes dell2's bug of hardcoding MiMo's 0.0028 for every model).
const PROFILE = { in: 830, cached: 71500, out: 295 };
function agentCostPerReq(m) {
  const cachedRate = m.cache_per_m ?? m.in_per_m * 0.1;
  return (m.in_per_m * PROFILE.in + cachedRate * PROFILE.cached + m.out_per_m * PROFILE.out) / 1e6;
}
function effectiveMultiple(route, offer, m) {
  if (!route.requests_per_month || !m || m.in_per_m == null) return null;
  return +((route.requests_per_month * agentCostPerReq(m)) / offer.price_recurring_usd).toFixed(2);
}

// Deterministic profile scoring — formula documented on /methodology
function qualityScore(m, role) {
  let cap = 0;
  if (m.tools) cap += 0.25;
  if (m.vision) cap += 0.15;
  if (m.json) cap += 0.10;
  const ctxK = parseInt(m.ctx) || 0;
  cap += ctxK >= 200 ? 0.20 : ctxK >= 128 ? 0.15 : 0.05;
  const roleBonus = { bulk_executor:0.10, orchestration:0.15, coding:0.20, reasoning:0.20,
                      premium_reasoning:0.25, balanced:0.10 }[role] ?? 0.05;
  return Math.min(1, cap + roleBonus);
}
function throughputScore(rpm, rpd) {
  if (rpm) return Math.min(1, rpm / 150000);
  if (rpd) return Math.min(1, rpd / 1000);
  return 0.15;
}
function reliabilityScore(confidence) {
  return { high:1, medium:0.7, low:0.4 }[confidence] ?? 0.5;
}

const PROFILES = {
  overall:  { weights:{ quality:.35, cost:.35, reliability:.20, throughput:.10 } },
  coding:   { weights:{ quality:.40, cost:.30, reliability:.20, throughput:.10 } },
  agentic:  { weights:{ quality:.30, cost:.25, reliability:.25, throughput:.20 } },
  research: { weights:{ quality:.35, cost:.25, reliability:.20, throughput:.20 } },
};

function scoreRoute(route, offer, model, assessment) {
  const conf = assessment?.confidence || 'medium';
  const q = qualityScore(model, route.role ?? null);
  const c = 1 - Math.min(1, blended(model.in_per_m ?? 1, model.out_per_m ?? 1) / 6);
  const rel = reliabilityScore(conf);
  const t = throughputScore(route.requests_per_month, offer.free_requests_per_day);
  const profiles = {};
  for (const [key, p] of Object.entries(PROFILES)) {
    const w = p.weights;
    profiles[key] = Math.round(100 * (q*w.quality + c*w.cost + rel*w.reliability + t*w.throughput));
  }
  return { quality:+q.toFixed(2), cost:+c.toFixed(2), reliability:rel, throughput:+t.toFixed(2), profiles };
}

// Mega-deal detector — deterministic port of dell/app/mega_deals.py.
// Every reason is a stated fact; score >= 20 flags the deal. Sub-1x effective
// multiple disqualifies (subscription worse than pay-as-you-go).
function detectMega(d, effMult) {
  let score = 0; const reasons = [];
  if (d.requests_per_month >= 100000) {
    reasons.push(`${Math.round(d.requests_per_month/1000)}K req/mo quota`);
    score += Math.min(40, d.requests_per_month / 5000);
  }
  if (effMult && effMult >= 3) { reasons.push(`${effMult}x effective value`); score += Math.min(35, effMult * 5); }
  else if (effMult && effMult >= 2) { reasons.push(`${effMult}x effective value`); score += 20; }
  if (d.deal_type === 'free' && d.free_requests_per_day >= 1000) {
    reasons.push(`free ${d.free_requests_per_day} req/day`); score += 25;
  }
  if (d.kind === 'offer' && d.allowance_usd_ref >= 50) { reasons.push('$50+ monthly pool'); score += 20; }
  const disqualified = effMult != null && effMult < 1;
  if (disqualified) return null;
  if (!reasons.length || score < 20) return null;
  const category = reasons.some(r=>r.includes('req/mo')) ? 'capacity_anomaly'
    : reasons.some(r=>r.includes('effective')) ? 'usage_multiplier'
    : reasons.some(r=>r.includes('free')) ? 'high_quota_free' : 'price_anomaly';
  return { score: Math.min(100, Math.round(score)), reasons, category };
}

function badgesFor(offer, model) {
  const b = [];
  if (offer.deal_type === 'free' || offer.price_recurring_usd === 0) b.push('Free');
  if (offer.deal_type === 'promo') b.push('Promo');
  if (offer.deal_type === 'unlock') b.push('Unlock');
  if (offer.expires_after_days) b.push('Expires');
  if (model?.tools) b.push('Tools');
  if (model?.vision) b.push('Vision');
  const ctxK = model ? parseInt(model.ctx) || 0 : 0;
  if (ctxK >= 200) b.push('Long context');
  return [...new Set(b)];
}

const deals = [];
for (const route of seed.deal_routes) {
  const offer = offerById[route.offer];
  const model = modelById[route.model];
  const a = assessmentByRoute[route.id];
  if (!offer || !model) continue;
  const ratio = (offer.price_recurring_usd ?? 10) / (offer.allowance_month_usd ?? 60);
  const effMult = effectiveMultiple(route, offer, model);
  const row = {
    kind:'route', slug:route.slug, id:route.id,
    title:`${offer.product} + ${model.name}`, model:model.name, model_id:model.id,
    provider:providerById[offer.provider]?.name, provider_id:offer.provider,
    product:offer.product, deal_type:offer.deal_type, label:offer.label,
    price_intro_usd:offer.price_intro_usd, price_recurring_usd:offer.price_recurring_usd,
    allowance_month_usd:offer.allowance_month_usd,
    requests_per_month:route.requests_per_month, role:route.role,
    ongoing_value_multiple:route.ongoing_value_multiple, intro_value_multiple:route.intro_value_multiple,
    effective_input_per_m:+((model.in_per_m ?? 0)*ratio).toFixed(5),
    effective_output_per_m:+((model.out_per_m ?? 0)*ratio).toFixed(5),
    list_input_per_m:model.in_per_m, list_output_per_m:model.out_per_m,
    ctx:model.ctx, rating:a?.rating ?? 'unrated', rank_score:a?.rank_score ?? null,
    confidence:a?.confidence ?? 'unknown',
    why_good:a?.why_good ?? null, catch:a?.catch ?? null, best_for:a?.best_for ?? [],
    source_url:offer.source_url, observed_at:offer.observed_at,
    affiliate_url:offer.affiliate_url,
    scores:scoreRoute(route, offer, model, a),
    badges:badgesFor(offer, model),
  };
  row.effective_value_multiple = effMult;
  row.vs_payg = effMult != null && effMult < 1 ? 'worse' : effMult >= 1 ? 'better' : null;
  row.agent_cost_per_req = +(agentCostPerReq(model)).toPrecision(3);
  row.mega = detectMega(row, effMult);
  deals.push(row);
}
for (const offer of seed.offers) {
  if (!offer.slug) continue;
  const a = assessmentByRoute[offer.id];
  deals.push({
    kind:'offer', slug:offer.slug, id:offer.id,
    title:offer.product, model:null, model_id:null,
    provider:providerById[offer.provider]?.name, provider_id:offer.provider,
    product:offer.product, deal_type:offer.deal_type, label:offer.label,
    price_intro_usd:offer.credit_usd ?? offer.required_balance_usd ?? offer.price_month_usd ?? 0,
    price_recurring_usd:offer.price_month_usd ?? 0,
    allowance_month_usd:null,
    requests_per_month:null, free_requests_per_day:offer.free_requests_per_day ?? null,
    role:null, ongoing_value_multiple:null, intro_value_multiple:null,
    effective_input_per_m:null, effective_output_per_m:null,
    list_input_per_m:null, list_output_per_m:null,
    ctx:null, rating:a?.rating ?? 'unrated', rank_score:a?.rank_score ?? null,
    confidence:a?.confidence ?? 'unknown',
    why_good:a?.why_good ?? null, catch:a?.catch ?? null, best_for:a?.best_for ?? [],
    note:offer.note ?? null,
    source_url:offer.source_url, observed_at:offer.observed_at,
    affiliate_url:offer.affiliate_url,
    scores:scoreRoute({}, offer, {tools:false,vision:false,json:false,ctx:'0'}, a),
    badges:badgesFor(offer, null),
  });
}
deals.sort((x,y) => (y.rank_score ?? -1) - (x.rank_score ?? -1));

// Top 5: dedupe by product family so one subscription doesn't fill the board
const seenFamilies = new Set();
const top = [];
for (const d of deals) {
  if (d.rank_score == null) continue;
  const fam = d.title.split(' + ')[0] + '|' + d.label;
  if (seenFamilies.has(fam)) continue;
  seenFamilies.add(fam);
  top.push(d);
  if (top.length === 5) break;
}

// ---- change tracking ----
const histDir = path.join(ROOT, 'data/history');
fs.mkdirSync(histDir, { recursive:true });
const latestPath = path.join(histDir, 'latest.json');
const prev = fs.existsSync(latestPath) ? JSON.parse(fs.readFileSync(latestPath,'utf8')) : null;

const stripQuotes = o => { const c = {...o}; delete c.quotes; delete c.affiliate_url; delete c.affiliate_status; return c; };
const changes = [];
if (prev) {
  const prevById = Object.fromEntries(prev.offers.map(o => [o.id, stripQuotes(o)]));
  for (const o of seed.offers) {
    const before = prevById[o.id];
    const now = stripQuotes(o);
    if (!before) { changes.push({ offer_id:o.id, type:'added', detected_at:new Date().toISOString() }); continue; }
    for (const k of Object.keys(now)) {
      if (JSON.stringify(before[k]) !== JSON.stringify(now[k])) {
        changes.push({ offer_id:o.id, type:'changed', field:k, old:before[k], new:now[k], detected_at:new Date().toISOString() });
      }
    }
  }
  for (const o of prev.offers) {
    if (!seed.offers.find(x => x.id === o.id)) changes.push({ offer_id:o.id, type:'removed', detected_at:new Date().toISOString() });
  }
}
fs.writeFileSync(latestPath, JSON.stringify(seed, null, 2));
const datedSnapshot = path.join(histDir, `${new Date().toISOString().slice(0,10)}-seed.json`);
if (!fs.existsSync(datedSnapshot)) fs.writeFileSync(datedSnapshot, JSON.stringify(seed, null, 2));

const apiPayload = {
  generated_at: new Date().toISOString(),
  schema_version: 'llmdeals.api.v1',
  counts: { providers:seed.providers.length, offers:seed.offers.length, models:seed.models.length, deals:deals.length },
  top, deals, changes
};

for (const name of ['top','deals','changes']) {
  const dir = path.join(ROOT, `web/public/api/v1`);
  fs.mkdirSync(dir, { recursive:true });
}
fs.writeFileSync(path.join(ROOT,'web/public/api/v1/top.json'), JSON.stringify({generated_at:apiPayload.generated_at, schema_version:apiPayload.schema_version, deals:top}, null, 2));
fs.writeFileSync(path.join(ROOT,'web/public/api/v1/deals.json'), JSON.stringify({generated_at:apiPayload.generated_at, schema_version:apiPayload.schema_version, counts:apiPayload.counts, deals}, null, 2));
fs.writeFileSync(path.join(ROOT,'web/public/api/v1/changes.json'), JSON.stringify({generated_at:apiPayload.generated_at, schema_version:apiPayload.schema_version, changes}, null, 2));
fs.mkdirSync(path.join(ROOT,'web/src/data'), { recursive:true });
fs.writeFileSync(path.join(ROOT,'web/src/data/seed.json'), JSON.stringify(seed, null, 2));
fs.writeFileSync(path.join(ROOT,'web/src/data/deals-derived.json'), JSON.stringify({top, deals, changes, counts: apiPayload.counts}, null, 2));

console.log(`build-data: ${deals.length} deals, top ${top.length}, ${changes.length} changes vs previous snapshot`);
