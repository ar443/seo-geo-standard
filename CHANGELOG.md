# Changelog

All notable changes to the SEO + GEO Standard are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the standard adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-06-30

Practices surfaced while auditing a fourth (Next.js) production implementation against
the standard, folded back in. Backward-compatible — no existing rule changed meaning.

### Added

- **§1.2** — `site_url`/origin **MUST be environment-derived** so canonical, OG, and
  JSON-LD URLs resolve in preview/staging/prod (never hardcode the production origin).
- **Rule 2.14** — environment-resolvable absolute URLs (per-page assertion of §1.2).
- **§3.2** — `LocalBusiness` / `ProfessionalService` schema row for agencies, local, and
  service businesses.
- **Rule 3.4** — node identity & graph linking: stable `@id` + reference shared entities
  by `@id` in a single `@graph` (the concrete technique behind §1.1's "one source per type").
- **Rule 3.5** — serialization hygiene: strip `undefined`/empty keys before serializing JSON-LD.
- **Rule 2.3** — clarified to require a single canonical *path form* (trailing-slash + case),
  matched by internal links and the sitemap.
- Three anti-patterns (§10): hardcoded prod origin, repeated-entity schema, dirty JSON-LD.
- **Next.js adapter** (`adapters/nextjs/`) — a framework-specific reference implementation of
  the central SEO service (App Router Metadata API + JSON-LD helpers).
- **Derivation report** — addendum documenting the fourth-project audit behind these additions.

### Changed

- **Claude Code adapter** (`adapters/claude-code/SKILL.md`) kept in parity with the above.

## [1.0.0] - 2026-06-23

First public release.

### Added

- **The standard** (`standard/SEO-GEO-STANDARD.md`) — a framework-agnostic SEO + GEO
  specification with numbered rules (§1–§10), `MUST`/`SHOULD`/`MAY` conformance
  keywords, explicit thresholds, a six-phase operating procedure, an evidence-based
  verification gate, per-page-type acceptance criteria, and an anti-pattern list.
- **Claude Code adapter** (`adapters/claude-code/SKILL.md`) — an auto-invoking skill
  that packages the standard for Claude Code.
- **Derivation report** (`reference/SEO-GEO-REPORT.md`) — the static audit of three
  production codebases, scorecards, and the evidence behind each rule.
- **Worked example** (`examples/audit-output.md`) — a sample agent audit, prioritized
  fix plan, and verification gate.
- Project documentation: `README.md`, `CONTRIBUTING.md`, `CITATION.cff`, `LICENSE` (MIT).

[1.1.0]: https://github.com/ar443/seo-geo-standard/releases/tag/v1.1.0
[1.0.0]: https://github.com/ar443/seo-geo-standard/releases/tag/v1.0.0
