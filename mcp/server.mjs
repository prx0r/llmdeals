#!/usr/bin/env node
/**
 * LLMDeals MCP Server — AI tool pricing intelligence for worker agents.
 * 
 * Agents use this to:
 * 1. Find the cheapest provider for a task (hotswap routing)
 * 2. Check current deals and free tiers
 * 3. Optimize their API subscriptions
 * 4. Get model quality/cost tradeoffs
 * 
 * Usage:
 *   node mcp/server.mjs                     # stdio mode
 *   node mcp/server.mjs --port 3001         # HTTP mode
 * 
 * Data sources:
 *   - /root/llmdeals/data/seed.json (canonical)
 *   - /root/llmdeals/web/public/api/v1/*.json (static API)
 *   - /root/llmdeals/data/deals-derived.json (scored deals)
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

// ── Load data ──────────────────────────────────────────────────────────────

function loadDeals() {
  // Load from seed.json and normalize to deal format
  const seedPath = path.join(ROOT, 'data/seed.json');
  if (fs.existsSync(seedPath)) {
    const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
    const providers = Object.fromEntries((seed.providers || []).map(p => [p.id, p]));
    return (seed.offers || []).map(o => ({
      ...o,
      provider: providers[o.provider]?.name || o.provider || 'unknown',
      product: o.label || o.product || o.id,
      price: o.price_recurring_usd || o.price_intro_usd || 0,
      tags: [o.deal_type, o.provider, ...(o.models_included || [])],
    }));
  }
  return [];
}

function loadModels() {
  const p = path.join(ROOT, 'data/seed.json');
  if (fs.existsSync(p)) {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    return data.models || [];
  }
  return [];
}

function loadProviders() {
  const p = path.join(ROOT, 'data/seed.json');
  if (fs.existsSync(p)) {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    return data.providers || [];
  }
  return [];
}

// ── MCP Tool Definitions ───────────────────────────────────────────────────

const TOOLS = [
  {
    name: 'llmdeals_search',
    description: 'Search for AI tool deals by provider, category, or capability',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query (e.g. "openai", "inference", "free")' },
        category: { type: 'string', description: 'Filter: inference, search, data, generation, agent' },
        max_price: { type: 'number', description: 'Max price per request in USD' },
        free_only: { type: 'boolean', description: 'Only show free deals' },
        min_savings: { type: 'number', description: 'Minimum savings percentage' },
      },
      required: ['query'],
    },
  },
  {
    name: 'llmdeals_cheapest',
    description: 'Find the cheapest provider for a specific task',
    inputSchema: {
      type: 'object',
      properties: {
        task: { type: 'string', description: 'Task type: chat, code, research, image, etc' },
        quality_min: { type: 'number', description: 'Minimum quality score 0-1', default: 0.5 },
        budget_per_request: { type: 'number', description: 'Max cost per request' },
      },
      required: ['task'],
    },
  },
  {
    name: 'llmdeals_model',
    description: 'Get model specs: pricing, quality, context window, capabilities',
    inputSchema: {
      type: 'object',
      properties: {
        model: { type: 'string', description: 'Model name or provider' },
      },
      required: ['model'],
    },
  },
  {
    name: 'llmdeals_optimize',
    description: 'Optimize subscriptions for a given workload',
    inputSchema: {
      type: 'object',
      properties: {
        monthly_requests: { type: 'number', description: 'Expected monthly request count' },
        task_mix: { type: 'object', description: 'Task type -> percentage (e.g. {"chat":0.5,"code":0.3})' },
        budget: { type: 'number', description: 'Monthly budget in USD' },
      },
      required: ['monthly_requests'],
    },
  },
  {
    name: 'llmdeals_deals',
    description: 'List all current deals with scores',
    inputSchema: {
      type: 'object',
      properties: {
        sort: { type: 'string', description: 'Sort by: savings, price, quality, name' },
        limit: { type: 'number', description: 'Max results', default: 20 },
        free_only: { type: 'boolean', description: 'Only free deals' },
      },
    },
  },
  {
    name: 'llmdeals_changes',
    description: 'Recent price/availability changes across all tools',
    inputSchema: { type: 'object', properties: {} },
  },
];

// ── Tool Handlers ──────────────────────────────────────────────────────────

async function handleTool(name, args) {
  const deals = loadDeals();
  const models = loadModels();
  const providers = loadProviders();

  switch (name) {
    case 'llmdeals_search': {
      const q = (args.query || '').toLowerCase();
      let results = deals.filter(d => {
        const text = `${d.provider || ''} ${d.product || ''} ${d.offer_type || ''} ${(d.tags || []).join(' ')}`.toLowerCase();
        return text.includes(q);
      });
      
      if (args.category) results = results.filter(d => (d.category || '').toLowerCase().includes(args.category.toLowerCase()));
      if (args.free_only) results = results.filter(d => d.price === 0 || d.savings_pct > 90);
      if (args.max_price != null) results = results.filter(d => (d.price || 0) <= args.max_price);
      if (args.min_savings) results = results.filter(d => (d.savings_pct || 0) >= args.min_savings);
      
      results.sort((a, b) => (a.price || 0) - (b.price || 0));
      
      return { content: [{ type: 'text', text: JSON.stringify({
        count: results.length,
        deals: results.slice(0, 20).map(d => ({
          provider: d.provider, product: d.product, price: d.price,
          savings: d.savings_pct, type: d.offer_type, tags: d.tags,
        })),
      }, null, 2) }] };
    }

    case 'llmdeals_cheapest': {
      const task = (args.task || '').toLowerCase();
      const qualityMin = args.quality_min || 0.5;
      
      // Map task to category
      const taskMap = { chat: 'inference', code: 'inference', research: 'search', image: 'generation', agent: 'orchestration' };
      const category = taskMap[task] || task;
      
      let candidates = deals.filter(d => {
        const text = `${d.provider || ''} ${d.product || ''}`.toLowerCase();
        return text.includes(category);
      });
      
      if (args.budget_per_request) candidates = candidates.filter(d => (d.price || 0) <= args.budget_per_request);
      
      candidates.sort((a, b) => (a.price || 0) - (b.price || 0));
      
      const best = candidates[0];
      const alternatives = candidates.slice(1, 4);
      
      return { content: [{ type: 'text', text: JSON.stringify({
        task, best: best ? {
          provider: best.provider, product: best.product, price: best.price,
          savings: best.savings_pct, type: best.offer_type,
        } : null,
        alternatives: alternatives.map(d => ({
          provider: d.provider, product: d.product, price: d.price,
        })),
        total_options: candidates.length,
      }, null, 2) }] };
    }

    case 'llmdeals_model': {
      const q = (args.model || '').toLowerCase();
      const found = models.filter(m => {
        const text = `${m.id || ''} ${m.name || ''} ${m.provider || ''}`.toLowerCase();
        return text.includes(q);
      });
      
      return { content: [{ type: 'text', text: JSON.stringify({
        count: found.length,
        models: found.map(m => ({
          id: m.id, name: m.name, provider: m.provider,
          in_per_m: m.in_per_m, out_per_m: m.out_per_m,
          context_window: m.context_window, tools: m.tools,
        })),
      }, null, 2) }] };
    }

    case 'llmdeals_optimize': {
      const monthly = args.monthly_requests || 1000;
      const taskMix = args.task_mix || { chat: 0.5, code: 0.3, research: 0.2 };
      const budget = args.budget || Infinity;
      
      const recommendations = [];
      for (const [task, pct] of Object.entries(taskMix)) {
        const taskDeals = deals.filter(d => {
          const text = `${d.provider || ''} ${d.product || ''}`.toLowerCase();
          return text.includes(task) || (d.tags || []).some(t => t.toLowerCase().includes(task));
        }).sort((a, b) => (a.price || 0) - (b.price || 0));
        
        if (taskDeals.length > 0) {
          const best = taskDeals[0];
          const estCost = (best.price || 0) * monthly * pct;
          recommendations.push({
            task, requests: Math.round(monthly * pct),
            best_provider: best.provider, best_product: best.product,
            cost_per_request: best.price, estimated_monthly: estCost,
          });
        }
      }
      
      const totalCost = recommendations.reduce((s, r) => s + r.estimated_monthly, 0);
      
      return { content: [{ type: 'text', text: JSON.stringify({
        monthly_requests: monthly,
        task_mix: taskMix,
        recommendations,
        total_estimated_cost: totalCost,
        budget_sufficient: totalCost <= budget,
        budget_remaining: budget - totalCost,
      }, null, 2) }] };
    }

    case 'llmdeals_deals': {
      let sorted = [...deals];
      const sort = args.sort || 'savings';
      if (sort === 'savings') sorted.sort((a, b) => (b.savings_pct || 0) - (a.savings_pct || 0));
      else if (sort === 'price') sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      else if (sort === 'quality') sorted.sort((a, b) => (b.quality_score || 0) - (a.quality_score || 0));
      
      if (args.free_only) sorted = sorted.filter(d => d.price === 0 || d.savings_pct > 90);
      
      return { content: [{ type: 'text', text: JSON.stringify({
        count: Math.min(sorted.length, args.limit || 20),
        deals: sorted.slice(0, args.limit || 20).map(d => ({
          provider: d.provider, product: d.product, price: d.price,
          savings: d.savings_pct, type: d.offer_type, quality: d.quality_score,
        })),
      }, null, 2) }] };
    }

    case 'llmdeals_changes': {
      const changesPath = path.join(ROOT, 'web/public/api/v1/changes.json');
      if (!fs.existsSync(changesPath)) {
        return { content: [{ type: 'text', text: 'No change data available. Run build-data.mjs first.' }] };
      }
      const changes = JSON.parse(fs.readFileSync(changesPath, 'utf8'));
      return { content: [{ type: 'text', text: JSON.stringify(changes, null, 2).slice(0, 3000) }] };
    }

    default:
      return { content: [{ type: 'text', text: `Unknown tool: ${name}` }] };
  }
}

// ── MCP Protocol (stdio) ───────────────────────────────────────────────────

let buffer = '';
process.stdin.on('data', async (chunk) => {
  buffer += chunk.toString();
  while (true) {
    const headerEnd = buffer.indexOf('\r\n\r\n');
    if (headerEnd === -1) break;
    const header = buffer.slice(0, headerEnd);
    const match = header.match(/Content-Length: (\d+)/);
    if (!match) { buffer = buffer.slice(headerEnd + 4); continue; }
    const len = parseInt(match[1]);
    const start = headerEnd + 4;
    if (buffer.length < start + len) break;
    const body = buffer.slice(start, start + len);
    buffer = buffer.slice(start + len);

    let msg;
    try { msg = JSON.parse(body); } catch { continue; }
    const { id, method, params } = msg;

    if (method === 'initialize') {
      const resp = JSON.stringify({ jsonrpc: '2.0', id, result: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: 'llmdeals', version: '1.0.0' },
      }});
      process.stdout.write(`Content-Length: ${Buffer.byteLength(resp)}\r\n\r\n${resp}`);
    } else if (method === 'tools/list') {
      const resp = JSON.stringify({ jsonrpc: '2.0', id, result: { tools: TOOLS } });
      process.stdout.write(`Content-Length: ${Buffer.byteLength(resp)}\r\n\r\n${resp}`);
    } else if (method === 'tools/call') {
      try {
        const result = await handleTool(params.name, params.arguments || {});
        const resp = JSON.stringify({ jsonrpc: '2.0', id, result });
        process.stdout.write(`Content-Length: ${Buffer.byteLength(resp)}\r\n\r\n${resp}`);
      } catch (e) {
        const resp = JSON.stringify({ jsonrpc: '2.0', id, error: { code: -1, message: e.message } });
        process.stdout.write(`Content-Length: ${Buffer.byteLength(resp)}\r\n\r\n${resp}`);
      }
    } else if (method === 'ping') {
      const resp = JSON.stringify({ jsonrpc: '2.0', id, result: {} });
      process.stdout.write(`Content-Length: ${Buffer.byteLength(resp)}\r\n\r\n${resp}`);
    }
  }
});

process.stderr.write(`LLMDeals MCP server running (stdio)\n`);
