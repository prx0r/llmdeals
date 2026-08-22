# LLM Deals

Verified pricing data for AI models, with a focus on OpenCode Go deals.

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
