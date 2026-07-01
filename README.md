# SEO + GEO Standard

**Hand one file to any AI coding agent and it will audit, implement, and verify real SEO + GEO — server-rendered, schema-backed, and gated on evidence — on any stack.**

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Framework-agnostic](https://img.shields.io/badge/stack-framework--agnostic-orange.svg)](standard/SEO-GEO-STANDARD.md)
[![Works with](https://img.shields.io/badge/agents-Claude%20%C2%B7%20Cursor%20%C2%B7%20Copilot%20%C2%B7%20ChatGPT-8A2BE2.svg)](#quick-start)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**SEO + GEO Standard** is a framework-agnostic specification you hand to any AI coding agent — Claude, Cursor, Copilot, ChatGPT — to **audit, implement, and verify** both Search Engine Optimization and Generative Engine Optimization on any stack. Each rule states a *what* and a *threshold*; the agent decides the *how* for your framework. It was synthesized by auditing three production codebases and keeping the strongest, code-verified practice from each — so it encodes what actually shipped, not blog-post theory.

> [!IMPORTANT]
> **The whole idea, in two rules:**
> 1. **SEO-critical output** (title, meta, canonical, OG/Twitter, JSON-LD) should be in the **first HTML response from the server** — many AI crawlers and snapshot tools may not execute JavaScript reliably.
> 2. **GEO is not a wholly separate channel.** Google AI Overviews and much of AI search appear to draw on the **same index** as Search, so a strong SEO foundation is largely your GEO foundation too. Skip the `llms.txt` fads.

➡️ **[Jump to Quick start](#quick-start)** · 📜 **[Read the standard](standard/SEO-GEO-STANDARD.md)** · 🔍 **[See a sample audit](examples/audit-output.md)**

---

## What you'll get

Point an agent at your repo with this standard and you get, end to end:

- **A scored audit** — every rule marked `✅ pass` / `⚠️ partial` / `❌ fail`, plus a per-page-type coverage table.
- **A prioritized fix plan** — P0 technical foundation → P1 on-page + schema + content → P2 GEO depth.
- **Fixes in your stack's own patterns** — server-rendered metadata, canonicals, and JSON-LD, plus a sitemap/robots setup that allows AI crawlers, all from one source of truth.
- **Answer-shaped GEO content** — answer-first intros, question-shaped headings, FAQ/HowTo schema, and comparison pages.
- **Evidence, not assurances** — a verification gate backed by tests, a server-HTML check, Rich Results, and Lighthouse before anything is called done.

See a full worked example in [`examples/audit-output.md`](examples/audit-output.md).

## What is this?

A **standard**, not a library or a plugin. There is no framework to install and no code to import. You give the standard to an AI agent working in your repository, and the agent does the work — discover, audit, fix, verify — against fixed rules and thresholds.

**It is:**

- A portable, vendor-neutral specification with numbered rules (§1–§10), `MUST`/`SHOULD`/`MAY` conformance keywords, and explicit thresholds.
- An operating procedure an agent follows end-to-end.
- A verification gate that requires evidence before any work is called "done."

**It is not:**

- An npm/Composer package, a build step, or a runtime dependency.
- A Claude-only feature — the standard works with any capable agent; the Claude Code skill is just the first packaged adapter.
- A list of "AI hacks." It explicitly rejects low-ROI fads (`llms.txt`, "rewrite everything in AI language").

## Why it exists

Two failure modes are everywhere, and both are invisible until your traffic isn't:

1. **Client-only SEO.** Single-page apps inject meta tags and JSON-LD with JavaScript. Google may eventually render it, but many AI crawlers (GPTBot, ClaudeBot, PerplexityBot) and snapshot tools **may not run JS reliably**, so they can see an empty shell. The standard mandates server-rendered SEO as a golden invariant.
2. **GEO confusion.** Teams treat "Generative Engine Optimization" as a brand-new channel and chase fads. In practice, AI answers appear to draw largely on the **same crawl/index as Search**. The standard reframes GEO as SEO **plus** answer-shaped content and explicit AI-crawler access.

**The proof:** every rule was derived by statically auditing three real, shipping production codebases and keeping the strongest code-verified practice from each — including a real duplicate-schema bug and a real sitemap↔robots disagreement that the rules now prevent. See [`reference/SEO-GEO-REPORT.md`](reference/SEO-GEO-REPORT.md).

## Why not just ask ChatGPT?

Ad-hoc prompts like "improve my SEO" tend to produce generic, inconsistent advice that varies by session, model, and wording — and rarely gets verified. The standard adds the missing structure:

- **Fixed rules and thresholds** instead of whatever the model happens to recall that day.
- **A verification gate** — work isn't done until evidence passes, so unproven changes don't ship.
- **Reproducible across agents and projects** — the same bar whether you use Claude, Cursor, or ChatGPT.

You can still use ChatGPT — just hand it this standard so it has rules to follow.

## Who it's for

- **Developers using AI coding agents** — drop it in, tell your agent to audit, ship the fixes.
- **Engineering teams & tech leads** — one conformance bar for SEO/GEO across every repo and stack.
- **SEO / GEO practitioners** — a technical, verifiable standard your engineers' agents can actually execute.
- **Adapter authors** — bind the standard to a new agent and contribute it back.

## Quick start

### Claude Code

The flagship adapter is an auto-invoking skill.

1. Copy the skill into your project:
   ```
   adapters/claude-code/SKILL.md  →  <your-project>/.claude/skills/seo-geo/SKILL.md
   ```
2. Ask Claude:
   > "Audit this project for SEO and GEO."

The skill auto-invokes whenever you work on meta tags, sitemaps, robots, JSON-LD, Core Web Vitals, or "getting cited by ChatGPT/Perplexity/AI Overviews," then runs Discover → Audit → Implement → Verify.

### Cursor

The standard is self-contained — no adapter required.

1. Copy [`standard/SEO-GEO-STANDARD.md`](standard/SEO-GEO-STANDARD.md) into your repo (e.g. under `docs/`).
2. Add it as a project rule, or `@`-mention the file in chat.
3. Prompt:
   > "Audit and fix this project against this standard. Follow the §0 operating procedure and don't claim done until the §8 verification gate passes."

### Generic AI agent (ChatGPT, Copilot, your own)

1. Paste [`standard/SEO-GEO-STANDARD.md`](standard/SEO-GEO-STANDARD.md) into the agent's context — it's self-sufficient.
2. Instruct it:
   > "Follow §0 — discover, audit, prioritize, implement, verify, report. Treat `MUST` as required and the §8 gate as the definition of done."

Works with any model that can read your codebase.

### No agent (humans welcome)

Read [the standard](standard/SEO-GEO-STANDARD.md) directly, or work top-to-bottom through the acceptance criteria in §9 and the verification gate in §8.

## What's in the box

```
seo-geo-standard/
├── standard/
│   └── SEO-GEO-STANDARD.md      # THE spec — the canonical, citable standard
├── adapters/
│   ├── claude-code/
│   │   └── SKILL.md             # Claude Code skill (drop into .claude/skills/seo-geo/)
│   └── nextjs/
│       ├── seo.js               # Next.js App Router reference implementation (§1 architecture)
│       └── README.md            # how to wire it up + rule-coverage map
├── reference/
│   └── SEO-GEO-REPORT.md        # how the standard was derived (3-codebase audit + addendum)
├── examples/
│   └── audit-output.md          # what an agent's audit + fix plan looks like
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── CITATION.cff
└── LICENSE
```

## How it works

When handed the standard, an agent follows six phases, in order:

| Phase | What the agent does |
|---|---|
| **1. Discover** | Detect the stack; find where `<head>`/metadata, routing, sitemap, robots, schema, content, and images live. |
| **2. Audit** | Score every rule (§1–§7): `✅ pass` / `⚠️ partial` / `❌ fail`, plus a per-page-type coverage table. |
| **3. Prioritize** | P0 technical foundation → P1 on-page + schema + content → P2 GEO depth + comparison pages. |
| **4. Implement** | Apply fixes using the stack's existing patterns and **one source of truth** — never duplicate tags or schema. |
| **5. Verify** | Run the §8 gate. Show evidence (tests, `curl` of server HTML, Rich Results, Lighthouse) before claiming done. |
| **6. Report** | Summarize what changed, what's manual/off-site, and what needs a live run (CWV, Search Console, backlinks). |

## The standard at a glance

| § | Section | Covers |
|---|---|---|
| [1](standard/SEO-GEO-STANDARD.md#1-architecture-rules) | Architecture | One source of truth · central config · per-page composer · server-side rendering |
| [2](standard/SEO-GEO-STANDARD.md#2-on-page-seo-per-page) | On-page SEO | Title, meta, canonical, one `<h1>`, OG/Twitter, alt text, internal links |
| [3](standard/SEO-GEO-STANDARD.md#3-structured-data-json-ld) | Structured data | Server-rendered JSON-LD, schema-by-page-type matrix, validity |
| [4](standard/SEO-GEO-STANDARD.md#4-technical-seo--crawlability) | Technical / crawlability | Sitemap ↔ robots agreement, AI-crawler allow rules, status codes |
| [5](standard/SEO-GEO-STANDARD.md#5-performance--core-web-vitals-verify-on-a-live-build) | Performance / CWV | LCP / INP / CLS thresholds, image formats, resource hints |
| [6](standard/SEO-GEO-STANDARD.md#6-geo--generative-engine-optimization) | GEO | Answer-first blocks, question-shaped structure, entity clarity, comparison pages |
| [7](standard/SEO-GEO-STANDARD.md#7-content-quality) | Content quality | One page per intent, unique depth, intent match, E-E-A-T |
| [8](standard/SEO-GEO-STANDARD.md#8-verification-gate-evidence-before-done) | Verification gate | Automated + manual evidence required before "done" |
| [9](standard/SEO-GEO-STANDARD.md#9-acceptance-criteria-per-page-type-quick-reference) | Acceptance criteria | Per-page-type MUST-haves |
| [10](standard/SEO-GEO-STANDARD.md#10-anti-patterns-never-do) | Anti-patterns | What never to do |

## Adapters

| Agent | Status | How to use |
|---|---|---|
| **Claude Code** | ✅ Packaged skill | [`adapters/claude-code/SKILL.md`](adapters/claude-code/SKILL.md) |
| **Cursor** | ➡️ Use the standard directly | [Quick start](#cursor) |
| **GitHub Copilot** | ➡️ Use the standard directly | [Quick start](#generic-ai-agent-chatgpt-copilot-your-own) |
| **ChatGPT / generic** | ➡️ Use the standard directly | [Quick start](#generic-ai-agent-chatgpt-copilot-your-own) |

**Stack reference implementations** (the *how* for a specific framework — copy into your project):

| Stack | Status | Where |
|---|---|---|
| **Next.js (App Router)** | ✅ Reference `seo.js` | [`adapters/nextjs/`](adapters/nextjs/) |

Want a packaged adapter for another agent or stack? See [CONTRIBUTING.md](CONTRIBUTING.md) — adapters are the most welcome contribution.

## What an audit looks like

A worked, end-to-end example — gap list with rule IDs, per-page-type coverage, a prioritized P0/P1/P2 fix plan, and a before/after verification gate — lives in [`examples/audit-output.md`](examples/audit-output.md).

## FAQ

**Is GEO different from SEO?**
Not as a separate channel. AI Overviews and much of AI search appear to draw on the same index as classic Search. GEO is SEO **plus** answer-shaped content (answer-first blocks, FAQ/HowTo schema, comparison pages) and explicit AI-crawler access. A weak SEO foundation is unlikely to be patched with "AI" tactics alone.

**Should I add an `llms.txt`?**
Not as a priority. The standard treats `llms.txt` and "rewrite everything in AI language" as low/zero ROI. Build the server-rendered, schema-backed, answer-shaped foundation first.

**Does it work on my stack?**
Yes — it's framework-agnostic by design. Rules state *what* and a *threshold*, never *how*. It's been applied across Next.js, Laravel + Inertia, Astro, Rails, and plain HTML.

**Is this Claude-only?**
No. The standard is a plain Markdown file any agent can read. Claude Code just gets a pre-packaged auto-invoking skill; everyone else pastes the standard into context.

## Roadmap

- Packaged adapters for Cursor and GitHub Copilot.
- A `conformance/` checklist and (eventually) an automated conformance checker.
- Worked examples per stack.

Roadmap items are tracked as issues — contributions welcome.

## Contributing

Rule-change proposals, new adapters, errata, and examples are all welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) first — the standard must stay framework-agnostic, and every rule change must preserve the `WHAT` + `THRESHOLD` form.

## Versioning

The standard follows [Semantic Versioning](https://semver.org/). Changes are recorded in [CHANGELOG.md](CHANGELOG.md). The current version is **1.1.0**.

## License

Released under the [MIT License](LICENSE) — use, adapt, and embed it freely, including in commercial projects. Attribution is appreciated; see below.

## Citation

If this standard helped your work, please cite it — see [CITATION.cff](CITATION.cff) or use GitHub's “Cite this repository” button.

## Credits

Synthesized from a static audit of three production codebases. The full derivation, scorecards, and evidence are in [`reference/SEO-GEO-REPORT.md`](reference/SEO-GEO-REPORT.md).
