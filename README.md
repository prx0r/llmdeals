# LLMDeals

**Deal intelligence for AI.** We track AI pricing, subscriptions, free tiers and promotions, calculate what they're actually worth, evaluate the models behind them, and surface only the deals worth knowing about.

Live: https://llmdeals-v2.pages.dev · Agent API: `/api/v1/top.json` `/api/v1/deals.json` `/api/v1/changes.json`

## How it works

```
data/seed.json          single canonical dataset (offers, models, deal_routes,
                        assessments, evidence quotes)
      │ npm run build
      ▼
scripts/build-data.mjs  joins + scores + diffs history snapshots
      │
      ├─▶ web/src/data/deals-derived.json   (imported by pages)
      └─▶ web/public/api/v1/*.json          (static agent API)
      │
      ▼ astro build → dist/ (29 static pages incl. /deals/[slug])
```

- Rankings use deterministic profile scores (overall / coding / agents / research) — formula on /methodology.
- Every number traces to a quote from an official source; see any detail page.
- Change tracking: each research pass snapshots to `data/history/`, diffs emit to /changes.
- Discovery contract: run `node scripts/validate-candidate.mjs <candidate.json>` — PASS required before merging new offers into seed.json. See AGENTS.md for build conventions.

## Development

```bash
cd web
npm install
npm run dev        # prebuild regenerates derived data automatically
npm run build      # full static build incl. API JSON
```

Deploy: `npx wrangler pages deploy web/dist --project-name=llmdeals-v2 --branch=main`

## Features

- Compare pricing across AI providers
- Analyze subscription deals and credits
- Calculate effective token prices
- Track deal expiry and changes

## Quick Start

### Prerequisites

- Rust toolchain
- Node.js 18+

### Development

```bash
# Build and run
make build
make dev

# Or separately
cargo run
cd web && npm run dev
```

### Production Build

```bash
make build
```

This builds:
- Rust backend at `target/release/llmdeals`
- Astro static site at `web/dist/`

### Deploy to Cloudflare

```bash
make deploy
```

## API

The Rust backend provides these endpoints:

- `GET /api/models` - List all AI models
- `GET /api/deals` - List active deals
- `GET /api/health` - Health check

## Architecture

```
llmdeals/
├── src/           # Rust backend
│   ├── main.rs    # API server
│   └── db.rs      # Database models
├── web/           # Astro frontend
│   └── src/
│       ├── layouts/
│       └── pages/
└── data/          # SQLite database
```

## OpenCode Go Integration

LLM Deals includes verified pricing for OpenCode Go:

- **Subscription**: $10/month
- **Included Credit**: $60/month
- **Max Value**: 6× multiplier
- **Models**: MiMo V2.5, MiMo V2 Pro, Claude Sonnet 4, GPT-4o, Gemini 2.5 Pro, DeepSeek R1

## License

MIT
