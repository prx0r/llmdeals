# AGENTS.md — LLMDeals build conventions

Read this before touching web/src. Every rule here fixed a real build failure.

## Data flow (do not break)
- `data/seed.json` is the ONLY hand-edited dataset.
- `npm run build` in web/ triggers prebuild `node ../scripts/build-data.mjs`
  which writes: `web/public/api/v1/{top,deals,changes}.json` (shipped as static
  API) and `web/src/data/deals-derived.json` (imported by pages).
- Never import from `../../../../data/` — generated imports live under
  `web/src/data/`. Pages import `../data/deals-derived.json` (from src/pages/)
  or `../../data/deals-derived.json` (from src/pages/deals/).

## Astro gotchas that bit us
1. `{arr.map(x => `<html>${x}</html>`).join('')}` inside JSX gets HTML-ESCAPED
   → renders literal `<div>` text on the page.
   FIX: build the string in frontmatter, render with `set:html={...}`.
   Escape user-ish strings with a small esc() helper first.
2. Nested template literals inside JSX expressions can crash esbuild with
   misleading "Expected }" errors pointing at <style>. Same fix as (1):
   precompute strings in frontmatter, string-concat or esc() there.
3. Astro escapes `$` in some attribute contexts; never write `\${` in frontmatter
   data. If you see literal `\$10` on the page, remove the backslashes.
4. prebuild path is relative to web/: use `node ../scripts/build-data.mjs`.

## Verification before deploy (always)
- `grep -c 'deal-full' web/dist/index.html` should equal 5 and no
  `&lt;div` anywhere in dist HTML.
- All internal links exist: check /deals/<slug> hrefs against dist dirs.
- API files present: dist/api/v1/top.json deals.json changes.json.

## Deploy
export CLOUDFLARE_API_TOKEN=... (in shell profile)
npx wrangler pages deploy web/dist --project-name=llmdeals-v2 --branch=main --commit-dirty=true
If pages.dev serves stale content after deploy, hard-refresh; edge cache
on the *old* project name was sticky once — deploying to a fresh project
name (llmdeals-v2) was the escape hatch.

## Adding a deal
1. Edit data/seed.json (offer + optional model + route + assessment + quotes).
2. Run node scripts/build-data.mjs && cd web && npm run build.
3. Detail page auto-generates at /deals/<slug> via getStaticPaths.

## Validating discovered candidates (#7 contract)
node scripts/validate-candidate.mjs candidate.json  → PASS required before merge.
