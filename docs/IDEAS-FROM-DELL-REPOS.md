# Ideas mined from dell / dell2 / dell3 — 2026-08-23

## CRITICAL FINDING #1: Our flat "6x" is wrong — dell2 has the real math
`/root/dell2/chat/graph.py:127` uses an **agent request profile** to compute
per-model effective multiples:

    cost_per_req = (input*830 + cached*71500 + output*295) / 1M   ← 830 in + 71.5K CACHED + 295 out
    monthly_value = monthly_requests * cost_per_req
    multiplier    = monthly_value / $10

Their verified results (dell2.db):
| Model | Requests/mo | Effective multiple |
|---|---|---|
| Muse Spark 1.2 | 226,600 | **7.75x** |
| MiMo V2.5 | 150,400 | **6.00x** |
| DeepSeek V4 Flash | 37,800 | 2.18x |
| Qwen 3.7 Plus | 21,600 | 2.17x |
| MiniMax M3 | 16,000 | 1.29x |
| Kimi K2.7 Code | 6,750 | 1.46x |
| HY3 | 21,500 | 1.05x |
| GPT 5.6 Luna | 10,250 | 0.74x ⚠ |
| DeepSeek V4 Pro | 5,200 | 0.69x ⚠ |
| Grok 4.5 | 600 | **0.22x ⚠⚠** |

Sub-1x = subscription is WORSE than pay-as-you-go for that route.
Grok on Go destroys value; Muse is the actual volume king.
→ ACTION: replace flat 6x with per-model effective multiples + a
"vs pay-as-you-go" warning badge when <1x. This also fixes our rankings
(Muse may overtake MiMo for bulk work).

## FINDING #2: Real per-model list prices differ from ours
dell2's OpenCode table (scraped): Grok 4.5 = $2.00/$6.00 (we say $0.50/$2.00),
Kimi K2.7 = $0.95/$4.00 (we say $0.14/$0.28), Qwen Plus $0.40/$1.60,
DeepSeek Flash $0.22/$0.66, GPT Luna $0.20/$1.20, HY3 $0.14/$0.58.
→ ACTION: re-verify against live docs page; correct seed.json. Our current
prices understate premium models by 3-10x, which inflated their scores.

## FINDING #3: 2,608 priced listings ready to import (dell2)
`data/clean-coding-deals.json`: openrouter(878), fireworks(276),
bedrock(201+144 converse), azure(174+99), deepinfra(80), openai(75),
mistral(55), novita(53), vercel gateway(59)... each with
input/output/blended/context + evidence envelope digests.
→ ACTION: import as the "cheapest route per model" database layer.
Same model, N providers, price-sorted — the cheaptokenz core table,
without scraping anything ourselves.

## FINDING #4: Verification envelope format (dell2, proven schema)
`data/envelopes/*.json`: claims[] with predicate/value/verdict/
evidence_digests[sha256]/derived_from/formula. Verdicts PROVEN|UNKNOWN|MISMATCH.
→ Adopt as our evidence upgrade path: each quote gets a digest; detail pages
can show "PROVEN against artifact sha256:abc…".

## FINDING #5: Provider registry YAML with verification allow-lists (dell2/providers/*.yaml)
allowed_primary_origins, preferred_primary_sources, freshness_policies
(pricing_page 24h, model_catalog 6h, docs 7d, live_endpoint 5min).
→ Adopt: prevents off-domain evidence passing verification; freshness policy
drives "stale" badges automatically.

## FINDING #6: Deal-vs-catalog classifier (dell2/lib/deal_classifier.py)
Free isn't automatically a deal: needs ctx ≥1M or RPD ≥1000 to qualify.
DEAL_TYPES vocabulary: PRICE_ANOMALY, PROVIDER_ARBITRAGE, OFF_PEAK_DISCOUNT,
REGIONAL_DISCOUNT, REFERRAL_CREDIT...
→ Adopt the free-qualification gate so "Best free" picks aren't junk;
keep internal DEAL_TYPES richer than the 4 consumer labels.

## FINDING #7: Free-deal utility scoring (dell2/lib/free_qualification.py)
Points: context 0-30, capabilities 0-25 (tools/reasoning/vision), rate limits,
provider reliability, deal type (always-free > promo > trial).
→ Port into our profile scores for the free offers we currently score ~31-37.

## FINDING #8: fx skill = editorial playbook (dell/skills/fx-frontier-model-deal-intelligence.md)
"The best model is usually a routing decision, not a leaderboard position."
Spotlight template: what changed / what you really get / is headline multiplier
correct / failure modes / role boundaries / falsification conditions.
→ Use as the writing template for daily spotlight content.

## FINDING #9: MCP tool surface already specced (deal-radar skill)
pick_model, check_live_prices, find_inference_deals, compare_inference_offers,
get_deal_changes, explain_deal — maps 1:1 onto our static JSON API.
→ When building MCP later, these are the tool names users expect.

## FINDING #10: dell3 gold pipeline = ingestion test fixture
source → artifact(sha256) → observations → candidate_claims → canonical_claims
(PROVEN only if exact_text present in artifact) → derived_economics.
→ Reuse as a golden-file TEST: run seed through the same chain in CI.

## Priority order (no overengineering)
1. Fix per-model prices + effective multiples (#1,#2) — data correction, ~half day
2. Import cheapest-route DB from clean-coding-deals.json (#3) — kills two roadmap items
3. Free-deal qualification gate (#6,#7) — fixes our weakest scores
4. Evidence digests (#4) + provider allow-lists/freshness (#5) — trust layer
5. fx-style spotlight template (#8) — editorial quality
6. CI golden test (#10), then MCP (#9)
