# LLMDeals — Next Features (spec)
2026-08-23 · Source review: dell2/lib (scoring_v3, badge_definitions, canonical_db), dell3 gold pipeline

Rule: each feature plugs into the existing seed.json → build → deploy pipeline.
No scrapers, no new infra, no accounts.

---

## 1. Static JSON API  (plug in now, ~1 hour)
Emit at build time from seed.json:
- `/api/v1/top.json`      → top 5 assessments
- `/api/v1/deals.json`    → all deal_routes + offers + assessments joined
- `/api/v1/changes.json`  → change log (see #3)

Agents/ChatGPT consume the same intelligence as humans.
No backend — files ship with the Pages deployment.

## 2. Evidence quotes on every number  (dell3 gold pattern, ~2 hours)
seed.json evidence records currently have URL + date only.
Add `quotes: [{field, text}]` per offer (exact strings from official pages).
Detail pages render quote + URL under "The terms".
Borrowed from dell3: artifact → observation → claim chain, minus the DB.

## 3. Deal change tracking  (~half day)
- Keep `data/history/YYYY-MM-DD-seed.json` snapshots (committed to git = free history).
- Build script diffs newest vs previous snapshot → emits changes.json:
  `{offer_id, field, old, new, detected_at}`.
- Site: "Changed" badge on affected cards + /changes page ("What moved this week").
This is the moat starter: history accrues automatically from daily research runs.

## 4. Task-profile scores  (scoring_v3 port, ~half day)
dell2 already defines coding/research/agentic weight profiles.
Port as a pure function over our assessments:
`score_for(route, profile)` → show tabs on homepage table: Overall | Coding | Agents | Research.
No new data needed — reuses existing quality/cost/volume fields.

## 5. Badges  (badge_definitions port, ~2 hours)
Factual tags only: `free`, `promo`, `tool_capable`, `vision`, `long_context`, `expires`.
Rendered on cards/table. No judgment scores — matches methodology page claim
"we don't certify providers".

## 6. Affiliate-ready fields  (schema only, ~30 min)
Add to offers: `affiliate_url`, `affiliate_status`, `disclosure`.
"Get the deal" buttons use affiliate_url when present; footer disclosure:
"Rankings are independent of affiliate relationships."

## 7. Daily researcher contract  (when ready to automate discovery)
Scheduled researcher outputs candidate JSON matching seed schema
(providers/products/offers/evidence). A validator script rejects anything
missing source_url or observed_at. Human merges into seed.json via PR.
Discovery stays separate from verification (the core lesson from dell/dell2).

---

Not building now: user accounts, router, MCP server, historical percentile UI,
generic multi-vertical platform. Revisit after 30 days of history accrues.
