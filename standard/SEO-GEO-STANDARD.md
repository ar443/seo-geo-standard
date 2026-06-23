# SEO + GEO Standard

**Version 1.0.0** · Status: Stable · Last updated: 2026-06-23 · License: MIT

> **What this is:** a complete, framework-agnostic standard for Search Engine Optimization (SEO) and Generative Engine Optimization (GEO). Hand this file to any AI agent (Claude, Cursor, Copilot, ChatGPT) on any project. The agent audits the project against it, reports gaps, implements the fixes, and verifies them.
>
> **How it was built:** synthesized from auditing three production codebases and taking the strongest, codebase-verified practice from each. See [`reference/SEO-GEO-REPORT.md`](../reference/SEO-GEO-REPORT.md).
>
> **Design rule:** every requirement states **WHAT** and a **THRESHOLD**. It does **not** prescribe a framework. The agent figures out *how* for the target stack (Next.js, Laravel+Inertia, Astro, Rails, plain HTML, etc.).
>
> **Conformance keywords:** **MUST** = required · **SHOULD** = strongly recommended · **MAY** = optional.

---

## 0. Operating procedure (what the AI agent does with this file)

When handed this standard, the agent **MUST** follow these phases in order:

1. **Discover** — detect the stack; locate how `<head>`/metadata is generated, the routing/sitemap/robots setup, existing schema, content pages, and images.
2. **Audit** — score the project against every rule in §1–§7. Produce a gap list (rule ID → status: ✅ pass / ⚠️ partial / ❌ fail) and a per-page-type coverage table.
3. **Prioritize** — order fixes P0 (technical foundation) → P1 (on-page + schema + content) → P2 (GEO depth, comparison pages, authority).
4. **Implement** — apply fixes following the stack's existing patterns and the "one source of truth" rule (§1.1). Never duplicate tags or schema.
5. **Verify** — run the verification gate (§8). Do not claim done until evidence passes.
6. **Report** — summarize what changed, remaining manual/off-site tasks, and live-only items (Core Web Vitals, Search Console, backlinks).

The golden invariant: **all SEO-critical output (title, meta, canonical, OG/Twitter, JSON-LD) MUST exist in the first HTML response from the server** — never injected only by client-side JavaScript. AI crawlers and many SEO snapshots do not execute JS reliably.

---

## 1. Architecture rules

**1.1 — One source of truth (MUST).** All SEO metadata flows from a single configuration + a single composition layer (a "SEO service") into a single render point. No page emits its own ad-hoc tags or duplicate JSON-LD. (Duplicate schema is a real, observed bug.)

**1.2 — Central config (MUST).** A single config holds site-wide defaults: `site_name`, `site_url`, default `og_image`, default description, `twitter_handle`, `organization_description`, `same_as` (social profile URLs), `sitemap_lastmod`, and the app's schema `application_category`.

**1.3 — Per-page composition (MUST).** A service/composer produces, per page: `title`, `description`, `canonical`, `og`, `twitter`, `robots` directive, and a `jsonLd` array. Pages call the service; they never hand-build tags.

**1.4 — Server-side rendering of SEO (MUST).** The render point emits all of §2 and §3 into the initial HTML. If the app is a client-side SPA, SEO **MUST** still be server-rendered (SSR, server-template head, or prerender). Client-only meta injection is non-conformant.

---

## 2. On-page SEO (per page)

| ID | Rule | Threshold |
|---|---|---|
| 2.1 | Unique `<title>` | One per page, **30–60 chars**, primary keyword near front, brand suffix |
| 2.2 | Meta description | Unique, **120–160 chars**, includes intent + a reason to click |
| 2.3 | Canonical URL | Self-referential absolute URL on every indexable page; one only |
| 2.4 | Exactly one `<h1>` | Matches the page's primary search intent |
| 2.5 | Heading hierarchy | Logical `h1→h2→h3`, no skipped levels; H2s phrased as questions where natural |
| 2.6 | Open Graph | `og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name` |
| 2.7 | Twitter Card | `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` |
| 2.8 | OG image | Absolute URL, ~1200×630, < 1 MB; per-page where meaningful, else default |
| 2.9 | Image alt text | Descriptive `alt` on every meaningful image; **≥ 90% coverage**; decorative images `alt=""` |
| 2.10 | Internal links | Descriptive anchor text; every page reachable; no orphans |
| 2.11 | URL structure | Lowercase, hyphenated, stable, keyword-bearing; no tracking params in canonical |
| 2.12 | `noindex` correctness | App/auth/duplicate pages return `robots: noindex`; public pages never accidentally `noindex` |
| 2.13 | `<html lang>` + `charset` + responsive `viewport` | Present on every page |

---

## 3. Structured data (JSON-LD)

**3.1 — Format (MUST).** Emit valid JSON-LD (`<script type="application/ld+json">`), one source per type (no duplicates), server-rendered.

**3.2 — Schema-by-page-type matrix (MUST apply the relevant rows):**

| Schema type | Apply to |
|---|---|
| `Organization` (+ `logo`, `sameAs`) | **Every** public page (global) |
| `WebSite` (+ `SearchAction` if site search exists) | **Every** public page (global) |
| `SoftwareApplication` / `WebApplication` | Tool/app/home/landing pages (set `applicationCategory`, `offers` if free) |
| `BreadcrumbList` | Every page below the top level |
| `FAQPage` | Pages with a Q&A block (guides, comparisons, product pages) |
| `HowTo` | Step-by-step / install / tutorial pages |
| `Article` / `BlogPosting` | Blog posts (with `datePublished`, `dateModified`, `author`) |
| `Product` (+ `AggregateRating` if real) | Product/template pages |

**3.3 — Validity (MUST).** Every page's schema passes Google's [Rich Results Test](https://search.google.com/test/rich-results). Never emit ratings/reviews schema for ratings that don't exist.

---

## 4. Technical SEO & crawlability

| ID | Rule | Threshold |
|---|---|---|
| 4.1 | `sitemap.xml` | Generated from the canonical URL set; valid `<lastmod>` (config-driven, ISO 8601); auto-includes new content |
| 4.2 | `robots.txt` | Present; references the absolute `Sitemap:` URL; disallows private/app/auth paths only |
| 4.3 | **Sitemap ↔ robots agreement (MUST)** | The sitemap **never** lists a URL that `robots.txt` disallows. Verify both directions. |
| 4.4 | AI-crawler allow rules (GEO entry ticket) | Explicitly `Allow` `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended` on public paths |
| 4.5 | Status codes & redirects | Canonical 200; one-hop 301 for moved URLs; no soft-404s; no redirect chains/loops |
| 4.6 | HTTPS + single host | One canonical host (www vs non-www, http→https all 301 to canonical) |
| 4.7 | Pagination / faceting | No infinite crawl traps; parameterized duplicates canonicalized or `noindex` |

---

## 5. Performance & Core Web Vitals *(verify on a live build)*

| ID | Rule | Threshold |
|---|---|---|
| 5.1 | Largest Contentful Paint (LCP) | **< 2.5 s** (p75, mobile) |
| 5.2 | Interaction to Next Paint (INP) | **< 200 ms** (p75) |
| 5.3 | Cumulative Layout Shift (CLS) | **< 0.1** (p75) |
| 5.4 | Lazy-load below-the-fold images | `loading="lazy"`; eager + `fetchpriority="high"` for the LCP image |
| 5.5 | Modern image formats | Serve WebP/AVIF with fallbacks; width/height set to reserve space |
| 5.6 | Resource hints | `preconnect`/`dns-prefetch` to asset/font/CDN origins; `preload` the LCP asset |
| 5.7 | No render-blocking | Defer non-critical JS/CSS; avoid layout-shifting web fonts (`font-display: swap`) |
| 5.8 | Lighthouse SEO | **≥ 95** on key page types |

---

## 6. GEO — Generative Engine Optimization

> **Positioning (MUST internalize):** Google AI Overviews and most AI search use the **same crawl/index** as classic Search. GEO is therefore **not** a separate channel that replaces SEO — it is SEO plus answer-shaped content and explicit AI-crawler access. **Do not** prioritize `llms.txt` or "rewrite everything in AI language" — these are low/zero ROI. Prioritize the items below.

**6.1 — Answer-first blocks (MUST).** Every content page opens with a **direct 40–60 word answer** to the page's core question, before any preamble. AI engines lift this verbatim.

**6.2 — Question-shaped structure (MUST).** H1 = the target query. H2s are real questions a user would ask. Each section is **self-contained** (understandable without the rest of the page) so it can be quoted in isolation.

**6.3 — Extractable formats (SHOULD).** Use FAQ blocks (backed by `FAQPage` schema), numbered step lists (backed by `HowTo`), comparison tables, and definition lists. These are the formats models cite most.

**6.4 — Entity & factual clarity (MUST).** State plainly, in prose, what the product *is*: name, category, that it's free/paid, privacy posture (e.g. "runs locally, no upload"), and supported platforms. These are the quotable facts an AI repeats. Back them with `Organization` + the right application schema.

**6.5 — Specificity over marketing (SHOULD).** Exact UI paths ("Settings → See all settings → Signature"), concrete numbers, named formats/versions. Cite any statistic with a linked source. Vague copy does not get cited.

**6.6 — Freshness signals (SHOULD).** Visible "Last updated: YYYY-MM-DD" on content pages; keep `dateModified` in `Article` schema in sync.

**6.7 — Internal link density (SHOULD).** Each content page links out to **≥ 3** related pages and is linked from **≥ 2**. Builds topical clusters models and crawlers traverse.

**6.8 — Comparison / "best-of" pages (SHOULD).** "Best X for Y" and "A vs B" pages have **high GEO ROI** — they are disproportionately cited by AI answers. Create them for your category, factually and fairly.

**6.9 — Off-site presence (MAY, non-code).** Be present and accurate on sources AI engines retrieve and trust (Wikipedia where eligible, Reddit, authoritative listicles, comparison sites). Track as a parallel content/PR effort.

---

## 7. Content quality

| ID | Rule | Threshold |
|---|---|---|
| 7.1 | One page per intent | A dedicated, indexable page per distinct search intent; no two pages targeting the same query (avoid cannibalization) |
| 7.2 | Unique depth | Key pages carry genuinely unique copy (programmatic pages **≥ 300 words** unique: checklist + do/don't + 3–5 FAQs) |
| 7.3 | Intent match | Content answers the query the title promises; matches the SERP's dominant content type |
| 7.4 | E-E-A-T minimum | Real author/organization identity, contact, and—where relevant—credentials |
| 7.5 | Media | Original images/screenshots over stock; all with descriptive `alt` |

---

## 8. Verification gate (evidence before "done")

The agent **MUST** confirm these before claiming completion:

**Automated (in-repo):**
- [ ] A test asserts every page type renders: title, meta description, canonical, OG, Twitter, and expected JSON-LD types.
- [ ] A test asserts `sitemap.xml` is valid and lists only indexable, allowed URLs.
- [ ] A test asserts `robots.txt` references the sitemap, disallows private paths, and allows AI crawlers.
- [ ] No duplicate JSON-LD blocks of the same type on any page.

**External / manual (document results):**
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) passes on each page type.
- [ ] `curl -sL <url> | grep -E '<title>|name="description"|rel="canonical"|og:image|application/ld\+json'` shows tags in **server HTML** (JS disabled).
- [ ] OG/Twitter render correctly in social/post debuggers.
- [ ] Lighthouse SEO ≥ 95 and CWV within §5 thresholds on key pages.
- [ ] Search Console + Bing Webmaster Tools: property verified, sitemap submitted, no coverage errors.

---

## 9. Acceptance criteria per page type (quick reference)

| Page type | MUST have |
|---|---|
| **Home / landing** | Title, desc, canonical, OG/Twitter, `Organization` + `WebSite` + `SoftwareApplication`/`WebApplication`, answer-first intro, one H1 |
| **Tool / app page** | All of home + `WebApplication` with `applicationCategory` + `offers` (free), how-it-works steps |
| **Guide / how-to** | `HowTo` + `FAQPage` + `BreadcrumbList`, exact step paths, answer-first, "Last updated", ≥3 internal links |
| **Blog post** | `Article` (`datePublished`/`dateModified`/`author`) + `BreadcrumbList`, H1=query, FAQ block, in sitemap |
| **Comparison / "best-of"** | `FAQPage` + `BreadcrumbList`, comparison table, fair factual claims, internal links |
| **Programmatic (e.g. /category/{slug})** | Unique ≥300-word copy, `FAQPage` + `BreadcrumbList`, unique title/desc, no duplicate meta |
| **App / auth / duplicate** | `robots: noindex`, excluded from sitemap |

---

## 10. Anti-patterns (never do)

- ❌ SEO tags injected only by client-side JS (invisible to AI crawlers and snapshots).
- ❌ Duplicate or conflicting JSON-LD / canonical / title on a page.
- ❌ Sitemap listing URLs that `robots.txt` disallows.
- ❌ Same `<title>`/meta description across many pages (template not filled per page).
- ❌ Fake `AggregateRating`/review schema.
- ❌ Blocking AI crawlers by default, then wondering why you're not cited.
- ❌ Chasing `llms.txt` / "AI rewrites" before the technical + content foundation exists.
- ❌ Marketing fluff where a concrete, quotable fact belongs.

---

*Source of truth for this standard's derivation: [`reference/SEO-GEO-REPORT.md`](../reference/SEO-GEO-REPORT.md). Keep this file framework-agnostic — stack-specific implementation details belong in each project, not here.*
