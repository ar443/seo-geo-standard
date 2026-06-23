# Example: a worked SEO + GEO audit

> **This is an illustrative example, not a real project.** It shows the shape of the
> output an AI agent produces when handed [the standard](../standard/SEO-GEO-STANDARD.md)
> and asked to *"audit this project for SEO and GEO."* The fictional target is a small
> marketing + docs site (`acme-tools`) on Next.js (App Router) with a few programmatic
> pages. Rule IDs (e.g. `2.1`, `4.4`) refer to sections of the standard.

---

## Phase 1 — Discover

| What | Found |
|---|---|
| Stack | Next.js 14 (App Router), React, Tailwind |
| `<head>` / metadata | `generateMetadata()` per route + a client `<JsonLd>` component |
| Routing | File-based; `app/`, plus `app/compare/[slug]/page.tsx` (programmatic) |
| Sitemap | `app/sitemap.ts` (Next built-in) |
| Robots | None (no `robots.txt`, no `app/robots.ts`) |
| Schema | `Organization` only, injected **client-side** via `<JsonLd>` |
| Content | 1 home, 1 pricing, 6 docs guides, 12 `/compare/{slug}` pages |
| Images | `next/image` on most; 9 of 31 missing `alt` |

**Immediate red flag:** JSON-LD is injected client-side (violates the golden invariant and §1.4).

---

## Phase 2 — Audit

**Score: 58 / 100** — SEO 38/60, GEO 20/40. Solid metadata foundation; structured data,
crawlability, and GEO depth are the weak spots.

### Gap list (rule → status)

| Rule | Status | Note |
|---|:--:|---|
| 1.1 One source of truth | ⚠️ | Metadata is centralized, but JSON-LD lives in a separate client component |
| 1.4 Server-side rendering of SEO | ❌ | JSON-LD only rendered client-side |
| 2.1 Unique `<title>` | ✅ | 30–60 chars, brand-suffixed |
| 2.2 Meta description | ⚠️ | 4 docs pages share one templated description |
| 2.3 Canonical URL | ❌ | No `alternates.canonical` set; programmatic pages self-conflict |
| 2.6 / 2.7 OG + Twitter | ✅ | Complete via `generateMetadata()` |
| 2.9 Image alt ≥ 90% | ❌ | 22/31 = 71% coverage |
| 3.1 JSON-LD server-rendered | ❌ | Client-only (see §1.4) |
| 3.2 Schema-by-page-type | ❌ | Only `Organization`; missing `WebSite`, `BreadcrumbList`, `FAQPage`, `HowTo`, `SoftwareApplication` |
| 4.1 `sitemap.xml` | ⚠️ | Exists but includes 3 `noindex` URLs |
| 4.2 `robots.txt` | ❌ | Absent |
| 4.3 Sitemap ↔ robots agreement | ❌ | Cannot verify — no robots; sitemap lists pages that should be private |
| 4.4 AI-crawler allow rules | ❌ | No explicit `Allow` for GPTBot/ClaudeBot/PerplexityBot |
| 6.1 Answer-first blocks | ❌ | Guides open with marketing preamble |
| 6.2 Question-shaped H2s | ⚠️ | Some guides; comparison pages use noun-phrase headings |
| 6.6 Freshness signals | ❌ | No visible "Last updated"; no `dateModified` |
| 6.8 Comparison / best-of pages | ⚠️ | 12 exist but thin, no `FAQPage`, no internal links |

### Per-page-type coverage

| Page type | Title | Desc | Canonical | OG/Tw | JSON-LD | Answer-first | Verdict |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Home | ✅ | ✅ | ❌ | ✅ | ⚠️ | ❌ | ⚠️ |
| Pricing | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ⚠️ |
| Docs guide | ✅ | ⚠️ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Compare `/compare/{slug}` | ✅ | ⚠️ | ❌ | ✅ | ❌ | ❌ | ❌ |

---

## Phase 3 — Prioritize

**P0 — technical foundation (do first):**
1. Move all JSON-LD to **server-rendered** output (§1.4, §3.1).
2. Add self-referential `canonical` to every indexable page (§2.3).
3. Add `app/robots.ts`: reference the sitemap, disallow private paths, **explicitly allow AI crawlers** (§4.2, §4.4).
4. Remove `noindex` URLs from the sitemap; verify sitemap ↔ robots agreement both ways (§4.1, §4.3).

**P1 — on-page + schema + content:**
5. Add a single server-side SEO/JSON-LD composer (`Organization` + `WebSite` globally; `BreadcrumbList`, `FAQPage`, `HowTo`, `SoftwareApplication` per page type) (§1.1, §3.2).
6. Make the 4 duplicate docs descriptions unique (§2.2). Reach ≥ 90% alt coverage (§2.9).

**P2 — GEO depth:**
7. Add answer-first 40–60 word blocks and question-shaped H2s to guides and comparison pages (§6.1, §6.2).
8. Add visible "Last updated" + `dateModified`; flesh out the 12 comparison pages with tables, FAQ schema, and ≥ 3 internal links each (§6.6, §6.8, §6.7).

---

## Phase 4 — Implement (summary)

- Introduced `lib/seo.ts` (central config) + `lib/seo/compose.ts` (per-page composer producing `title`, `description`, `canonical`, `og`, `twitter`, `robots`, `jsonLd[]`) → **one source of truth** (§1.1).
- Rendered all metadata and JSON-LD in `generateMetadata()` / server components — no client injection (§1.4).
- Added `app/robots.ts` with AI-crawler `Allow` rules; rebuilt `app/sitemap.ts` from the canonical, indexable URL set only.
- Added answer-first intros + question H2s + "Last updated" stamps to guides and comparison pages.

---

## Phase 5 — Verify (gate)

| Gate item (§8) | Before | After | Evidence |
|---|:--:|:--:|---|
| Page types render title/desc/canonical/OG/Twitter/JSON-LD | ❌ | ✅ | `seo.test.ts` asserts each route's tags |
| Sitemap lists only indexable + allowed URLs | ❌ | ✅ | `sitemap.test.ts` |
| robots references sitemap, blocks private, allows AI crawlers | ❌ | ✅ | `robots.test.ts` |
| No duplicate JSON-LD of same type | ⚠️ | ✅ | composer dedupes by `@type` |
| Tags present in **server HTML** (JS off) | ❌ | ✅ | see curl below |

```bash
$ curl -sL https://acme-tools.example/compare/acme-vs-rival \
  | grep -E '<title>|name="description"|rel="canonical"|og:image|application/ld\+json'
<title>Acme vs Rival: feature comparison (2026) — Acme Tools</title>
<meta name="description" content="...">
<link rel="canonical" href="https://acme-tools.example/compare/acme-vs-rival"/>
<meta property="og:image" content="https://acme-tools.example/og/acme-vs-rival.png"/>
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[...]}</script>
```

**Final score: 91 / 100** (SEO 55/60, GEO 36/40).

---

## Phase 6 — Report

**Done in-repo:** server-rendered SEO + JSON-LD, canonicals, robots with AI-crawler rules,
sitemap↔robots agreement, schema coverage, answer-first GEO content, tests.

**Needs a live run (cannot be scored from code):**
- Lighthouse SEO ≥ 95 and Core Web Vitals (§5) on the deployed build.
- Rich Results Test per page type (§8).
- Search Console + Bing: verify property, submit sitemap, watch coverage.

**Off-site / manual (§6.9):** pursue accurate presence on sources AI engines retrieve
(authoritative listicles, comparison sites) as a parallel content effort.
