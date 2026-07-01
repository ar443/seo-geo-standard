# How to use the SEO + GEO Standard with any AI agent

This standard is a **public set of rules any AI agent can adopt as its own guardrails**.
You don't install anything. You point an agent at the rules — by pasting a link or dropping
the file in your repo — and from then on the agent audits, builds, and fixes SEO + GEO
*within those boundaries*, on any stack.

- **Public link:** <https://github.com/greelogix/seo-geo-standard>
- **The rules (one file):** <https://github.com/greelogix/seo-geo-standard/blob/main/standard/SEO-GEO-STANDARD.md>
- **Raw (for agents that fetch URLs):** <https://raw.githubusercontent.com/greelogix/seo-geo-standard/main/standard/SEO-GEO-STANDARD.md>

Use it **at the start of a project**, **mid-project**, or as a **permanent guardrail** the
agent checks every time it builds or fixes something. Pick your scenario below and copy the prompt.

---

## The 30-second version

1. Copy one of the prompts below.
2. Paste it into your AI agent (ChatGPT, Claude, Claude Code, Cursor, Copilot, Perplexity…).
3. The agent reads the rules and works inside them — no more vague "improve my SEO".

That's the whole idea: **one link → consistent, verifiable SEO + GEO rules for any agent.**

---

## Scenario 1 — Paste the link (web agents, no repo access)

Best for ChatGPT, Claude.ai, Perplexity, or any chat agent that can browse. It reads the
public rules and applies them to whatever you describe.

```text
Read the SEO + GEO Standard here:
https://github.com/greelogix/seo-geo-standard/blob/main/standard/SEO-GEO-STANDARD.md

Adopt every rule (§1–§10) as hard requirements. Then ask me for my site URL and
framework, and produce: (1) an audit with a pass / partial / fail verdict per rule,
and (2) a prioritized P0→P2 fix plan. Do not give generic advice — cite rule IDs.
```

---

## Scenario 2 — Start of a project (greenfield, agent works in your repo)

Best for Claude Code, Cursor, or Copilot on a new codebase. The rules become the default
guardrails as the agent scaffolds pages, metadata, and schema.

```text
We follow the SEO + GEO Standard:
https://raw.githubusercontent.com/greelogix/seo-geo-standard/main/standard/SEO-GEO-STANDARD.md

Fetch and read it first. Treat its rules (§1–§10) as guardrails for everything you build
in this repo. As you scaffold pages, metadata, canonical URLs, and JSON-LD, conform to the
standard by default — one source of truth, server-rendered SEO, schema per page type.
Before finishing any task, self-check against §8 (verification gate).
```

---

## Scenario 3 — Mid-project (audit and fix an existing codebase)

Best when the project already exists and you want it brought up to standard. This runs the
standard's own six-phase operating procedure (§0).

```text
Fetch and read the SEO + GEO Standard:
https://raw.githubusercontent.com/greelogix/seo-geo-standard/main/standard/SEO-GEO-STANDARD.md

Follow its §0 operating procedure on THIS codebase:
1. Discover — detect the stack and where head/metadata, routing, sitemap, robots, schema live.
2. Audit — score §1–§7; produce a gap list (rule ID → pass / partial / fail).
3. Prioritize — P0 technical → P1 on-page + schema + content → P2 GEO depth.
4. Implement — fix using our existing patterns; never duplicate tags or schema.
5. Verify — run the §8 gate; show evidence.
6. Report — what changed, what's manual/off-site, what needs a live run.

Do not claim done until the verification gate passes with evidence.
```

---

## Scenario 4 — Permanent guardrail (every build and fix stays in-bounds)

This is the "boundaries" setup: put a short rule in your agent's always-on config so **every**
future task automatically respects the standard, without re-pasting a prompt.

Add this to your project's agent-rules file — `CLAUDE.md` (Claude Code), `.cursorrules`
(Cursor), or `.github/copilot-instructions.md` (Copilot):

```text
## SEO / GEO rules
Follow the SEO + GEO Standard: https://github.com/greelogix/seo-geo-standard
Any new page or fix MUST conform to: §1 one source of truth + server-rendered SEO,
§2 on-page (title/meta/canonical/one H1/OG/Twitter/alt), §3 JSON-LD per page type,
§4 sitemap↔robots agreement + AI-crawler allow rules, §6 GEO (answer-first, question-shaped).
Never: SEO via client-JS only, duplicate schema/canonical, fake ratings, blocking AI crawlers.
Self-check against §8 (verification gate) before marking any SEO-touching work complete.
```

**Claude Code users — even simpler:** install the packaged skill so it auto-invokes on any
SEO/GEO task. Copy [`adapters/claude-code/SKILL.md`](adapters/claude-code/SKILL.md) to
`<your-project>/.claude/skills/seo-geo/SKILL.md`. From then on the agent applies the rules
automatically whenever it touches metadata, schema, sitemaps, or content.

---

## Working on a specific stack?

The standard is framework-agnostic (it states *what* + a *threshold*, never *how*). If you're
on **Next.js (App Router)**, there's a ready reference implementation of the architecture —
copy it in and the agent has working helpers to conform to §1–§3:
[`adapters/nextjs/`](adapters/nextjs/).

---

## What the agent will actually do

No matter the scenario, a well-directed agent will:

1. **Discover** your stack and where SEO is generated.
2. **Audit** every rule with a clear pass / partial / fail verdict (not opinions — rule IDs).
3. **Prioritize** fixes P0 (technical) → P1 (on-page + schema + content) → P2 (GEO depth).
4. **Implement** inside your existing patterns, with one source of truth.
5. **Verify** with evidence — tests, server-HTML `curl`, Rich Results Test, Lighthouse.
6. **Report** what changed and what still needs a live run or off-site work.

The one non-negotiable: **SEO-critical tags (title, meta, canonical, OG/Twitter, JSON-LD) must
be in the first server HTML response** — never injected only by client-side JavaScript.

---

## Confirming it worked

Ask the agent to show evidence from the §8 gate, or check yourself:

```bash
# SEO tags present in server HTML (JS disabled)?
curl -sL https://your-site.com/ | grep -E '<title>|name="description"|rel="canonical"|og:image|application/ld\+json'
```

Plus: [Rich Results Test](https://search.google.com/test/rich-results) passes per page type,
Lighthouse SEO ≥ 95, and sitemap ↔ robots agree.

---

## Suggested how-to video walkthrough

A clean 3–4 minute structure for a team video:

1. **The problem (20s)** — "improve my SEO" gives inconsistent, unverified results.
2. **The idea (20s)** — one public link = a fixed rulebook any agent obeys. Show the repo.
3. **Demo A — mid-project (90s)** — paste the Scenario 3 prompt into Claude Code/Cursor on a
   real repo; show the audit gap list and a couple of fixes landing.
4. **Demo B — guardrail (40s)** — paste the Scenario 4 block into `CLAUDE.md`; ask for a new
   page; show it comes out standard-compliant with no extra prompting.
5. **Proof (30s)** — run the `curl` check and Rich Results Test; show green.
6. **Close (10s)** — the link again; "paste it, and every agent stays in-bounds."
