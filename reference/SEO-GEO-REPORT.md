# SEO + GEO Audit & Synthesis Report

> **Date:** 2026-06-22
> **Method:** Static code analysis of three repositories, scored against a fixed SEO + GEO benchmark.
> **Purpose:** Compare three projects, extract the strongest practice from each, and synthesize a single reusable, framework-agnostic standard.
>
> **Deliverables produced from this report:**
> - [`standard/SEO-GEO-STANDARD.md`](../standard/SEO-GEO-STANDARD.md) — the portable standard (paste into any project / any AI agent).
> - [`adapters/claude-code/SKILL.md`](../adapters/claude-code/SKILL.md) — the same standard as an auto-invoking Claude Code skill.

---

## 1. Projects audited

| # | Project | Stack |
|---|---------|-------|
| 1 | convertlocal-app | Laravel 8.2 · Inertia · React · Tailwind |
| 2 | sigcraft.io | Laravel 8.3 · Inertia · React · **TypeScript** · **SSR** |
| 3 | email_signature_system | Laravel 8.1 · Inertia · React · Tailwind |

> **Note on scope:** scores are from **static code analysis**. Categories marked `*` (Performance/Core Web Vitals, Authority/off-site) can only be fully scored against a **live, running site** with Lighthouse / Search Console / a backlink tool. Those scores are provisional, derived from code-level signals (SSR, lazy-loading, image formats, preconnect, etc.).

---

## 2. The benchmark

Each project scored **0–100**: SEO (60 pts) + GEO (40 pts).

**SEO — 60:** Technical/crawlability (12) · On-page (14) · Content quality (10) · Performance/CWV (12)* · Structured data (8) · Mobile/accessibility (4)

**GEO — 40:** Extractability (12) · AI-parseable structure (10) · Entity & factual clarity (8) · Chunking & specificity (6) · Authority/citations (4)*

---

## 3. Scorecards

### SEO (out of 60)

| Category | Max | convertlocal-app | sigcraft.io | email_signature_system |
|---|---:|---:|---:|---:|
| Technical / crawlability | 12 | 10 | **11** | 6 |
| On-page | 14 | 11 | **13** | 8 |
| Content quality | 10 | 8 | **9** | 5 |
| Performance / CWV * | 12 | 7 | **8** | 6 |
| Structured data | 8 | **8** | **8** | 6 |
| Mobile / accessibility | 4 | 3.5 | **4** | 3.5 |
| **SEO subtotal** | **60** | **47.5** | **53** | **34.5** |

### GEO (out of 40)

| Category | Max | convertlocal-app | sigcraft.io | email_signature_system |
|---|---:|---:|---:|---:|
| Extractability | 12 | 9 | **10** | 5 |
| AI-parseable structure | 10 | 7 | **9** | 5 |
| Entity & factual clarity | 8 | 6 | **7** | 5 |
| Chunking & specificity | 6 | 4 | **5** | 3 |
| Authority / citations * | 4 | 2 | **3** | 1.5 |
| **GEO subtotal** | **40** | **28** | **34** | **19.5** |

### Totals

| | convertlocal-app | sigcraft.io | email_signature_system |
|---|---:|---:|---:|
| **TOTAL / 100** | 76 | **🏆 87** | 54 |

---

## 4. Evidence (what the code shows)

| Signal | convertlocal-app | sigcraft.io | email_signature_system |
|---|---|---|---|
| Server-rendered SEO head | ✅ Blade `partials/seo-head.blade.php` | ✅ Blade partial **+ full Inertia SSR** | ⚠️ `SeoHead.jsx` (client-side only) |
| Central SEO config | ✅ `config/seo.php` | ✅ `config/seo.php` (+ `same_as`, `organization_description`) | ✅ `config/seo.php` |
| SEO service / composer | ✅ `app/Services/PageSeoService.php` | ✅ `PageSeoService` + `SeoCatalog` + `BlogPostRepository` | ⚠️ component only |
| Dynamic sitemap + robots | ✅ `SitemapController` + `RobotsController` | ✅ `SitemapController` + `RobotsController` + `robots.txt` | ⚠️ partial |
| robots.txt static file | (dynamic via controller) | ✅ + AI-crawler rules planned | ❌ |
| Schema types present | 8 (Product, WebApplication, BreadcrumbList, FAQPage, HowTo, Organization, WebSite, Article) | 9 (+ SoftwareApplication) | 6 (no BreadcrumbList, no HowTo) |
| JSON-LD references | 35 | 27 | 20 |
| OG / Twitter tags | 12 / 5 | **23 / 13** | 6 / 5 |
| Canonical references | 23 | 17 | 8 |
| Image alt coverage | 3 / 5 (60%) | **40 / 48 (83%)** | 12 / 16 (75%) |
| H1 / H2 discipline | 6 H1 | 11 H1 | 12 H1 |
| FAQ / HowTo content files | 7 | **23** | 3 |
| Content/blog engine | ✅ markdown + repository | ✅ markdown + repository + guides/professions | ⚠️ light |
| SEO test suite | ✅ `PageSeoHeadTest`, `BlogTest` | ✅ `PageSeoHeadTest` (+ Sitemap/Robots planned) | ❌ |
| SEO/GEO docs | ✅ `SEO-LAUNCH-CHECKLIST.md` | ✅ **5 strategy docs** (STRATEGY, Growth-Plan v1/v2, Implementation Plan) | ❌ |
| Perf hints (lazy/preconnect) | 0 / 1 | 2 / 2 | 0 / 1 |
| Modern image formats (WebP/AVIF) | 0 | 0 | 0 |

---

## 5. Best of each (what each project does best)

### 🥇 sigcraft.io — the technical & GEO leader
- **Server-side rendering (SSR).** SEO meta, canonical, OG **and** page content land in the first HTML, so both Google and AI crawlers (GPTBot, ClaudeBot, PerplexityBot) see real content — not an empty React shell. This is its single biggest advantage.
- **Most complete technical infrastructure:** `SeoCatalog` + `BlogPostRepository` feed a dynamic sitemap; `RobotsController` references the sitemap URL; `robots.txt` with explicit AI-crawler `Allow` rules.
- **Richest entity definition:** `config/seo.php` carries `organization_description` + `same_as` (social profiles) → strong, quotable `Organization` schema.
- **Best on-page hygiene:** highest OG/Twitter coverage and 83% image-alt coverage across 48 images.
- **A written, codebase-verified strategy** with explicit GEO habits (answer-first intros, exact UI steps, internal-link minimums, "Last updated" stamps).

### 🥈 convertlocal-app — the cleanest architecture & schema
- **The `PageSeoService` pattern** is the cleanest: per-page methods (`forHome()`, `forGuide()`, …) with private schema helpers (`organizationSchema()`, `breadcrumbSchema()`, `faqPageSchema()`, `howToSchema()`, …) → **one source of truth** for every tag and every schema block.
- **Single-source JSON-LD render:** `seo-head.blade.php` loops `$pageSeo['jsonLd']` — no duplicate/conflicting schema.
- **Richest structured-data coverage** (8 types) with a **test suite** asserting the head tags, plus a **`SEO-LAUNCH-CHECKLIST.md`** (GSC, Bing, Rich Results, curl checks, OG debuggers).
- **Markdown content engine** (`BlogPostRepository`) that also emits `sitemapEntries()`.

### 🥉 email_signature_system — the cautionary baseline
- Cleanest demonstration of a **reusable `SeoHead.jsx`** component in plain JSX (no TypeScript) and decent H1/alt discipline for an app-heavy codebase.
- **Its main lesson is a gap:** SEO is rendered **client-side only** (no Blade `seo-head` partial, no SSR), so crawlers and AI engines may see an empty shell. It also lacks `BreadcrumbList`/`HowTo` schema, a sitemap↔robots story, and any SEO tests. It shows exactly what the standard must *prevent*.

---

## 6. Key lessons baked into the standard

1. **SEO must be server-rendered.** sigcraft's SSR wins; email_signature_system's client-only rendering is the failure mode. The standard mandates SEO-critical tags in the first HTML response.
2. **One source of truth.** convertlocal's `PageSeoService` → single render partial prevents duplicate/conflicting tags and schema (a real bug sigcraft had to fix).
3. **Sitemap ↔ robots must agree.** sigcraft found a verified bug where the sitemap listed URLs that `robots.txt` disallowed. Never list a disallowed URL.
4. **Explicitly allow AI crawlers.** GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended on public paths — this is the GEO entry ticket.
5. **GEO ≠ a separate channel.** AI Overviews use the *same* index as Search, so a strong SEO foundation *is* the GEO foundation. Skip low-value fads (`llms.txt`, "AI-language" rewrites); invest in answer-first content, FAQ/HowTo schema, and comparison pages.
6. **Verify, don't assume.** Both leaders pair the work with tests + a launch checklist + Rich Results validation. The standard makes verification a gate.

The synthesized result lives in **[`standard/SEO-GEO-STANDARD.md`](../standard/SEO-GEO-STANDARD.md)**.

---

## 7. Addendum — fourth-project validation (standard v1.1.0)

After v1.0.0 shipped, a fourth production codebase — a **Next.js 16 (App Router)** agency site —
was audited *against* the standard (overall ~72% on first pass). It surfaced no gaps in the existing
rules, but its central SEO service (`lib/seo.js`) demonstrated five practices worth promoting from
"good implementation detail" to explicit, framework-agnostic rules. These became **v1.1.0**:

1. **Environment-derived origin (§1.2, rule 2.14).** The site resolved its origin from an env var
   with a preview-deploy fallback, so canonical/OG/JSON-LD URLs work on preview and staging — not
   just production. Hardcoding the prod origin 404s OG images on social previews.
2. **`LocalBusiness` / `ProfessionalService` schema (§3.2).** The v1.0 matrix was SaaS/product-shaped
   and omitted the schema type agencies and local/service businesses need.
3. **Node identity & `@graph` linking (rule 3.4).** The codebase gave each node a stable `@id`
   (`#organization`, `#website`) and linked shared entities by `@id` in one `@graph` — the concrete
   technique behind §1.1's "one source per type".
4. **Serialization hygiene (rule 3.5).** A shared `cleanJsonLd()` stripped `undefined`/empty keys
   before stringifying, keeping JSON-LD valid.
5. **Canonical path-form normalization (rule 2.3).** A single trailing-slash + lowercase policy,
   matched by internal links and the sitemap.

That `lib/seo.js` was also genericized into the **[Next.js adapter](../adapters/nextjs/)** — a
reference implementation of the §1 architecture for the App Router.
