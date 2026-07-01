# How to use the SEO + GEO Standard with any AI agent

This standard is a **public set of rules any AI agent can adopt as its own guardrails**.
You don't install anything. You point an agent at the rules — by pasting a link or dropping
the file in your repo — and from then on the agent audits, builds, and fixes SEO + GEO
*within those boundaries*, on any stack.

- **Public link:** <https://github.com/ar443/seo-geo-standard>
- **The rules (one file):** <https://github.com/ar443/seo-geo-standard/blob/main/standard/SEO-GEO-STANDARD.md>
- **Raw (for agents that fetch URLs):** <https://raw.githubusercontent.com/ar443/seo-geo-standard/main/standard/SEO-GEO-STANDARD.md>

Use it **at the start of a project**, **mid-project**, or as a **permanent guardrail** the
agent checks every time it builds or fixes something. Pick your scenario below and copy the prompt.

---

## The 30-second version

1. Copy one of the prompts below.
2. Paste it into your AI agent (ChatGPT, Claude, Claude Code, Cursor, Copilot, Perplexity…).
3. The agent reads the rules and works inside them — no more vague "improve my SEO".

That's the whole idea: **one link → consistent, verifiable SEO + GEO rules for any agent.**

---

## Web agents — paste the link (no repo access)

Best for ChatGPT, Claude.ai, Perplexity, or any chat agent that can browse. It reads the
public rules and applies them to whatever you describe.

```text
Read the SEO + GEO Standard here:
https://github.com/ar443/seo-geo-standard/blob/main/standard/SEO-GEO-STANDARD.md

Adopt every rule (§1–§10) as hard requirements. Then ask me for my site URL and
framework, and produce: (1) an audit with a pass / partial / fail verdict per rule,
and (2) a prioritized P0→P2 fix plan. Do not give generic advice — cite rule IDs.
```

---

## Coding agents — two flavors

For agents that work inside your repo (Claude Code, Cursor, Copilot), each scenario below
comes in two flavors:

- **Plain** — the agent reads the standard from the URL on that run.
- **Self-installing** — the agent fetches the standard once, saves it locally, and writes its
  own always-on rule file *before* building. After the first run the rules apply automatically
  to every future edit, with no reminder.

Each flavor has a **General** version (any agent) and a **Cursor** version (Agent/Composer mode).
The stack is shown as `[Next.js 15 App Router, TypeScript, Tailwind]` — swap it for yours.

> Cursor tip: `@Web` fetching isn't always enabled. Every Cursor prompt has a built-in
> fallback ("if you can't fetch it, I'll paste it"), and the self-installing ones save the
> standard into the repo so the rest of the work never depends on a live fetch.

---

## Scenario A — Start of a project (empty folder / greenfield)

### Plain — General

```text
You're setting up a brand-new project in this empty folder.
Stack: [Next.js 15 App Router, TypeScript, Tailwind].

Before writing any code, fetch and read the SEO + GEO Standard:
https://raw.githubusercontent.com/ar443/seo-geo-standard/main/standard/SEO-GEO-STANDARD.md

Treat every rule (§1–§10) as a hard requirement. Then:
1. Ask me for the site name and domain.
2. Scaffold the project for the stack above.
3. Build the SEO foundation to the standard from the start: one central SEO config +
   composer (§1), server-rendered title/meta/canonical/OG/Twitter (§2), JSON-LD per
   page type (§3), and sitemap.xml + robots.txt that agree and allow AI crawlers (§4).
4. Add a home page and one content page that follow §6 GEO (answer-first 40–60 word
   intro, question-shaped headings).
5. Self-check against §8 and show me the evidence.
```

### Plain — Cursor

```text
[Cursor Agent] New project in this empty folder.
Stack: [Next.js 15 App Router, TypeScript, Tailwind].

1. Fetch the SEO + GEO Standard with @Web and save it to docs/SEO-GEO-STANDARD.md:
   https://raw.githubusercontent.com/ar443/seo-geo-standard/main/standard/SEO-GEO-STANDARD.md
   (If you can't fetch it, tell me and I'll paste the contents.)
2. Create .cursor/rules/seo-geo.mdc that tells every future edit to follow
   docs/SEO-GEO-STANDARD.md.
3. Ask me for site name + domain, then scaffold the project.
4. Build the SEO foundation to the standard from the start — central SEO config +
   composer (§1), server-rendered meta/canonical/OG/Twitter (§2), JSON-LD per page
   type (§3), sitemap + robots that agree and allow AI crawlers (§4), plus a home +
   one content page following §6 (answer-first, question-shaped).
5. Run the §8 checks you can run locally and show evidence.
```

### Self-installing — General

```text
You're starting a new project in this empty folder.
Stack: [Next.js 15 App Router, TypeScript, Tailwind].

STEP 0 — Install the guardrail yourself, before anything else:
1. Fetch the SEO + GEO Standard and save the full text to docs/SEO-GEO-STANDARD.md:
   https://raw.githubusercontent.com/ar443/seo-geo-standard/main/standard/SEO-GEO-STANDARD.md
   (If you can't fetch it, tell me and I'll paste it.)
2. Create the persistent agent-rules file your environment uses — CLAUDE.md (Claude Code),
   AGENTS.md (generic), or .github/copilot-instructions.md (Copilot) — with a rule that says:
   "All web / page / metadata / schema work MUST follow docs/SEO-GEO-STANDARD.md (§1–§10);
   self-check §8 before marking anything done."

THEN build:
3. Ask me for site name + domain, scaffold the stack, and build the SEO foundation to the
   standard from the start — central config + composer (§1), server-rendered meta/canonical/
   OG/Twitter (§2), JSON-LD per page type (§3), sitemap + robots that agree and allow AI
   crawlers (§4), plus a home + one content page following §6 (answer-first, question-shaped).
4. Self-check against §8 and show evidence.

Treat the rules file you just created as binding for every future edit.
```

### Self-installing — Cursor

```text
[Cursor Agent] New project in this empty folder.
Stack: [Next.js 15 App Router, TypeScript, Tailwind].

STEP 0 — Set up your own guardrail first:
1. Fetch with @Web and save to docs/SEO-GEO-STANDARD.md:
   https://raw.githubusercontent.com/ar443/seo-geo-standard/main/standard/SEO-GEO-STANDARD.md
   (Can't fetch? Tell me, I'll paste it.)
2. Create .cursor/rules/seo-geo.mdc containing exactly:
   ---
   description: SEO + GEO standard — all web/page/metadata/schema work
   alwaysApply: true
   ---
   Follow docs/SEO-GEO-STANDARD.md (§1–§10) for every page, metadata, schema, sitemap, and
   content change. Server-render all SEO tags; one source of truth; JSON-LD per page type;
   sitemap↔robots agree + allow AI crawlers; §6 GEO answer-first + question-shaped.
   Never client-JS-only SEO, duplicate schema, or fake ratings. Self-check §8 before done.

THEN build:
3. Ask me for site name + domain, scaffold, and build the SEO foundation to the standard
   (§1 config+composer, §2 meta/canonical/OG, §3 JSON-LD, §4 sitemap+robots, §6 home +
   content page).
4. Run the §8 checks locally and show evidence.
```

---

## Scenario B — Mid-project (existing codebase)

### Plain — General

```text
Fetch and read the SEO + GEO Standard:
https://raw.githubusercontent.com/ar443/seo-geo-standard/main/standard/SEO-GEO-STANDARD.md

Run its §0 operating procedure on THIS existing codebase:
1. Discover — detect the stack and where head/metadata, routing, sitemap, robots,
   and schema live.
2. Audit — score §1–§7 into a gap list (rule ID → pass / partial / fail) plus a
   per-page-type coverage table.
3. Prioritize — P0 technical → P1 on-page + schema + content → P2 GEO depth.
Show me the audit and gap list BEFORE changing anything.

After I approve:
4. Implement P0 + P1 using our existing patterns — one source of truth, never
   duplicate tags or schema.
5. Verify against §8 and show evidence.
6. Report what changed and what still needs a live run or off-site work.
```

### Plain — Cursor

```text
[Cursor Agent] Fetch the SEO + GEO Standard with @Web (or I'll paste it):
https://raw.githubusercontent.com/ar443/seo-geo-standard/main/standard/SEO-GEO-STANDARD.md

Run its §0 procedure on THIS repo:
1. Discover — scan for where metadata, routing, sitemap, robots, and schema live.
2. Audit — gap list (rule ID → pass/partial/fail) + a per-page-type table.
3. Prioritize — P0 technical → P1 on-page + schema + content → P2 GEO.
Pause here and show me the audit before editing anything.

After I approve:
4. Implement P0 + P1 with our existing patterns (one source of truth, no duplicate schema).
5. Verify against §8 — show that server HTML has the tags and there's no duplicate JSON-LD.
6. Report what changed + what needs a live run.
```

### Self-installing — General

```text
STEP 0 — Install the guardrail before touching code:
1. Fetch and save the full standard to docs/SEO-GEO-STANDARD.md:
   https://raw.githubusercontent.com/ar443/seo-geo-standard/main/standard/SEO-GEO-STANDARD.md
   (If you can't fetch it, I'll paste it.)
2. Create the persistent rules file your environment uses — CLAUDE.md / AGENTS.md /
   .github/copilot-instructions.md — pointing all future web/metadata/schema work at
   docs/SEO-GEO-STANDARD.md, with "self-check §8 before done."

THEN run the §0 procedure on THIS codebase:
3. Discover the stack + where metadata/routing/sitemap/robots/schema live.
4. Audit §1–§7 → a gap list (rule ID → pass / partial / fail) + a per-page-type table.
   Show me this before editing anything.
After I approve:
5. Implement P0 + P1 with our existing patterns (one source of truth, no duplicate schema).
6. Verify §8 with evidence; report what changed + what needs a live run.
```

### Self-installing — Cursor

```text
[Cursor Agent] STEP 0 — Set up your guardrail first:
1. Fetch with @Web, save to docs/SEO-GEO-STANDARD.md:
   https://raw.githubusercontent.com/ar443/seo-geo-standard/main/standard/SEO-GEO-STANDARD.md
   (Can't fetch? I'll paste it.)
2. Create .cursor/rules/seo-geo.mdc (alwaysApply: true) that points every future edit at
   docs/SEO-GEO-STANDARD.md — server-rendered SEO, one source of truth, JSON-LD per page
   type, sitemap↔robots agree + allow AI crawlers, §6 GEO; never client-JS-only / duplicate /
   fake ratings; self-check §8 before done.

THEN run §0 on THIS repo:
3. Discover → 4. Audit (gap list + per-page-type table). Pause and show me before editing.
After approval:
5. Implement P0 + P1 (existing patterns, no duplicate schema).
6. Verify §8 with evidence + report.
```

---

## Permanent guardrail (add it by hand)

The self-installing prompts above create this for you. To set it up manually instead, drop
this into your agent's always-on config — `CLAUDE.md` (Claude Code), `.cursor/rules/seo-geo.mdc`
(Cursor), or `.github/copilot-instructions.md` (Copilot):

```text
## SEO / GEO rules
Follow the SEO + GEO Standard: https://github.com/ar443/seo-geo-standard
Any new page or fix MUST conform to: §1 one source of truth + server-rendered SEO,
§2 on-page (title/meta/canonical/one H1/OG/Twitter/alt), §3 JSON-LD per page type,
§4 sitemap↔robots agreement + AI-crawler allow rules, §6 GEO (answer-first, question-shaped).
Never: SEO via client-JS only, duplicate schema/canonical, fake ratings, blocking AI crawlers.
Self-check against §8 (verification gate) before marking any SEO-touching work complete.
```

**Claude Code users — even simpler:** install the packaged skill so it auto-invokes on any
SEO/GEO task. Copy [`adapters/claude-code/SKILL.md`](adapters/claude-code/SKILL.md) to
`<your-project>/.claude/skills/seo-geo/SKILL.md`.

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
