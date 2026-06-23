---
name: seo-geo
description: Use when implementing, auditing, or improving SEO (Search Engine Optimization) or GEO (Generative Engine Optimization / AI-answer-engine optimization) on any web project — building or reviewing pages, meta tags, titles, canonical URLs, sitemaps, robots.txt, structured data / JSON-LD schema, Open Graph, FAQ/HowTo content, Core Web Vitals, or getting cited by ChatGPT, Perplexity, Claude, and Google AI Overviews. Framework-agnostic; works on Next.js, Laravel+Inertia, Astro, Rails, plain HTML, etc.
---

# SEO + GEO Standard (agent operating skill)

You implement and verify SEO + GEO to a fixed standard. This skill is **framework-agnostic**: each rule states WHAT and a THRESHOLD; you decide HOW for the target stack. If a fuller reference exists (e.g. `standard/SEO-GEO-STANDARD.md` in the SEO + GEO Standard repo, or `docs/SEO-GEO-STANDARD.md` in your project), read it for depth — but this file is self-sufficient.

## Golden invariant
**All SEO-critical output (title, meta description, canonical, OG/Twitter, JSON-LD) MUST be in the first HTML response from the server — never injected only by client-side JavaScript.** AI crawlers and SEO snapshots do not reliably run JS. For an SPA, SSR/prerender the head.

## Operating procedure (always, in order)
1. **Discover** — detect stack; find where `<head>`/metadata is generated, routing, sitemap, robots, existing schema, content pages, images.
2. **Audit** — score against the checklist below; produce a gap list (rule → ✅/⚠️/❌).
3. **Prioritize** — P0 technical foundation → P1 on-page + schema + content → P2 GEO depth + comparison pages + authority.
4. **Implement** — follow the project's existing patterns; enforce **one source of truth** (single config → single SEO composer → single render point). Never duplicate tags or schema.
5. **Verify** — run the gate below; show evidence before claiming done.
6. **Report** — what changed, what's manual/off-site, what needs a live run (CWV, Search Console, backlinks).

## Architecture (MUST)
- Single central SEO **config** (site_name, site_url, default og_image + description, twitter handle, organization_description, same_as social URLs, sitemap_lastmod, application_category).
- Single **service/composer** produces per page: title, description, canonical, og, twitter, robots directive, jsonLd[].
- Single **render point** emits it all server-side. Pages call the service; they never hand-build tags.

## On-page checklist (per page)
- One `<title>` 30–60 chars, keyword-forward + brand.
- Meta description 120–160 chars, unique.
- Self-referential absolute `canonical` (one).
- Exactly one `<h1>` = primary intent; logical h2/h3 (H2s as questions where natural).
- Open Graph: og:title/description/url/image/type/site_name.
- Twitter: card=summary_large_image, title, description, image. OG image ~1200×630, absolute URL.
- Descriptive `alt` on every meaningful image (≥90% coverage); decorative = `alt=""`.
- `<html lang>`, charset, responsive viewport.
- App/auth/duplicate pages → `robots: noindex` and excluded from sitemap.

## Structured data (JSON-LD, server-rendered, one source per type)
| Schema | Apply to |
|---|---|
| `Organization` (+logo, sameAs), `WebSite` | every public page (global) |
| `SoftwareApplication`/`WebApplication` | tool/app/home/landing (set applicationCategory, offers if free) |
| `BreadcrumbList` | every page below top level |
| `FAQPage` | pages with a Q&A block |
| `HowTo` | step-by-step / install / tutorial pages |
| `Article`/`BlogPosting` | blog posts (datePublished, dateModified, author) |
| `Product` (+AggregateRating only if real) | product/template pages |

Validate every page with Google Rich Results Test. Never emit fake ratings.

## Technical / crawlability (MUST)
- `sitemap.xml` generated from canonical URLs, valid ISO-8601 `<lastmod>`, auto-includes new content.
- `robots.txt` present, references absolute `Sitemap:` URL, disallows only private/app/auth paths.
- **Sitemap ↔ robots must agree** — never list a disallowed URL in the sitemap (verify both ways).
- **Explicitly `Allow` AI crawlers** on public paths: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`.
- Canonical 200s; one-hop 301s; one canonical host; HTTPS; no redirect chains / soft-404s / crawl traps.

## Performance / Core Web Vitals (verify on live build)
- LCP < 2.5s, INP < 200ms, CLS < 0.1 (p75 mobile). Lighthouse SEO ≥ 95.
- Lazy-load below-fold images; eager + `fetchpriority="high"` on the LCP image.
- WebP/AVIF with width/height set; preconnect to asset/font origins; preload LCP asset; defer non-critical JS/CSS; `font-display: swap`.

## GEO (Generative Engine Optimization)
**Positioning:** AI Overviews/most AI search use the *same index* as Search — GEO is SEO + answer-shaped content + AI-crawler access, not a separate channel. **Do not** prioritize `llms.txt` or "AI-language rewrites" (low/zero ROI).
- **Answer-first:** each content page opens with a direct **40–60 word** answer to its core question, before preamble.
- **Question-shaped, self-contained sections:** H1 = target query; H2s = real questions; each section quotable in isolation.
- **Extractable formats:** FAQ (→FAQPage), numbered steps (→HowTo), comparison tables, definition lists.
- **Entity clarity:** state plainly what the product is — name, category, free/paid, privacy posture, supported platforms. These are the quotable facts AI repeats.
- **Specificity:** exact UI paths, concrete numbers, cited statistics. **Freshness:** visible "Last updated: YYYY-MM-DD" synced to `dateModified`.
- **Internal links:** ≥3 out, ≥2 in per content page. **Comparison / "best-of" pages** = high GEO ROI; build them factually.

## Content quality
One page per intent (no cannibalization); programmatic pages ≥300 words unique (checklist + do/don't + 3–5 FAQs); intent match; E-E-A-T identity; original media with alt.

## Verification gate (evidence before "done")
- [ ] Tests assert each page type renders title/desc/canonical/OG/Twitter + expected JSON-LD types.
- [ ] Tests assert sitemap valid (only indexable+allowed URLs) and robots references sitemap, blocks private paths, allows AI crawlers.
- [ ] No duplicate JSON-LD of the same type on any page.
- [ ] `curl -sL <url> | grep -E '<title>|name="description"|rel="canonical"|og:image|application/ld\+json'` shows tags in **server HTML** (JS off).
- [ ] Rich Results Test passes per page type; OG renders in debuggers; Lighthouse SEO ≥95 + CWV in range; Search Console + Bing verified, sitemap submitted.

## Never
SEO via client-JS only · duplicate/conflicting schema or canonical · sitemap listing disallowed URLs · same title/meta across pages · fake ratings · blocking AI crawlers by default · chasing llms.txt before the foundation exists.
