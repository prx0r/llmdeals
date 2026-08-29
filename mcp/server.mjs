#!/usr/bin/env node
/**
 * LLMDeals Oracle Stream — granular AI tool pricing data.
 * 
 * This is a READ-ONLY data source. No actions, no mutations.
 * Other systems (get-me-money, repute, hackathonhelp) consume this data.
 * 
 * Tools:
 *   llmdeals_deals      — all deals with scores
 *   llmdeals_models     — model specs (pricing, context, capabilities)
 *   llmdeals_providers  — provider registry
 *   llmdeals_search     — search by provider/category/capability
 *   llmdeals_cheapest   — cheapest option for a task type
 *   llmdeals_changes    — recent price/availability diffs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

// ── Load canonical data ────────────────────────────────────────────────────

function loadSeed() {
  const p = path.join(ROOT, 'data/seed.json');
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
}

function loadDeals() {
  const seed = loadSeed();
  const providers = Object.fromEntries((seed.providers || []).map(p => [p.id, p]));
  return (seed.offers || []).map(o => ({
    id: o.id,
    provider: providers[o.provider]?.name || o.provider || 'unknown',
    provider_id: o.provider,
    product: o.label || o.product || o.id,
    deal_type: o.deal_type,
    price: o.price_recurring_usd || o.price_intro_usd || 0,
    allowance_usd: o.allowance_month_usd || 0,
    limit_5h_usd: o.limit_5h_usd || 0,
    models_included: o.models_included || [],
    tags: [o.deal_type, o.provider],
    valid_from: o.valid_from,
    valid_until: o.valid_until,
  }));
}

function loadModels() {
  const seed = loadSeed();
  return seed.models || [];
}

function loadProviders() {
  const seed = loadSeed();
  return seed.providers || [];
}

// ── MCP Tools ──────────────────────────────────────────────────────────────

const TOOLS = [
  {
    name: 'llmdeals_deals',
    description: 'All current AI tool deals with scores, prices, and metadata. READ-ONLY data stream.',
    inputSchema: {
      type: 'object',
      properties: {
        sort: { type: 'string', enum: ['savings', 'price', 'quality', 'name'], default: 'savings' },
        limit: { type: 'number', default: 50 },
        free_only: { type: 'boolean' },
        provider: { type: 'string', description: 'Filter by provider name' },
      },
    },
  },
  {
    name: 'llmdeals_models',
    description: 'Model registry: pricing, context windows, capabilities, benchmarks. READ-ONLY.',
    inputSchema: {
      type: 'object',
      properties: {
        provider: { type: 'string', description: 'Filter by provider' },
        search: { type: 'string', description: 'Search model names' },
      },
    },
  },
  {
    name: 'llmdeals_providers',
    description: 'Provider registry with all known AI tool providers. READ-ONLY.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'llmdeals_search',
    description: 'Search deals by provider, category, or capability keywords. READ-ONLY.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search keywords' },
        category: { type: 'string', description: 'Filter: inference, search, data, generation' },
        max_price: { type: 'number', description: 'Max price filter' },
        free_only: { type: 'boolean' },
      },
      required: ['query'],
    },
  },
  {
    name: 'llmdeals_cheapest',
    description: 'Find cheapest provider for a task type. READ-ONLY.',
    inputSchema: {
      type: 'object',
      properties: {
        task: { type: 'string', description: 'Task: chat, code, research, image, agent' },
        max_cost: { type: 'number', description: 'Max cost per request' },
      },
      required: ['task'],
    },
  },
  {
    name: 'llmdeals_changes',
    description: 'Recent price/availability changes across all tools. READ-ONLY.',
    inputSchema: { type: 'object', properties: {} },
  },
];

// ── Tool Handlers ──────────────────────────────────────────────────────────

async function handleTool(name, args) {
  const deals = loadDeals();
  const models = loadModels();
  const providers = loadProviders();

  switch (name) {
    case 'llmdeals_deals': {
      let sorted = [...deals];
      const sort = args.sort || 'savings';
      if (sort === 'savings') sorted.sort((a, b) => (b.savings_pct || 0) - (a.savings_pct || 0));
      else if (sort === 'price') sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      if (args.free_only) sorted = sorted.filter(d => d.price === 0);
      if (args.provider) sorted = sorted.filter(d => d.provider.toLowerCase().includes(args.provider.toLowerCase()));
      return { content: [{ type: 'text', text: JSON.stringify({ count: sorted.length, deals: sorted.slice(0, args.limit || 50) }, null, 2) }] };
    }

    case 'llmdeals_models': {
      let filtered = [...models];
      if (args.provider) filtered = filtered.filter(m => (m.provider || '').toLowerCase().includes(args.provider.toLowerCase()));
      if (args.search) filtered = filtered.filter(m => `${m.id} ${m.name} ${m.provider}`.toLowerCase().includes(args.search.toLowerCase()));
      return { content: [{ type: 'text', text: JSON.stringify({ count: filtered.length, models: filtered }, null, 2) }] };
    }

    case 'llmdeals_providers': {
      return { content: [{ type: 'text', text: JSON.stringify({ count: providers.length, providers }, null, 2) }] };
    }

    case 'llmdeals_search': {
      const q = (args.query || '').toLowerCase();
      let results = deals.filter(d => {
        const text = `${d.provider} ${d.product} ${d.deal_type} ${(d.tags || []).join(' ')}`.toLowerCase();
        return text.includes(q);
      });
      if (args.category) results = results.filter(d => (d.deal_type || '').toLowerCase().includes(args.category.toLowerCase()));
      if (args.max_price != null) results = results.filter(d => (d.price || 0) <= args.max_price);
      if (args.free_only) results = results.filter(d => d.price === 0);
      results.sort((a, b) => (a.price || 0) - (b.price || 0));
      return { content: [{ type: 'text', text: JSON.stringify({ count: results.length, deals: results }, null, 2) }] };
    }

    case 'llmdeals_cheapest': {
      const task = (args.task || '').toLowerCase();
      const taskMap = { chat: 'inference', code: 'inference', research: 'search', image: 'generation', agent: 'orchestration' };
      const cat = taskMap[task] || task;
      const candidates = deals.filter(d => `${d.provider} ${d.product} ${d.deal_type}`.toLowerCase().includes(cat)).sort((a, b) => (a.price || 0) - (b.price || 0));
      const best = candidates[0];
      return { content: [{ type: 'text', text: JSON.stringify({ task, cheapest: best ? { provider: best.provider, product: best.product, price: best.price } : null, alternatives: candidates.slice(1, 4).map(d => ({ provider: d.provider, product: d.product, price: d.price })), total_options: candidates.length }, null, 2) }] };
    }

    case 'llmdeals_changes': {
      const p = path.join(ROOT, 'web/public/api/v1/changes.json');
      if (!fs.existsSync(p)) return { content: [{ type: 'text', text: 'No change data.' }] };
      const changes = JSON.parse(fs.readFileSync(p, 'utf8'));
      return { content: [{ type: 'text', text: JSON.stringify(changes, null, 2).slice(0, 3000) }] };
    }

    default:
      return { content: [{ type: 'text', text: `Unknown: ${name}` }] };
  }
}

// ── MCP stdio ──────────────────────────────────────────────────────────────

let buf = '';
process.stdin.on('data', async (chunk) => {
  buf += chunk.toString();
  while (true) {
    const hdrEnd = buf.indexOf('\r\n\r\n');
    if (hdrEnd === -1) break;
    const m = buf.slice(0, hdrEnd).match(/Content-Length: (\d+)/);
    if (!m) { buf = buf.slice(hdrEnd + 4); continue; }
    const len = parseInt(m[1]), start = hdrEnd + 4;
    if (buf.length < start + len) break;
    const body = buf.slice(start, start + len);
    buf = buf.slice(start + len);
    let msg; try { msg = JSON.parse(body); } catch { continue; }
    const { id, method, params } = msg;
    let resp;
    if (method === 'initialize') {
      resp = { jsonrpc: '2.0', id, result: { protocolVersion: '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 'llmdeals', version: '2.0.0' } } };
    } else if (method === 'tools/list') {
      resp = { jsonrpc: '2.0', id, result: { tools: TOOLS } };
    } else if (method === 'tools/call') {
      const r = await handleTool(params.name, params.arguments || {});
      resp = { jsonrpc: '2.0', id, result: r };
    } else if (method === 'ping') {
      resp = { jsonrpc: '2.0', id, result: {} };
    } else {
      resp = { jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } };
    }
    const s = JSON.stringify(resp);
    process.stdout.write(`Content-Length: ${Buffer.byteLength(s)}\r\n\r\n${s}`);
  }
});

process.stderr.write(`LLMDeals Oracle Stream v2 (read-only data) — 6 tools\n`);
