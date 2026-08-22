import fs from 'node:fs';

const file = process.argv[2];
if (!file) { console.error('usage: node scripts/validate-candidate.mjs <candidate.json>'); process.exit(2); }

const c = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
const warn = [];

const req = (cond, msg) => { if (!cond) errors.push(msg); };
req(c.provider && typeof c.provider === 'string', 'provider required');
req(c.product && typeof c.product === 'string', 'product required');
req(c.offer_type && typeof c.offer_type === 'string',
    'offer_type required (one of: free | subscription | promo | unlock)');
req(c.price && typeof c.price === 'object', 'price object required (use {} if zero-fee)');
req(c.official_sources && Array.isArray(c.official_sources) && c.official_sources.length > 0,
    'at least one official_sources[] URL required');
if (Array.isArray(c.official_sources)) {
  c.official_sources.forEach((u,i) => {
    try { const h = new URL(u).hostname;
      if (/reddit|twitter|x\.com|blog\.(?!openrouter)/i.test(h) && !h.includes('docs')) warn.push(`source[${i}] may not be official: ${u}`);
    } catch { errors.push(`source[${i}] is not a valid URL`); }
  });
}
req(c.discovered_at && !isNaN(Date.parse(c.discovered_at)), 'discovered_at ISO date required');
req(['high','medium','low'].includes(c.confidence), 'confidence must be high|medium|low');
if (!c.models || !Array.isArray(c.models)) warn.push('models[] missing — offer applies platform-wide?');
if (c.offer_type === 'subscription' && !(c.price?.recurring_usd ?? c.price?.month_usd)) errors.push('subscription requires price.recurring_usd or price.month_usd');
if ((c.quota == null) && (c.price?.allowance_usd == null)) warn.push('no quota and no allowance — how much do you get?');

console.log(errors.length ? `FAIL\n${errors.map(e=>'  ✗ '+e).join('\n')}` : `PASS${warn.length ? `\nwarnings:\n${warn.map(w=>'  ⚠ '+w).join('\n')}` : ''}`);
process.exit(errors.length ? 1 : 0);
