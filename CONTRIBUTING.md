# Contributing to the SEO + GEO Standard

Thanks for helping improve the standard. This is a **specification** repository, so
contributions are held to a slightly different bar than a typical code project — the
goal is a stable, trustworthy, framework-agnostic standard that any AI agent can follow.

## Ways to contribute

| Type | What it is | Where it goes |
|---|---|---|
| **Rule change** | Add, clarify, tighten, or deprecate a rule or threshold | `standard/SEO-GEO-STANDARD.md` |
| **New adapter** | Package the standard for another agent (Cursor, Copilot, …) | `adapters/<agent>/` |
| **Erratum** | Fix a typo, broken link, or factual error | anywhere |
| **Example** | A worked audit or stack-specific walkthrough | `examples/` |

Adapters and examples are the **most welcome** contributions.

## Ground rules for the standard

The standard lives or dies on its discipline. Any change to `standard/SEO-GEO-STANDARD.md`
must respect these invariants:

1. **Stay framework-agnostic.** Every rule states a **WHAT** and a **THRESHOLD**, never a
   *HOW*. Stack-specific implementation details belong in a project, not in the standard.
2. **Keep conformance keywords precise.** Use `MUST` (required), `SHOULD` (strongly
   recommended), `MAY` (optional) exactly as defined. Don't soften a `MUST` or inflate a `MAY`.
3. **Preserve stable rule IDs.** People cite rules as "§3.2" or "rule 4.4." Don't renumber
   existing rules. Add new ones at the end of their section; deprecate rather than delete.
4. **Justify with evidence.** Prefer changes backed by an observable signal (a real bug, a
   crawler behavior, a measurable threshold) over opinion. Reference the
   [derivation report](reference/SEO-GEO-REPORT.md) style.
5. **No fads without ROI.** The standard deliberately rejects low/zero-ROI tactics
   (e.g. `llms.txt`, "AI-language rewrites"). New tactics need a clear, defensible case.

## Proposing a rule change

1. **Open an issue first** describing the rule, the problem, and the evidence. This avoids
   wasted PRs on changes that affect conformance.
2. Once there's agreement, open a PR that:
   - Edits the rule in `standard/SEO-GEO-STANDARD.md`.
   - Keeps the `WHAT` + `THRESHOLD` form and stable IDs.
   - Updates `CHANGELOG.md` under a new unreleased entry.
   - Updates affected adapters (at minimum, `adapters/claude-code/SKILL.md`) so they stay
     in sync with the standard.

## Adding an adapter

An adapter binds the standard to one agent without changing the rules.

1. Create `adapters/<agent>/` with the agent's native artifact (e.g. a skill file, a rules
   file, an instructions file).
2. The adapter must **faithfully reflect** the current standard — same operating procedure,
   same golden invariant, same verification gate. Don't introduce new rules in an adapter.
3. Add a row to the **Adapters** table in `README.md`.
4. Note the adapter in `CHANGELOG.md`.

## Versioning

The standard follows [Semantic Versioning](https://semver.org/):

- **MAJOR** — a breaking change to conformance (a new `MUST`, a removed/renumbered rule, a
  tightened threshold that previously-conformant projects would now fail).
- **MINOR** — a backward-compatible addition (a new `SHOULD`/`MAY`, a new optional rule, a
  new adapter or example).
- **PATCH** — clarifications, typos, link fixes, formatting — no change to conformance.

Record every change in `CHANGELOG.md`.

## Pull request checklist

- [ ] Change keeps the standard framework-agnostic (no stack-specific *HOW*).
- [ ] Conformance keywords (`MUST`/`SHOULD`/`MAY`) used correctly.
- [ ] Existing rule IDs unchanged; new rules appended.
- [ ] Internal links still resolve.
- [ ] `CHANGELOG.md` updated.
- [ ] Affected adapters updated to match.

## Code of conduct

Be respectful and constructive. Assume good faith, critique the rule and not the person,
and back claims with evidence.
