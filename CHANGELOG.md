# Changelog

All notable changes to the SEO + GEO Standard are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the standard adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.0.0]: https://github.com/ar443/seo-geo-standard/releases/tag/v1.0.0
