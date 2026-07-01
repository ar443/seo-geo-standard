/**
 * Next.js (App Router) reference implementation of the SEO + GEO Standard.
 * ──────────────────────────────────────────────────────────────────────────
 * This is the "single config → single composer → single render point" architecture
 * from §1 of the standard, expressed for the Next.js Metadata API + JSON-LD.
 *
 * It is a TEMPLATE: replace the constants in the CONFIG block with your site's values.
 * Rule references (§x.y) point back to standard/SEO-GEO-STANDARD.md.
 *
 * Map to the standard:
 *   §1.1 one source of truth ......... every page imports from this file; no ad-hoc tags
 *   §1.2 central config + env origin .. CONFIG block + getSiteUrl()
 *   §1.3 per-page composition ......... pageMetadata()
 *   §2.3 canonical (single path form) . canonicalUrl() — trailing slash, lowercase host
 *   §2.6/2.7 OG + Twitter ............. pageMetadata()
 *   §2.14 env-resolvable absolute URLs  absoluteUrl() + getSiteUrl()
 *   §3.1/3.5 valid, clean JSON-LD ..... cleanJsonLd()
 *   §3.2 schema-by-page-type .......... generate*JsonLd() helpers
 *   §3.4 node identity + @graph ....... stable @id values + buildGraph()
 */

// ──────────────────────────────────────────────
//  CONFIG  (§1.2 — edit these)
// ──────────────────────────────────────────────

export const SITE_NAME = "Your Site";
export const SITE_DOMAIN = "example.com";

export const DEFAULT_DESCRIPTION =
  "One- or two-sentence default description, 120–160 chars, used when a page provides none.";

export const DEFAULT_OG_IMAGE = "/og-default.png"; // ~1200×630, < 1 MB
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export const DEFAULT_LOCALE = "en_US";
export const TWITTER_HANDLE = undefined; // e.g. "@yoursite" when an account exists

export const SAME_AS = [
  // "https://www.linkedin.com/company/your-company",
  // "https://x.com/yoursite",
];

// ──────────────────────────────────────────────
//  Origin resolution  (§1.2 / §2.14 — env-derived, never hardcoded)
// ──────────────────────────────────────────────

/**
 * Public origin (no trailing slash). Resolution priority:
 *   1. NEXT_PUBLIC_SITE_URL (set in production).
 *   2. VERCEL_URL when VERCEL_ENV === "preview" — so preview deploys emit live
 *      canonical/OG URLs instead of 404'ing on social previews.
 *   3. Hardcoded production fallback (last resort).
 */
export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_URL && process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `https://${SITE_DOMAIN}`;
}

// ──────────────────────────────────────────────
//  URL helpers  (§2.3 single path form, §2.14 absolute)
// ──────────────────────────────────────────────

/** Absolute canonical URL with one consistent path form (trailing slash). */
export function canonicalUrl(pathname) {
  const base = getSiteUrl().replace(/\/$/, "");
  if (!pathname || pathname === "/") return `${base}/`;
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${p.endsWith("/") ? p : `${p}/`}`;
}

/** Resolve a relative path (or pass an already-absolute URL through) to an absolute URL. */
export function absoluteUrl(pathOrUrl) {
  if (pathOrUrl == null || pathOrUrl === "") return "";
  const s = String(pathOrUrl).trim();
  if (/^https?:\/\//i.test(s)) return s;
  const base = getSiteUrl().replace(/\/$/, "");
  return `${base}${s.startsWith("/") ? s : `/${s}`}`;
}

// ──────────────────────────────────────────────
//  Length helpers  (§2.1 title 30–60, §2.2 desc 120–160)
// ──────────────────────────────────────────────

/** Truncate at a word boundary, appending "…" if trimmed. */
export function truncate(str, maxLen) {
  if (!str || str.length <= maxLen) return str;
  const trimmed = str.slice(0, maxLen - 1);
  const lastSpace = trimmed.lastIndexOf(" ");
  return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + "…";
}

/** Keep a page title within budget, leaving room for the " | Brand" suffix. */
export function seoTitle(pageTitle) {
  if (!pageTitle) return pageTitle;
  return pageTitle.length > 52 ? truncate(pageTitle, 52) : pageTitle;
}

export function seoDescription(desc) {
  if (!desc) return desc;
  return desc.length > 160 ? truncate(desc, 160) : desc;
}

/** Root-layout title template: page titles auto-gain the " | Brand" suffix. */
export function titleTemplate(suffix) {
  return { default: `${SITE_NAME} | ${suffix}`, template: `%s | ${SITE_NAME}` };
}

// ──────────────────────────────────────────────
//  Per-page metadata composer  (§1.3, §2)
// ──────────────────────────────────────────────

/**
 * Build a Next.js `export const metadata` object for any route.
 * Pages pass only their unique fields; everything else is centralized here.
 */
export function pageMetadata({ title, description = DEFAULT_DESCRIPTION, path, ogImage, ogImageAlt, robots }) {
  const url = canonicalUrl(path);
  const img = absoluteUrl(ogImage || DEFAULT_OG_IMAGE);
  const alt = ogImageAlt || SITE_NAME;
  const safeTitle = seoTitle(title);
  const safeDesc = seoDescription(description);

  return {
    title: safeTitle,
    description: safeDesc,
    alternates: { canonical: url },
    ...(robots ? { robots } : {}),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      url,
      title: safeTitle,
      description: safeDesc,
      images: [{ url: img, width: DEFAULT_OG_IMAGE_WIDTH, height: DEFAULT_OG_IMAGE_HEIGHT, alt }],
    },
    twitter: {
      card: "summary_large_image",
      ...(TWITTER_HANDLE ? { site: TWITTER_HANDLE } : {}),
      title: safeTitle,
      description: safeDesc,
      images: [img],
    },
  };
}

// ─────────────────────────────────────────────────────────────
//  JSON-LD helpers  (§3 — return plain Schema.org nodes with stable @id)
// ─────────────────────────────────────────────────────────────

const orgId = () => `${getSiteUrl()}/#organization`;
const siteId = () => `${getSiteUrl()}/#website`;

/**
 * Organization node. Pass `localBusiness: true` (or a `ProfessionalService` subtype)
 * for agencies / local / service businesses (§3.2).
 */
export function generateOrganizationJsonLd(opts = {}) {
  const siteUrl = getSiteUrl();
  const type = opts.localBusiness
    ? ["Organization", opts.localBusinessType || "LocalBusiness"]
    : "Organization";
  return cleanJsonLd({
    "@type": type,
    "@id": orgId(),
    name: opts.name || SITE_NAME,
    url: siteUrl,
    logo: { "@type": "ImageObject", url: absoluteUrl(opts.logo || DEFAULT_OG_IMAGE) },
    description: opts.description || DEFAULT_DESCRIPTION,
    ...(opts.foundingDate ? { foundingDate: opts.foundingDate } : {}),
    ...(opts.email ? { email: opts.email } : {}),
    ...(opts.address ? { address: { "@type": "PostalAddress", ...opts.address } } : {}),
    ...(opts.localBusiness ? { areaServed: opts.areaServed || "Worldwide" } : {}),
    sameAs: SAME_AS.length ? SAME_AS : undefined,
  });
}

export function generateWebSiteJsonLd({ searchUrlTemplate } = {}) {
  const siteUrl = getSiteUrl();
  return cleanJsonLd({
    "@type": "WebSite",
    "@id": siteId(),
    url: siteUrl,
    name: SITE_NAME,
    inLanguage: "en",
    publisher: { "@id": orgId() },
    ...(searchUrlTemplate
      ? {
          potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: searchUrlTemplate },
            "query-input": "required name=search_term_string",
          },
        }
      : {}),
  });
}

export function generateBreadcrumbJsonLd(items) {
  if (!items?.length) return undefined;
  return cleanJsonLd({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: canonicalUrl(item.path) } : {}),
    })),
  });
}

export function generateFaqJsonLd(faqs) {
  if (!faqs?.length) return undefined;
  return cleanJsonLd({
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  });
}

export function generateHowToJsonLd({ name, description, steps }) {
  if (!steps?.length) return undefined;
  return cleanJsonLd({
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
  });
}

export function generateArticleJsonLd(article, type = "Article") {
  return cleanJsonLd({
    "@type": type,
    headline: article.title,
    description: article.description?.slice(0, 500),
    image: article.imageUrl ? [absoluteUrl(article.imageUrl)] : undefined,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: { "@type": "Person", name: article.authorName || SITE_NAME },
    publisher: { "@id": orgId() },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl(article.path) },
    url: canonicalUrl(article.path),
  });
}

// ──────────────────────────────────────────────
//  Graph builder + serialization hygiene  (§3.4, §3.5)
// ──────────────────────────────────────────────

/**
 * Compose nodes into a single @graph, dropping empties. Render the result once
 * per page in a <script type="application/ld+json">. Nodes reference each other
 * by @id (e.g. publisher → #organization) instead of repeating the full entity.
 */
export function buildGraph(...nodes) {
  const graph = nodes.flat().filter(Boolean);
  return cleanJsonLd({ "@context": "https://schema.org", "@graph": graph });
}

/** Recursively strip undefined / empty values so the output is valid JSON-LD (§3.5). */
export function cleanJsonLd(obj) {
  if (Array.isArray(obj)) {
    const arr = obj.map(cleanJsonLd).filter((v) => v !== undefined);
    return arr.length ? arr : undefined;
  }
  if (obj && typeof obj === "object") {
    const cleaned = {};
    for (const [k, v] of Object.entries(obj)) {
      const cv = cleanJsonLd(v);
      if (cv !== undefined) cleaned[k] = cv;
    }
    return Object.keys(cleaned).length ? cleaned : undefined;
  }
  return obj === null || obj === "" ? undefined : obj;
}
