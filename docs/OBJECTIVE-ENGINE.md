# The Objective Deal Engine + 10 Domain Targets
2026-08-23 · Strategy doc

Thesis: llmdeals proved the stack. The product is not "an LLM deals site" —
it's a **deal-intelligence engine** that normalizes any fast-changing,
price-opaque market into: facts → routes → deterministic math → evidence →
ranked verdicts → top-N editorial + full DB + agent API.

Demand proof points: RevenueCat built a franchise on annual "State of
Subscription Apps" reports; GPU price sites get traffic on pure price tables;
hackathon aggregators exist but none score opportunity quality.

---

## Part 1 — Ten targets, scored

Score: demand(1-5) · pain(1-5) · data-verifiability(1-5) · weak-incumbency(1-5) · monetization(1-5)

| # | Domain | Why it wins | Score |
|---|--------|-------------|-------|
| 1 | **Coding-agent subscriptions** (Cursor/Copilot/Windsurf/OpenCode Go/GLM Coding) | Direct adjacency; we own the math; affiliate-rich; buyers = agents themselves | D5 P4 V4 W3 M5 → **21** |
| 2 | **Cloud GPU compute** | H100 spread $1.49→$12.29/hr (8x!); incumbents (gpufinder, bytecosts) are price-tables only — nobody normalizes spot-risk, egress, and workload-fit into effective $/trained-token | D5 P5 V4 W3 M4 → **21** |
| 3 | **Startup cloud credits** (AWS Activate, GCP/Azure packs, NVIDIA Inception) | Founders burn weeks finding these; purely factual; zero incumbents; natural funnel to #2 | D4 P4 V5 W5 M3 → **21** |
| 4 | **Agent-infra SaaS free tiers** (search: Exa/Tavily/Serper, email: Resend/Loops, auth: Clerk/Stytch, scraping: Firecrawl) | The MCP/API crowd needs this hourly; free-tier normalization is exactly our muscle | D4 P4 V5 W4 M3 → **20** |
| 5 | **VPS / bare-metal** (Hetzner vs OVH vs Netcup vs hyperscalers) | Pure determinism ($/GB-RAM/$/vCPU/egress); vpsbenchmarks is stale; evergreen SEO | D4 P3 V5 W4 M3 → **19** |
| 6 | **Hackathon & grant radar** (user's pick) | Aggregators list events; nobody scores *worth entering* (prize ÷ effort ÷ win-probability, travel/online, team-fit). Human + agent both consume | D4 P3 V4 W4 M3 → **18** |
| 7 | **AI release & deprecation wire** ("Agent News") | Deprecations/quota changes break production agents; nobody owns "what changed this week"; our snapshot-diff IS the product | D4 P4 V5 W5 M2 → **20** |
| 8 | **Domain renewal intelligence** | Intro-vs-renewal trap is pure deterministic economics; massive evergreen search demand; affiliate (registrars) mature | D4 P3 V5 W4 M4 → **20** |
| 9 | **RPC / node infra** (Alchemy/Infura/QuickNode/Ankr free tiers + CU limits) | Every web3 dev hits this; compute-unit normalization mirrors token normalization | D3 P4 V4 W4 M3 → **18** |
| 10 | **Email API pricing** (SendGrid/Mailgun/Postmark/Resend/SES) | Per-tier cliff economics are notoriously opaque; deliverability = capability axis | D3 P3 V5 W4 M3 → **18** |

Order of attack: #1 → #7 (same repo family, shares our diff machinery) → #3+#4
(one "founder stack" site) → #2 (biggest prize) → #5/#8 (SEO cash cows) → #6/#9/#10.

Note the meta-play: after ~12 months each vertical accrues history → publish
annual "State of X Deals" reports (the RevenueCat pattern) — the history moat
compounds into content moat.

---

## Part 2 — The Objective Engine (reusable core)

```
objective-engine/
├── schema/                    # JSON Schema packs (shared, versioned)
│   ├── provider.schema.json
│   ├── offer.schema.json      # terms are namespaced per formula-pack
│   ├── route.schema.json
│   ├── assessment.schema.json
│   └── evidence.schema.json   # url + quote + digest + observed_at + authority
├── formula-packs/
│   ├── llm-tokens/            # subscription_usage_pool, recurring_free_quota...
│   │   ├── formulas.mjs       # pure functions: (offer,route,model) → metrics
│   │   └── usage-profiles.json# agent-profile: 830in/71.5K cached/295out
│   ├── gpu-hours/             # effective_$/gpu-hr(egress, spot_risk, commit)
│   ├── seats/                 # per-seat blended, credit pools
│   └── requests/              # RPD/CU normalization
├── detectors/                 # domain-generic, reasons-based (from dell)
│   ├── mega-deal.mjs          # transparent reasons + score, sub-1x disqualifies
│   ├── payg-compare.mjs       # effective multiple vs pay-as-you-go
│   └── staleness.mjs          # freshness policy per source type
├── verification/
│   ├── allow-lists/<domain>.yaml   # official origins (dell2 provider yaml format)
│   ├── validate-candidate.mjs      # discovery contract (PASS before merge)
│   └── digest.mjs                  # sha256 evidence envelopes
├── publish/
│   ├── astro-template/        # parameterized site: top-N cards, spotlight,
│   │                          # searchable DB, detail pages, changes, methodology
│   ├── api.mjs                # emits /api/v1/{top,deals,changes}.json
│   └── mcp.mjs                # find_deals/compare/explain/get_changes per domain
└── cli.mjs                    # `engine init gpu --name gpudeals` scaffolds a site
```

Key rules carried over from what worked:
1. **Facts vs derivations are separate objects** — never let an assessment edit a fact.
2. **Every number has a formula_id + version** — recompute-all must be possible.
3. **Unknown = null**, never inferred.
4. **Detectors output reasons, not just scores** — trust comes from shown work.
5. **Static-first**: build-time generation, JSON API free with the site.
6. **History accrues via git snapshots** — the diff feed is the moat.

## Part 3 — Spinning up a new site (target: <1 day each)

```
engine init <domain> --name <sitename>
  → copies astro-template, links formula-pack, creates empty seed
  → deploy to <name>.pages.dev
human/agent fills seed via researcher contract (validate-candidate PASS)
```
Site #2 (#7 Agent News) shares our literal diff codebase — fastest clone.
Sites #3+#4 merge into one "FounderStackDeals" — one audience, two datasets.
