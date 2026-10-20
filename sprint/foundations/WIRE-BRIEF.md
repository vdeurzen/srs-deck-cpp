# Wiring brief (2026-10-19)

The foundation layer is in place: Cards moved in (sprint/foundations/plan/move-in.tsv),
advanced Cards moved out (plan/move-out.tsv), 54 new foundation Cards written
(plan/new-cards.tsv; a few writers adjusted requires — read the actual files).
Now every remaining essentials Card must lean only on what is taught before it.

Read first (from disk; a copy of CLAUDE.md in your context may be stale):
CLAUDE.md, docs/FORMAT.md, PEDAGOGY.md (all of it: it was revised today — §0
ladder and baseline, §2 rules 1/2/5/13/14, §3 Novice-complete and fan-in, §3.1,
§4 table, elaborate, misconception, time budgets), and your own agent definition.

Your scope is one edits file, plan/edits/<batch>.md, limited to the topic dirs you
were given. For every Card in that file and scope:

1. Apply its edits: `add requires` (verify each target exists and is the direct
   prerequisite that teaches the term; prefer the single foundation Card; respect
   §3 fan-in, transitive reduction and deck relations), `define` (one clause on
   the FRONT, at most one per Card, never the Card's target idea; if more than
   one term needs defining, require a foundation Card instead), `split / reshape`,
   `trace`.
2. Then re-read the Card as the learner meets it (its transitive closure only) and
   fix anything still out of order or leaking under the revised PEDAGOGY.

Also, for EVERY Card in your topic dirs (not only those in the edits file):
- `elaborate` present per PEDAGOGY §4 (all Cards except a `basic` with no
  `requires` and `worked-example` Cards), phrased to be said aloud.
- Worked-example Cards follow §3.1(a): the step table is on the FRONT with one
  self-explanation question about the deciding row; tag `worked-example`.
- Recognition Cards: no pattern or technique names in `tags` or in the front
  (§2 rules 5, 13).
- `explain` Cards: one concept or one problem; 5 items in the §4 talk order,
  each ≤ 20 words, tickable from speech; front doesn't list the topics. Split a
  multi-problem explain into single-problem Cards or a mixed-recognition series.
- Traces within §3.1 (≤ 4 changing values held at once, probes at decision
  points, no `a[i++]`-style side effects, no formula lesson on the back).
- Misconception Cards per §4 (specific result, ≥ 3 plausible outcomes, swap test).
- Depth-0 Cards use nothing beyond the §0 baseline.
- Leaf topics with ≥ 4 Cards and no §0 rung-6 capstone: LIST them in your
  report (topic path + which Cards a capstone would require); don't write them.

History: every Deck has review history. Bump `version` (+1) when a front or its
expected answer changes meaning (the learner accepts resets); wording-only and
`requires`/`elaborate`/tag edits keep the version. Never rename or delete ids.
Edit only Cards in your topic dirs (adding a `requires` line elsewhere is not
allowed — report it). Don't commit. Scratch: /tmp/<your batch>/.

Done means (from /workspace):
    tool/validate cpp-essentials interview-essentials cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode
    scripts/check-code cpp-essentials interview-essentials cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode
    scripts/check-code <decks> --remote --id <compile-graded Cards you changed>
    scripts/lint-shape cpp-essentials interview-essentials   (no flags on your Cards, or justified)
Another agent edits other topic dirs at the same time; if validate fails only on
their Cards, say so. Append `## Applied (<scope>)` to the edits file: per Card,
done / changed-from-plan (why) / skipped (why). Return ≤ 120 words: counts, version
bumps, capstones missing, anything unresolved.
