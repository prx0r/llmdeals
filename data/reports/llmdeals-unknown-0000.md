# LLM Deals Live Table — 2026-08-23 — India / Indonesia / Brazil sweep

Date: Sat, 22 Aug 2026 23:04:27 +0000

# LLM Deals — Session 1
Observed: 2026-08-23T05:59:24+07:00
Sweep focus: India, Indonesia, Brazil + global leader re-checks.

STEP 0: First session in this thread. Prior live table = empty. This report establishes the baseline.

## SECTION 1 — LIVE TABLE

| # | Provider/Product | Region | Price (intro→recurring) | Monthly allowance / value | Caps | Value/$ | Verified | Confidence | Official source |
|---|---|---|---|---|---|---:|---|---|---|
| 1 | Cloudflare Workers AI Free | global | $0 | 10,000 neurons/day; 30-day normalized retail equivalent ≈$3.30 | resets daily | ∞ | official | high | https://developers.cloudflare.com/workers-ai/platform/pricing/ |
| 2 | Google AI Pro — Jio unlock | IN | ₹0 add-on; requires eligible unlimited-5G plan ₹349+ | Jio states ₹1,950/month value; 18 months | qualifying Jio plan must remain eligible | ∞ incremental; 5.59x if buying ₹349 plan solely for access | official | high | https://www.jio.com/help/faq/mobile/offers/google-gemini-offer/ |
| 3 | Google AI Pro — student trial | US | $0 for 12 months | full AI Pro trial; fixed USD metered allowance not published | eligible higher-ed students; SheerID | ∞ | official | high | https://support.google.com/googleone/answer/17422238?hl=en |
| 4 | OpenCode Go | global | $5 first month → $10/mo | up to $60/mo on full-allowance models | $12/5h; $30/week; $60/month | 12.00x intro → 6.00x recurring | official | high | https://dev.opencode.ai/docs/go/ |
| 5 | GitHub Copilot Max | global | $100 → $100 | $200 monthly AI credits | monthly reset | 2.00x | official | high | https://github.com/features/copilot/plans |
| 6 | Cursor Ultra | global | $200 → $200 | $400 Other Models usage + Cursor Models pool | monthly pools | 2.00x on explicit Other Models pool | official | high | https://cursor.com/docs/models-and-pricing |
| 7 | GitHub Copilot Pro+ | global | $39 → $39 | $70 monthly AI credits | monthly reset | 1.79x | official | high | https://github.com/features/copilot/plans |
| 8 | GitHub Copilot Pro | global | $10 → $10 | $15 monthly AI credits | monthly reset | 1.50x | official | high | https://github.com/features/copilot/plans |
| 9 | Cursor Pro Plus | global | $60 → $60 | $70 Other Models usage + Cursor Models pool | monthly pools | 1.17x on explicit Other Models pool | official | high | https://cursor.com/docs/models-and-pricing |
| 10 | Cursor Pro | global | $20 → $20 | $20 Other Models usage + Cursor Models pool | monthly pools | 1.00x on explicit Other Models pool | official | high | https://cursor.com/docs/models-and-pricing |
| 11 | GitHub Copilot Free | global | $0 | 2,000 completions/month + limited chat/agent usage | 2,000 completions/mo | ∞; dollar AI-credit allowance unpublished | official | high | https://github.com/features/copilot/plans |
| 12 | Gemini Developer API Free | global | $0 | free input & output tokens on supported free-tier models | model-specific limits | ∞; fixed monthly USD allowance unpublished | official | high | https://ai.google.dev/gemini-api/docs/pricing?hl=en |
| 13 | OpenRouter Free | global | $0 | 25+ free models | 50 req/day | ∞; fixed monthly USD allowance unpublished | official | high | https://openrouter.ai/pricing |
| 14 | Groq Free | global | $0 | example: GPT-OSS-120B base free cap 1K requests/day, 200K tokens/day | model-specific RPM/RPD/TPM/TPD | ∞; fixed monthly USD allowance unpublished | official | high | https://console.groq.com/docs/rate-limits |
| 15 | Mistral Studio Free mode | global | $0 | API access with limited usage | usage/rate limits apply; public fixed allowance not stated | ∞; fixed monthly USD allowance unpublished | official | high | https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key |
| 16 | Grok 4.5 free usage promo | global | $0 limited-time | free Grok 4.5 usage in Grok Build and Cursor | cap/end date not published | ∞; allowance unpublished | official | high | https://x.ai/news/grok-4-5 |
| 17 | Cursor Start | IN | ₹649/mo tax-inclusive | generous Cursor Models usage; $0 Other Models pool | India only | N/A | official | high | https://cursor.com/docs/models-and-pricing |
| 18 | ChatGPT Go | IN | ₹399/mo GST included | expanded ChatGPT access; fixed dollar allowance not published | usage limits may vary | N/A | official historical price + current Go availability | medium | https://help.openai.com/is-is/articles/6825453-supported-countries-for-chatgpt |
| 19 | ChatGPT Go | ID | Rp75,000/mo | expanded ChatGPT access; fixed dollar allowance not published | usage limits may vary | N/A | official historical price + current Go availability | medium | https://help.openai.com/sl-si/articles/6825453-chatgpt-opombe-ob-izdaji |
| 20 | ChatGPT Go | global/US reference | $8/mo US price; local adjustment in some markets | expanded ChatGPT access | usage limits may vary | N/A | official | high | https://openai.com/index/introducing-chatgpt-go/ |
| 21 | Claude Sonnet 5 API | global | $2/M input; $10/M output | PAYG, no monthly allowance | PAYG | N/A | official | high | https://www.anthropic.com/news/claude-sonnet-5 |
| 22 | DeepSeek V4 Flash API | global | $0.14/M input cache miss; $0.28/M output; $0.0028/M cache hit | PAYG | PAYG | N/A | official | high | https://api-docs.deepseek.com/quick_start/pricing/?method=individual&tab=case-studies |

Notes:
- Cloudflare 30-day $3.30 equivalent = 10,000 neurons/day × 30 ÷ 1,000 × $0.011. This is a normalization from Cloudflare's official free allocation and overage rate, not a published monthly credit.
- Jio acquisition ratio = ₹1,950 stated monthly subscription value ÷ ₹349 minimum qualifying plan = 5.59x. Existing qualifying users have zero incremental AI cost.
- OpenCode's $60 headline applies only to models with the full monthly allowance; several frontier models have lower per-model included value.

## SECTION 2 — NEW CANDIDATES JSON

```json
[
  {
    "id": "google-jio-ai-pro-2025-10",
    "provider": "Google / Jio",
    "product": "Google AI Pro via Jio",
    "deal_type": "unlock",
    "label": "18 months Google AI Pro at no extra add-on cost",
    "price_intro_usd": 0,
    "price_recurring_usd": null,
    "allowance_month_usd": null,
    "limit_5h_usd": null,
    "limit_week_usd": null,
    "region": "IN",
    "valid_from": "2025-10-30",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://www.jio.com/help/faq/mobile/offers/google-gemini-offer/",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"allowance","text":"Eligible users receive a full 18-month Google AI Pro subscription from activation, worth Rs 35,100, at no additional cost."}],
    "confidence": "high"
  },
  {
    "id": "google-ai-pro-student-us-2026-08",
    "provider": "Google",
    "product": "Google AI Pro student trial",
    "deal_type": "free",
    "label": "US students: 12 months AI Pro free",
    "price_intro_usd": 0,
    "price_recurring_usd": null,
    "allowance_month_usd": null,
    "limit_5h_usd": null,
    "limit_week_usd": null,
    "region": "US",
    "valid_from": "2026-08-23",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://support.google.com/googleone/answer/17422238?hl=en",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"pricing","text":"Eligible students can get a 12-month Google AI Pro student trial plan at no cost."}],
    "confidence": "high"
  },
  {
    "id": "opencode-go-2026-08",
    "provider": "OpenCode",
    "product": "OpenCode Go",
    "deal_type": "promo",
    "label": "$5 first month, then $10; up to $60/month usage",
    "price_intro_usd": 5,
    "price_recurring_usd": 10,
    "allowance_month_usd": 60,
    "limit_5h_usd": 12,
    "limit_week_usd": 30,
    "region": "global",
    "valid_from": "2026-08-22",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://dev.opencode.ai/docs/go/",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"pricing","text":"Use with any agent. $5 first month, then $10/month."},{"field":"caps","text":"Monthly limit — $60 of usage"}],
    "confidence": "high"
  },
  {
    "id": "cloudflare-workers-ai-free-2026-08",
    "provider": "Cloudflare",
    "product": "Workers AI Free allocation",
    "deal_type": "free",
    "label": "10,000 neurons/day free",
    "price_intro_usd": 0,
    "price_recurring_usd": 0,
    "allowance_month_usd": 3.3,
    "limit_5h_usd": null,
    "limit_week_usd": null,
    "region": "global",
    "valid_from": "2026-08-18",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://developers.cloudflare.com/workers-ai/platform/pricing/",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"allowance","text":"Our free allocation allows anyone to use a total of 10,000 Neurons per day at no charge."}],
    "confidence": "high"
  },
  {
    "id": "github-copilot-max-2026-08",
    "provider": "GitHub",
    "product": "Copilot Max",
    "deal_type": "subscription",
    "label": "$100/month with $200 monthly AI credits",
    "price_intro_usd": 100,
    "price_recurring_usd": 100,
    "allowance_month_usd": 200,
    "limit_5h_usd": null,
    "limit_week_usd": null,
    "region": "global",
    "valid_from": "2026-08-23",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://github.com/features/copilot/plans",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"allowance","text":"$200 monthly total credits for Max"}],
    "confidence": "high"
  },
  {
    "id": "github-copilot-proplus-2026-08",
    "provider": "GitHub",
    "product": "Copilot Pro+",
    "deal_type": "subscription",
    "label": "$39/month with 7,000 AI credits ($70 value)",
    "price_intro_usd": 39,
    "price_recurring_usd": 39,
    "allowance_month_usd": 70,
    "limit_5h_usd": null,
    "limit_week_usd": null,
    "region": "global",
    "valid_from": "2026-08-23",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://docs.github.com/en/copilot/get-started/plans",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"allowance","text":"Copilot Pro+ | $39 USD | 3,900 | 3,100 | 7,000"}],
    "confidence": "high"
  },
  {
    "id": "cursor-ultra-2026-08",
    "provider": "Cursor",
    "product": "Ultra",
    "deal_type": "subscription",
    "label": "$200/month with $400 Other Models usage",
    "price_intro_usd": 200,
    "price_recurring_usd": 200,
    "allowance_month_usd": 400,
    "limit_5h_usd": null,
    "limit_week_usd": null,
    "region": "global",
    "valid_from": "2026-08-23",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://cursor.com/docs/models-and-pricing",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"allowance","text":"Ultra | $200/mo | $400 | Generous included usage"}],
    "confidence": "high"
  },
  {
    "id": "cursor-start-in-2026-08",
    "provider": "Cursor",
    "product": "Start",
    "deal_type": "subscription",
    "label": "India-only ₹649/month Cursor plan",
    "price_intro_usd": null,
    "price_recurring_usd": null,
    "allowance_month_usd": null,
    "limit_5h_usd": null,
    "limit_week_usd": null,
    "region": "IN",
    "valid_from": "2026-08-23",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://cursor.com/docs/models-and-pricing",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"pricing","text":"Start (India only) | ₹649/mo, tax inclusive | $0 | Generous included usage"}],
    "confidence": "high"
  },
  {
    "id": "openai-chatgpt-go-in-2025-08",
    "provider": "OpenAI",
    "product": "ChatGPT Go",
    "deal_type": "subscription",
    "label": "India regional Go price ₹399/month",
    "price_intro_usd": null,
    "price_recurring_usd": null,
    "allowance_month_usd": null,
    "limit_5h_usd": null,
    "limit_week_usd": null,
    "region": "IN",
    "valid_from": "2025-08-18",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://help.openai.com/is-is/articles/6825453-supported-countries-for-chatgpt",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"pricing","text":"For ₹399/month (GST included), ChatGPT Go provides everything included in the Free plan"}],
    "confidence": "medium"
  },
  {
    "id": "openai-chatgpt-go-id-2025-09",
    "provider": "OpenAI",
    "product": "ChatGPT Go",
    "deal_type": "subscription",
    "label": "Indonesia regional Go price Rp75,000/month",
    "price_intro_usd": null,
    "price_recurring_usd": null,
    "allowance_month_usd": null,
    "limit_5h_usd": null,
    "limit_week_usd": null,
    "region": "ID",
    "valid_from": "2025-09-22",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://help.openai.com/sl-si/articles/6825453-chatgpt-opombe-ob-izdaji",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"pricing","text":"For Rp 75.000/month, ChatGPT Go provides everything included in the Free plan"}],
    "confidence": "medium"
  },
  {
    "id": "google-gemini-api-free-2026-08",
    "provider": "Google",
    "product": "Gemini Developer API Free tier",
    "deal_type": "free",
    "label": "Free input and output tokens on supported models",
    "price_intro_usd": 0,
    "price_recurring_usd": 0,
    "allowance_month_usd": null,
    "limit_5h_usd": null,
    "limit_week_usd": null,
    "region": "global",
    "valid_from": "2026-08-23",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://ai.google.dev/gemini-api/docs/pricing?hl=en",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"pricing","text":"Start building free of charge with generous limits"}],
    "confidence": "high"
  },
  {
    "id": "openrouter-free-2026-08",
    "provider": "OpenRouter",
    "product": "Free tier / Free Models Router",
    "deal_type": "free",
    "label": "25+ free models, 50 requests/day",
    "price_intro_usd": 0,
    "price_recurring_usd": 0,
    "allowance_month_usd": null,
    "limit_5h_usd": null,
    "limit_week_usd": null,
    "region": "global",
    "valid_from": "2026-08-23",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://openrouter.ai/pricing",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"pricing","text":"The pricing shown on this page for Free Models Router is zero, so you are not charged for prompt or completion tokens."}],
    "confidence": "high"
  },
  {
    "id": "mistral-studio-free-2026-08",
    "provider": "Mistral",
    "product": "Studio Free mode",
    "deal_type": "free",
    "label": "API access without credit card; limited usage",
    "price_intro_usd": 0,
    "price_recurring_usd": 0,
    "allowance_month_usd": null,
    "limit_5h_usd": null,
    "limit_week_usd": null,
    "region": "global",
    "valid_from": "2026-08-23",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"pricing","text":"Free mode: API access is enabled by default with no credit card required. Usage and rate limits apply."}],
    "confidence": "high"
  },
  {
    "id": "spacexai-grok45-free-2026-07",
    "provider": "SpaceXAI",
    "product": "Grok 4.5",
    "deal_type": "promo",
    "label": "Limited-time free Grok 4.5 usage in Grok Build and Cursor",
    "price_intro_usd": 0,
    "price_recurring_usd": null,
    "allowance_month_usd": null,
    "limit_5h_usd": null,
    "limit_week_usd": null,
    "region": "global",
    "valid_from": "2026-07-16",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://x.ai/news/grok-4-5",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"pricing","text":"We’re offering free Grok 4.5 usage for a limited time in Grok Build and Cursor."}],
    "confidence": "high"
  },
  {
    "id": "anthropic-sonnet5-permanent-2026-06",
    "provider": "Anthropic",
    "product": "Claude Sonnet 5 API",
    "deal_type": "promo",
    "label": "Former intro $2/$10 MTok pricing made permanent",
    "price_intro_usd": null,
    "price_recurring_usd": null,
    "allowance_month_usd": null,
    "limit_5h_usd": null,
    "limit_week_usd": null,
    "region": "global",
    "valid_from": "2026-06-30",
    "valid_until": null,
    "status": "active",
    "verification": "official",
    "source_url": "https://www.anthropic.com/news/claude-sonnet-5",
    "observed_at": "2026-08-23T05:59:24+07:00",
    "quotes": [{"field":"pricing","text":"Sonnet 5's introductory pricing of $2/MTok input and $10/MTok output has since been made permanent"}],
    "confidence": "high"
  }
]
```

## SECTION 3 — CHANGES VS LAST SESSION

- NEW: This is the first session, so the table above establishes the baseline. Strongest quantified paid deal: OpenCode Go at 12x intro / 6x recurring on full-$60 models.
- NEW: India — Jio's Google AI Pro unlock remains active: 18 months, no extra AI add-on charge, requiring an eligible unlimited-5G plan. At the ₹349 minimum qualifying plan and ₹1,950/month stated AI Pro value, acquisition value is 5.59x.
- NEW: India — Cursor Start is ₹649/month tax-inclusive.
- NEW: Indonesia — OpenAI's published ChatGPT Go launch price is Rp75,000/month. Current Go help confirms Go remains available, but the current help page no longer displays the local numeric price; confidence therefore medium rather than high.
- NEW: Cloudflare Workers AI free allocation is 10,000 neurons/day; normalized at its $0.011/1,000-neuron overage rate this is ≈$3.30 per 30 days.
- NEW: GitHub's current AI-credit model creates explicit value ratios: Max 2.00x, Pro+ 1.79x, Pro 1.50x.
- NEW: Cursor explicit Other Models pools: Ultra 2.00x, Pro Plus 1.17x, Pro 1.00x, before assigning any extra value to the Cursor Models pool.
- PRICE_DROP / CURRENT-SOURCE CORRECTION: Anthropic's current Sonnet 5 page says the former $2 input / $10 output per MTok introductory pricing has been made permanent. Discard stale references to an Aug 31, 2026 expiry.
- DROPPED/EXPIRED: Google's 2025 India-wide free one-year AI Pro student offer is not promoted as active. Current Google One help says the no-cost 12-month AI Pro student trial is US-only; India remains in other student bundle/discount eligibility.
- RECHECK: Brazil — official localized pages confirmed product availability/support but did not surface a numeric Brazil-only LLM subscription price in this sweep. No BR regional arbitrage was promoted.
- RECHECK: ChatGPT Go India/Indonesia local launch prices are official, but the current generic Go help page does not expose numeric local prices, so those rows are medium confidence until a current checkout/pricing page exposes the same amount.

Bottom line: no prior table existed, so no displacement comparison is possible this session. The baseline leader among fully quantified subscription allowances is OpenCode Go; the strongest regional unlock is Jio + Google AI Pro in India.
LLM Deals — Session 1
<p>Observed: 2026-08-23T05:59:24+07:00<br>
Sweep focus: India, Indonesia, Brazil + global leader re-checks.</p>
<p>STEP 0: First session in this thread. Prior live table = empty. This report establishes the baseline.</p>

SECTION 1 — LIVE TABLE
<table>
<thead>
<tr>
<th>#</th>
<th>Provider/Product</th>
<th>Region</th>
<th>Price (intro→recurring)</th>
<th>Monthly allowance / value</th>
<th>Caps</th>
<th>Value/$</th>
<th>Verified</th>
<th>Confidence</th>
<th>Official source</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Cloudflare Workers AI Free</td>
<td>global</td>
<td>$0</td>
<td>10,000 neurons/day; 30-day normalized retail equivalent ≈$3.30</td>
<td>resets daily</td>
<td>∞</td>
<td>official</td>
<td>high</td>
<td>https://developers.cloudflare.com/workers-ai/platform/pricing/</td>
</tr>
<tr>
<td>2</td>
<td>Google AI Pro — Jio unlock</td>
<td>IN</td>
<td>₹0 add-on; requires eligible unlimited-5G plan ₹349+</td>
<td>Jio states ₹1,950/month value; 18 months</td>
<td>qualifying Jio plan must remain eligible</td>
<td>∞ incremental; 5.59x if buying ₹349 plan solely for access</td>
<td>official</td>
<td>high</td>
<td>https://www.jio.com/help/faq/mobile/offers/google-gemini-offer/</td>
</tr>
<tr>
<td>3</td>
<td>Google AI Pro — student trial</td>
<td>US</td>
<td>$0 for 12 months</td>
<td>full AI Pro trial; fixed USD metered allowance not published</td>
<td>eligible higher-ed students; SheerID</td>
<td>∞</td>
<td>official</td>
<td>high</td>
<td>https://support.google.com/googleone/answer/17422238?hl=en</td>
</tr>
<tr>
<td>4</td>
<td>OpenCode Go</td>
<td>global</td>
<td>$5 first month → $10/mo</td>
<td>up to $60/mo on full-allowance models</td>
<td>$12/5h; $30/week; $60/month</td>
<td>12.00x intro → 6.00x recurring</td>
<td>official</td>
<td>high</td>
<td>https://dev.opencode.ai/docs/go/</td>
</tr>
<tr>
<td>5</td>
<td>GitHub Copilot Max</td>
<td>global</td>
<td>$100 → $100</td>
<td>$200 monthly AI credits</td>
<td>monthly reset</td>
<td>2.00x</td>
<td>official</td>
<td>high</td>
<td>https://github.com/features/copilot/plans</td>
</tr>
<tr>
<td>6</td>
<td>Cursor Ultra</td>
<td>global</td>
<td>$200 → $200</td>
<td>$400 Other Models usage + Cursor Models pool</td>
<td>monthly pools</td>
<td>2.00x on explicit Other Models pool</td>
<td>official</td>
<td>high</td>
<td>https://cursor.com/docs/models-and-pricing</td>
</tr>
<tr>
<td>7</td>
<td>GitHub Copilot Pro+</td>
<td>global</td>
<td>$39 → $39</td>
<td>$70 monthly AI credits</td>
<td>monthly reset</td>
<td>1.79x</td>
<td>official</td>
<td>high</td>
<td>https://github.com/features/copilot/plans</td>
</tr>
<tr>
<td>8</td>
<td>GitHub Copilot Pro</td>
<td>global</td>
<td>$10 → $10</td>
<td>$15 monthly AI credits</td>
<td>monthly reset</td>
<td>1.50x</td>
<td>official</td>
<td>high</td>
<td>https://github.com/features/copilot/plans</td>
</tr>
<tr>
<td>9</td>
<td>Cursor Pro Plus</td>
<td>global</td>
<td>$60 → $60</td>
<td>$70 Other Models usage + Cursor Models pool</td>
<td>monthly pools</td>
<td>1.17x on explicit Other Models pool</td>
<td>official</td>
<td>high</td>
<td>https://cursor.com/docs/models-and-pricing</td>
</tr>
<tr>
<td>10</td>
<td>Cursor Pro</td>
<td>global</td>
<td>$20 → $20</td>
<td>$20 Other Models usage + Cursor Models pool</td>
<td>monthly pools</td>
<td>1.00x on explicit Other Models pool</td>
<td>official</td>
<td>high</td>
<td>https://cursor.com/docs/models-and-pricing</td>
</tr>
<tr>
<td>11</td>
<td>GitHub Copilot Free</td>
<td>global</td>
<td>$0</td>
<td>2,000 completions/month + limited chat/agent usage</td>
<td>2,000 completions/mo</td>
<td>∞; dollar AI-credit allowance unpublished</td>
<td>official</td>
<td>high</td>
<td>https://github.com/features/copilot/plans</td>
</tr>
<tr>
<td>12</td>
<td>Gemini Developer API Free</td>
<td>global</td>
<td>$0</td>
<td>free input &amp; output tokens on supported free-tier models</td>
<td>model-specific limits</td>
<td>∞; fixed monthly USD allowance unpublished</td>
<td>official</td>
<td>high</td>
<td>https://ai.google.dev/gemini-api/docs/pricing?hl=en</td>
</tr>
<tr>
<td>13</td>
<td>OpenRouter Free</td>
<td>global</td>
<td>$0</td>
<td>25+ free models</td>
<td>50 req/day</td>
<td>∞; fixed monthly USD allowance unpublished</td>
<td>official</td>
<td>high</td>
<td>https://openrouter.ai/pricing</td>
</tr>
<tr>
<td>14</td>
<td>Groq Free</td>
<td>global</td>
<td>$0</td>
<td>example: GPT-OSS-120B base free cap 1K requests/day, 200K tokens/day</td>
<td>model-specific RPM/RPD/TPM/TPD</td>
<td>∞; fixed monthly USD allowance unpublished</td>
<td>official</td>
<td>high</td>
<td>https://console.groq.com/docs/rate-limits</td>
</tr>
<tr>
<td>15</td>
<td>Mistral Studio Free mode</td>
<td>global</td>
<td>$0</td>
<td>API access with limited usage</td>
<td>usage/rate limits apply; public fixed allowance not stated</td>
<td>∞; fixed monthly USD allowance unpublished</td>
<td>official</td>
<td>high</td>
<td>https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key</td>
</tr>
<tr>
<td>16</td>
<td>Grok 4.5 free usage promo</td>
<td>global</td>
<td>$0 limited-time</td>
<td>free Grok 4.5 usage in Grok Build and Cursor</td>
<td>cap/end date not published</td>
<td>∞; allowance unpublished</td>
<td>official</td>
<td>high</td>
<td>https://x.ai/news/grok-4-5</td>
</tr>
<tr>
<td>17</td>
<td>Cursor Start</td>
<td>IN</td>
<td>₹649/mo tax-inclusive</td>
<td>generous Cursor Models usage; $0 Other Models pool</td>
<td>India only</td>
<td>N/A</td>
<td>official</td>
<td>high</td>
<td>https://cursor.com/docs/models-and-pricing</td>
</tr>
<tr>
<td>18</td>
<td>ChatGPT Go</td>
<td>IN</td>
<td>₹399/mo GST included</td>
<td>expanded ChatGPT access; fixed dollar allowance not published</td>
<td>usage limits may vary</td>
<td>N/A</td>
<td>official historical price + current Go availability</td>
<td>medium</td>
<td>https://help.openai.com/is-is/articles/6825453-supported-countries-for-chatgpt</td>
</tr>
<tr>
<td>19</td>
<td>ChatGPT Go</td>
<td>ID</td>
<td>Rp75,000/mo</td>
<td>expanded ChatGPT access; fixed dollar allowance not published</td>
<td>usage limits may vary</td>
<td>N/A</td>
<td>official historical price + current Go availability</td>
<td>medium</td>
<td>https://help.openai.com/sl-si/articles/6825453-chatgpt-opombe-ob-izdaji</td>
</tr>
<tr>
<td>20</td>
<td>ChatGPT Go</td>
<td>global/US reference</td>
<td>$8/mo US price; local adjustment in some markets</td>
<td>expanded ChatGPT access</td>
<td>usage limits may vary</td>
<td>N/A</td>
<td>official</td>
<td>high</td>
<td>https://openai.com/index/introducing-chatgpt-go/</td>
</tr>
<tr>
<td>21</td>
<td>Claude Sonnet 5 API</td>
<td>global</td>
<td>$2/M input; $10/M output</td>
<td>PAYG, no monthly allowance</td>
<td>PAYG</td>
<td>N/A</td>
<td>official</td>
<td>high</td>
<td>https://www.anthropic.com/news/claude-sonnet-5</td>
</tr>
<tr>
<td>22</td>
<td>DeepSeek V4 Flash API</td>
<td>global</td>
<td>$0.14/M input cache miss; $0.28/M output; $0.0028/M cache hit</td>
<td>PAYG</td>
<td>PAYG</td>
<td>N/A</td>
<td>official</td>
<td>high</td>
<td>https://api-docs.deepseek.com/quick_start/pricing/?method=individual&amp;tab=case-studies</td>
</tr>
</tbody>
</table>
<p>Notes:</p>
<ul>
<li>Cloudflare 30-day $3.30 equivalent = 10,000 neurons/day × 30 ÷ 1,000 × $0.011. This is a normalization from Cloudflare’s official free allocation and overage rate, not a published monthly credit.</li>
<li>Jio acquisition ratio = ₹1,950 stated monthly subscription value ÷ ₹349 minimum qualifying plan = 5.59x. Existing qualifying users have zero incremental AI cost.</li>
<li>OpenCode’s $60 headline applies only to models with the full monthly allowance; several frontier models have lower per-model included value.</li>
</ul>

SECTION 2 — NEW CANDIDATES JSON

<code>[
  {
    &quot;id&quot;: &quot;google-jio-ai-pro-2025-10&quot;,
    &quot;provider&quot;: &quot;Google / Jio&quot;,
    &quot;product&quot;: &quot;Google AI Pro via Jio&quot;,
    &quot;deal_type&quot;: &quot;unlock&quot;,
    &quot;label&quot;: &quot;18 months Google AI Pro at no extra add-on cost&quot;,
    &quot;price_intro_usd&quot;: 0,
    &quot;price_recurring_usd&quot;: null,
    &quot;allowance_month_usd&quot;: null,
    &quot;limit_5h_usd&quot;: null,
    &quot;limit_week_usd&quot;: null,
    &quot;region&quot;: &quot;IN&quot;,
    &quot;valid_from&quot;: &quot;2025-10-30&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://www.jio.com/help/faq/mobile/offers/google-gemini-offer/&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;allowance&quot;,&quot;text&quot;:&quot;Eligible users receive a full 18-month Google AI Pro subscription from activation, worth Rs 35,100, at no additional cost.&quot;}],
    &quot;confidence&quot;: &quot;high&quot;
  },
  {
    &quot;id&quot;: &quot;google-ai-pro-student-us-2026-08&quot;,
    &quot;provider&quot;: &quot;Google&quot;,
    &quot;product&quot;: &quot;Google AI Pro student trial&quot;,
    &quot;deal_type&quot;: &quot;free&quot;,
    &quot;label&quot;: &quot;US students: 12 months AI Pro free&quot;,
    &quot;price_intro_usd&quot;: 0,
    &quot;price_recurring_usd&quot;: null,
    &quot;allowance_month_usd&quot;: null,
    &quot;limit_5h_usd&quot;: null,
    &quot;limit_week_usd&quot;: null,
    &quot;region&quot;: &quot;US&quot;,
    &quot;valid_from&quot;: &quot;2026-08-23&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://support.google.com/googleone/answer/17422238?hl=en&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;pricing&quot;,&quot;text&quot;:&quot;Eligible students can get a 12-month Google AI Pro student trial plan at no cost.&quot;}],
    &quot;confidence&quot;: &quot;high&quot;
  },
  {
    &quot;id&quot;: &quot;opencode-go-2026-08&quot;,
    &quot;provider&quot;: &quot;OpenCode&quot;,
    &quot;product&quot;: &quot;OpenCode Go&quot;,
    &quot;deal_type&quot;: &quot;promo&quot;,
    &quot;label&quot;: &quot;$5 first month, then $10; up to $60/month usage&quot;,
    &quot;price_intro_usd&quot;: 5,
    &quot;price_recurring_usd&quot;: 10,
    &quot;allowance_month_usd&quot;: 60,
    &quot;limit_5h_usd&quot;: 12,
    &quot;limit_week_usd&quot;: 30,
    &quot;region&quot;: &quot;global&quot;,
    &quot;valid_from&quot;: &quot;2026-08-22&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://dev.opencode.ai/docs/go/&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;pricing&quot;,&quot;text&quot;:&quot;Use with any agent. $5 first month, then $10/month.&quot;},{&quot;field&quot;:&quot;caps&quot;,&quot;text&quot;:&quot;Monthly limit — $60 of usage&quot;}],
    &quot;confidence&quot;: &quot;high&quot;
  },
  {
    &quot;id&quot;: &quot;cloudflare-workers-ai-free-2026-08&quot;,
    &quot;provider&quot;: &quot;Cloudflare&quot;,
    &quot;product&quot;: &quot;Workers AI Free allocation&quot;,
    &quot;deal_type&quot;: &quot;free&quot;,
    &quot;label&quot;: &quot;10,000 neurons/day free&quot;,
    &quot;price_intro_usd&quot;: 0,
    &quot;price_recurring_usd&quot;: 0,
    &quot;allowance_month_usd&quot;: 3.3,
    &quot;limit_5h_usd&quot;: null,
    &quot;limit_week_usd&quot;: null,
    &quot;region&quot;: &quot;global&quot;,
    &quot;valid_from&quot;: &quot;2026-08-18&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://developers.cloudflare.com/workers-ai/platform/pricing/&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;allowance&quot;,&quot;text&quot;:&quot;Our free allocation allows anyone to use a total of 10,000 Neurons per day at no charge.&quot;}],
    &quot;confidence&quot;: &quot;high&quot;
  },
  {
    &quot;id&quot;: &quot;github-copilot-max-2026-08&quot;,
    &quot;provider&quot;: &quot;GitHub&quot;,
    &quot;product&quot;: &quot;Copilot Max&quot;,
    &quot;deal_type&quot;: &quot;subscription&quot;,
    &quot;label&quot;: &quot;$100/month with $200 monthly AI credits&quot;,
    &quot;price_intro_usd&quot;: 100,
    &quot;price_recurring_usd&quot;: 100,
    &quot;allowance_month_usd&quot;: 200,
    &quot;limit_5h_usd&quot;: null,
    &quot;limit_week_usd&quot;: null,
    &quot;region&quot;: &quot;global&quot;,
    &quot;valid_from&quot;: &quot;2026-08-23&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://github.com/features/copilot/plans&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;allowance&quot;,&quot;text&quot;:&quot;$200 monthly total credits for Max&quot;}],
    &quot;confidence&quot;: &quot;high&quot;
  },
  {
    &quot;id&quot;: &quot;github-copilot-proplus-2026-08&quot;,
    &quot;provider&quot;: &quot;GitHub&quot;,
    &quot;product&quot;: &quot;Copilot Pro+&quot;,
    &quot;deal_type&quot;: &quot;subscription&quot;,
    &quot;label&quot;: &quot;$39/month with 7,000 AI credits ($70 value)&quot;,
    &quot;price_intro_usd&quot;: 39,
    &quot;price_recurring_usd&quot;: 39,
    &quot;allowance_month_usd&quot;: 70,
    &quot;limit_5h_usd&quot;: null,
    &quot;limit_week_usd&quot;: null,
    &quot;region&quot;: &quot;global&quot;,
    &quot;valid_from&quot;: &quot;2026-08-23&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://docs.github.com/en/copilot/get-started/plans&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;allowance&quot;,&quot;text&quot;:&quot;Copilot Pro+ | $39 USD | 3,900 | 3,100 | 7,000&quot;}],
    &quot;confidence&quot;: &quot;high&quot;
  },
  {
    &quot;id&quot;: &quot;cursor-ultra-2026-08&quot;,
    &quot;provider&quot;: &quot;Cursor&quot;,
    &quot;product&quot;: &quot;Ultra&quot;,
    &quot;deal_type&quot;: &quot;subscription&quot;,
    &quot;label&quot;: &quot;$200/month with $400 Other Models usage&quot;,
    &quot;price_intro_usd&quot;: 200,
    &quot;price_recurring_usd&quot;: 200,
    &quot;allowance_month_usd&quot;: 400,
    &quot;limit_5h_usd&quot;: null,
    &quot;limit_week_usd&quot;: null,
    &quot;region&quot;: &quot;global&quot;,
    &quot;valid_from&quot;: &quot;2026-08-23&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://cursor.com/docs/models-and-pricing&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;allowance&quot;,&quot;text&quot;:&quot;Ultra | $200/mo | $400 | Generous included usage&quot;}],
    &quot;confidence&quot;: &quot;high&quot;
  },
  {
    &quot;id&quot;: &quot;cursor-start-in-2026-08&quot;,
    &quot;provider&quot;: &quot;Cursor&quot;,
    &quot;product&quot;: &quot;Start&quot;,
    &quot;deal_type&quot;: &quot;subscription&quot;,
    &quot;label&quot;: &quot;India-only ₹649/month Cursor plan&quot;,
    &quot;price_intro_usd&quot;: null,
    &quot;price_recurring_usd&quot;: null,
    &quot;allowance_month_usd&quot;: null,
    &quot;limit_5h_usd&quot;: null,
    &quot;limit_week_usd&quot;: null,
    &quot;region&quot;: &quot;IN&quot;,
    &quot;valid_from&quot;: &quot;2026-08-23&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://cursor.com/docs/models-and-pricing&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;pricing&quot;,&quot;text&quot;:&quot;Start (India only) | ₹649/mo, tax inclusive | $0 | Generous included usage&quot;}],
    &quot;confidence&quot;: &quot;high&quot;
  },
  {
    &quot;id&quot;: &quot;openai-chatgpt-go-in-2025-08&quot;,
    &quot;provider&quot;: &quot;OpenAI&quot;,
    &quot;product&quot;: &quot;ChatGPT Go&quot;,
    &quot;deal_type&quot;: &quot;subscription&quot;,
    &quot;label&quot;: &quot;India regional Go price ₹399/month&quot;,
    &quot;price_intro_usd&quot;: null,
    &quot;price_recurring_usd&quot;: null,
    &quot;allowance_month_usd&quot;: null,
    &quot;limit_5h_usd&quot;: null,
    &quot;limit_week_usd&quot;: null,
    &quot;region&quot;: &quot;IN&quot;,
    &quot;valid_from&quot;: &quot;2025-08-18&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://help.openai.com/is-is/articles/6825453-supported-countries-for-chatgpt&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;pricing&quot;,&quot;text&quot;:&quot;For ₹399/month (GST included), ChatGPT Go provides everything included in the Free plan&quot;}],
    &quot;confidence&quot;: &quot;medium&quot;
  },
  {
    &quot;id&quot;: &quot;openai-chatgpt-go-id-2025-09&quot;,
    &quot;provider&quot;: &quot;OpenAI&quot;,
    &quot;product&quot;: &quot;ChatGPT Go&quot;,
    &quot;deal_type&quot;: &quot;subscription&quot;,
    &quot;label&quot;: &quot;Indonesia regional Go price Rp75,000/month&quot;,
    &quot;price_intro_usd&quot;: null,
    &quot;price_recurring_usd&quot;: null,
    &quot;allowance_month_usd&quot;: null,
    &quot;limit_5h_usd&quot;: null,
    &quot;limit_week_usd&quot;: null,
    &quot;region&quot;: &quot;ID&quot;,
    &quot;valid_from&quot;: &quot;2025-09-22&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://help.openai.com/sl-si/articles/6825453-chatgpt-opombe-ob-izdaji&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;pricing&quot;,&quot;text&quot;:&quot;For Rp 75.000/month, ChatGPT Go provides everything included in the Free plan&quot;}],
    &quot;confidence&quot;: &quot;medium&quot;
  },
  {
    &quot;id&quot;: &quot;google-gemini-api-free-2026-08&quot;,
    &quot;provider&quot;: &quot;Google&quot;,
    &quot;product&quot;: &quot;Gemini Developer API Free tier&quot;,
    &quot;deal_type&quot;: &quot;free&quot;,
    &quot;label&quot;: &quot;Free input and output tokens on supported models&quot;,
    &quot;price_intro_usd&quot;: 0,
    &quot;price_recurring_usd&quot;: 0,
    &quot;allowance_month_usd&quot;: null,
    &quot;limit_5h_usd&quot;: null,
    &quot;limit_week_usd&quot;: null,
    &quot;region&quot;: &quot;global&quot;,
    &quot;valid_from&quot;: &quot;2026-08-23&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://ai.google.dev/gemini-api/docs/pricing?hl=en&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;pricing&quot;,&quot;text&quot;:&quot;Start building free of charge with generous limits&quot;}],
    &quot;confidence&quot;: &quot;high&quot;
  },
  {
    &quot;id&quot;: &quot;openrouter-free-2026-08&quot;,
    &quot;provider&quot;: &quot;OpenRouter&quot;,
    &quot;product&quot;: &quot;Free tier / Free Models Router&quot;,
    &quot;deal_type&quot;: &quot;free&quot;,
    &quot;label&quot;: &quot;25+ free models, 50 requests/day&quot;,
    &quot;price_intro_usd&quot;: 0,
    &quot;price_recurring_usd&quot;: 0,
    &quot;allowance_month_usd&quot;: null,
    &quot;limit_5h_usd&quot;: null,
    &quot;limit_week_usd&quot;: null,
    &quot;region&quot;: &quot;global&quot;,
    &quot;valid_from&quot;: &quot;2026-08-23&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://openrouter.ai/pricing&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;pricing&quot;,&quot;text&quot;:&quot;The pricing shown on this page for Free Models Router is zero, so you are not charged for prompt or completion tokens.&quot;}],
    &quot;confidence&quot;: &quot;high&quot;
  },
  {
    &quot;id&quot;: &quot;mistral-studio-free-2026-08&quot;,
    &quot;provider&quot;: &quot;Mistral&quot;,
    &quot;product&quot;: &quot;Studio Free mode&quot;,
    &quot;deal_type&quot;: &quot;free&quot;,
    &quot;label&quot;: &quot;API access without credit card; limited usage&quot;,
    &quot;price_intro_usd&quot;: 0,
    &quot;price_recurring_usd&quot;: 0,
    &quot;allowance_month_usd&quot;: null,
    &quot;limit_5h_usd&quot;: null,
    &quot;limit_week_usd&quot;: null,
    &quot;region&quot;: &quot;global&quot;,
    &quot;valid_from&quot;: &quot;2026-08-23&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;pricing&quot;,&quot;text&quot;:&quot;Free mode: API access is enabled by default with no credit card required. Usage and rate limits apply.&quot;}],
    &quot;confidence&quot;: &quot;high&quot;
  },
  {
    &quot;id&quot;: &quot;spacexai-grok45-free-2026-07&quot;,
    &quot;provider&quot;: &quot;SpaceXAI&quot;,
    &quot;product&quot;: &quot;Grok 4.5&quot;,
    &quot;deal_type&quot;: &quot;promo&quot;,
    &quot;label&quot;: &quot;Limited-time free Grok 4.5 usage in Grok Build and Cursor&quot;,
    &quot;price_intro_usd&quot;: 0,
    &quot;price_recurring_usd&quot;: null,
    &quot;allowance_month_usd&quot;: null,
    &quot;limit_5h_usd&quot;: null,
    &quot;limit_week_usd&quot;: null,
    &quot;region&quot;: &quot;global&quot;,
    &quot;valid_from&quot;: &quot;2026-07-16&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://x.ai/news/grok-4-5&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;pricing&quot;,&quot;text&quot;:&quot;We’re offering free Grok 4.5 usage for a limited time in Grok Build and Cursor.&quot;}],
    &quot;confidence&quot;: &quot;high&quot;
  },
  {
    &quot;id&quot;: &quot;anthropic-sonnet5-permanent-2026-06&quot;,
    &quot;provider&quot;: &quot;Anthropic&quot;,
    &quot;product&quot;: &quot;Claude Sonnet 5 API&quot;,
    &quot;deal_type&quot;: &quot;promo&quot;,
    &quot;label&quot;: &quot;Former intro $2/$10 MTok pricing made permanent&quot;,
    &quot;price_intro_usd&quot;: null,
    &quot;price_recurring_usd&quot;: null,
    &quot;allowance_month_usd&quot;: null,
    &quot;limit_5h_usd&quot;: null,
    &quot;limit_week_usd&quot;: null,
    &quot;region&quot;: &quot;global&quot;,
    &quot;valid_from&quot;: &quot;2026-06-30&quot;,
    &quot;valid_until&quot;: null,
    &quot;status&quot;: &quot;active&quot;,
    &quot;verification&quot;: &quot;official&quot;,
    &quot;source_url&quot;: &quot;https://www.anthropic.com/news/claude-sonnet-5&quot;,
    &quot;observed_at&quot;: &quot;2026-08-23T05:59:24+07:00&quot;,
    &quot;quotes&quot;: [{&quot;field&quot;:&quot;pricing&quot;,&quot;text&quot;:&quot;Sonnet 5's introductory pricing of $2/MTok input and $10/MTok output has since been made permanent&quot;}],
    &quot;confidence&quot;: &quot;high&quot;
  }
]
</code>

SECTION 3 — CHANGES VS LAST SESSION
<ul>
<li>NEW: This is the first session, so the table above establishes the baseline. Strongest quantified paid deal: OpenCode Go at 12x intro / 6x recurring on full-$60 models.</li>
<li>NEW: India — Jio’s Google AI Pro unlock remains active: 18 months, no extra AI add-on charge, requiring an eligible unlimited-5G plan. At the ₹349 minimum qualifying plan and ₹1,950/month stated AI Pro value, acquisition value is 5.59x.</li>
<li>NEW: India — Cursor Start is ₹649/month tax-inclusive.</li>
<li>NEW: Indonesia — OpenAI’s published ChatGPT Go launch price is Rp75,000/month. Current Go help confirms Go remains available, but the current help page no longer displays the local numeric price; confidence therefore medium rather than high.</li>
<li>NEW: Cloudflare Workers AI free allocation is 10,000 neurons/day; normalized at its $0.011/1,000-neuron overage rate this is ≈$3.30 per 30 days.</li>
<li>NEW: GitHub’s current AI-credit model creates explicit value ratios: Max 2.00x, Pro+ 1.79x, Pro 1.50x.</li>
<li>NEW: Cursor explicit Other Models pools: Ultra 2.00x, Pro Plus 1.17x, Pro 1.00x, before assigning any extra value to the Cursor Models pool.</li>
<li>PRICE_DROP / CURRENT-SOURCE CORRECTION: Anthropic’s current Sonnet 5 page says the former $2 input / $10 output per MTok introductory pricing has been made permanent. Discard stale references to an Aug 31, 2026 expiry.</li>
<li>DROPPED/EXPIRED: Google’s 2025 India-wide free one-year AI Pro student offer is not promoted as active. Current Google One help says the no-cost 12-month AI Pro student trial is US-only; India remains in other student bundle/discount eligibility.</li>
<li>RECHECK: Brazil — official localized pages confirmed product availability/support but did not surface a numeric Brazil-only LLM subscription price in this sweep. No BR regional arbitrage was promoted.</li>
<li>RECHECK: ChatGPT Go India/Indonesia local launch prices are official, but the current generic Go help page does not expose numeric local prices, so those rows are medium confidence until a current checkout/pricing page exposes the same amount.</li>
</ul>
<p>Bottom line: no prior table existed, so no displacement comparison is possible this session. The baseline leader among fully quantified subscription allowances is OpenCode Go; the strongest regional unlock is Jio + Google AI Pro in India.</p>
