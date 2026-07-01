# Next.js adapter

A framework-specific **reference implementation** of the [SEO + GEO Standard](../../standard/SEO-GEO-STANDARD.md)
for **Next.js (App Router)**. It shows one concrete way to satisfy the standard's §1 architecture
rule — *single config → single composer → single render point* — using the Next.js Metadata API and
server-rendered JSON-LD.

> The standard itself is deliberately framework-agnostic. This adapter is the "HOW" for one stack.
> It was distilled from a production Next.js codebase audited against the standard.

## Files

- [`seo.js`](seo.js) — the central SEO service. Copy it into your project (e.g. `lib/seo.js`),
  edit the `CONFIG` block, and import from it everywhere. Every helper is annotated with the
  rule (`§x.y`) it implements.

## Usage

**1. Configure once.** Edit the `CONFIG` block in `seo.js` (`SITE_NAME`, `SITE_DOMAIN`,
`DEFAULT_DESCRIPTION`, `DEFAULT_OG_IMAGE`, `SAME_AS`). Set `NEXT_PUBLIC_SITE_URL` in production
so canonical/OG URLs resolve in every environment (§1.2).

**2. Root layout** — apply the title template and global JSON-LD:

```js
// app/layout.js
import { titleTemplate, buildGraph, generateOrganizationJsonLd, generateWebSiteJsonLd } from "@/lib/seo";

export const metadata = { title: titleTemplate("Your tagline within 60 chars") };

export default function RootLayout({ children }) {
  const graph = buildGraph(generateOrganizationJsonLd(), generateWebSiteJsonLd());
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
        {children}
      </body>
    </html>
  );
}
```

**3. Any page** — compose per-page metadata and schema:

```js
// app/guides/some-guide/page.js
import {
  pageMetadata, buildGraph, generateBreadcrumbJsonLd, generateFaqJsonLd, generateHowToJsonLd,
} from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Primary keyword first — concise",
  description: "120–160 chars, includes intent and a reason to click.",
  path: "/guides/some-guide",
});

export default function Page() {
  const graph = buildGraph(
    generateBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: "Some Guide" },
    ]),
    generateHowToJsonLd({ name: "How to X", steps: [{ title: "Step 1", text: "…" }] }),
    generateFaqJsonLd([{ question: "Q?", answer: "A." }]),
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <h1>Some Guide</h1>
      {/* answer-first block (§6.1), question-shaped H2s (§6.2), … */}
    </>
  );
}
```

**4. `noindex` pages** — pass a robots directive and exclude from the sitemap:

```js
export const metadata = pageMetadata({ title: "Dashboard", path: "/app", robots: { index: false } });
```

## Rule coverage

| Helper | Standard rule |
|---|---|
| `CONFIG` block + `getSiteUrl()` | §1.2 central config, env-derived origin |
| `pageMetadata()` | §1.3 composition · §2.1/2.2/2.3/2.6/2.7 |
| `canonicalUrl()` | §2.3 single path form |
| `absoluteUrl()` / `getSiteUrl()` | §2.14 environment-resolvable absolute URLs |
| `generateOrganizationJsonLd({ localBusiness })` | §3.2 `Organization` / `LocalBusiness` / `ProfessionalService` |
| `generateWebSiteJsonLd({ searchUrlTemplate })` | §3.2 `WebSite` (+ `SearchAction`) |
| `generateBreadcrumbJsonLd` / `generateFaqJsonLd` / `generateHowToJsonLd` / `generateArticleJsonLd` | §3.2 page-type schema |
| stable `@id` + `buildGraph()` | §3.4 node identity & graph linking |
| `cleanJsonLd()` | §3.5 serialization hygiene |

## Still your job (this adapter doesn't do it for you)

- **Content & GEO depth** (§6, §7): answer-first blocks, question-shaped headings, comparison pages.
- **`sitemap.xml` / `robots.txt`** (§4): generate from your canonical URL set; allow AI crawlers;
  keep sitemap ↔ robots in agreement.
- **Verification** (§8): tests asserting each page type renders the expected tags + JSON-LD, plus
  the live checks (Rich Results Test, Lighthouse, server-HTML `curl`).
