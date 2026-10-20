# Addendum for the paused Decks (2026-10-20)

Follow sprint/traces/BRIEF.md, with these updates (PEDAGOGY.md was revised after
that brief; it wins on any difference — reread §3 and §3.1 now):

- **Budget** (§3.1): one run; ≤ 5 input elements; ≤ 4 loop iterations; ≤ 8 state
  changes; ≤ 4 *changing* values held at once (input shown and never written
  doesn't count); ≤ 3 probes at decision points (a branch, or where state changes
  hands), ≤ 2 values each (a probe of n numbers counts n); no `a[i++]`-style side
  effects or instrumentation; the back explains only this run. Count the state
  changes and values held explicitly in your scratch notes for every trace.
- **Worked example** (§3.1(a)): a `basic` tagged `worked-example` whose FRONT shows
  the tiny input and the full step table (≤ 5 rows, cells ≤ 6 words) and asks one
  self-explanation question about the deciding row; its back answers why (≤ 15 +
  40 words); no `elaborate`. The trace requires it plus the concept's
  deciding-property Card. This applies to any multi-step sequence, not only
  algorithms. Before writing one, check whether an essentials Deck already has a
  worked example for the same algorithm (grep `worked-example`): if so, require
  that instead of writing a duplicate (these Decks may require the essentials
  Decks; check the Deck's relations in its deck.yaml).
- **Give-aways** (§2 rule 5) and **elaborate** (§4) apply to every Card you touch.
- **Memory**: other agents run concurrently and the machine has OOM-killed agents
  before. Don't run `scripts/check-code` over all eight Decks; traces aren't
  compile-graded. If you convert a Card to a compile-graded kind (you shouldn't
  need to), check only that id: `scripts/check-code <deck> --id <id>`.
- **Never run git commands that write** (no commit, no add).

Done means `tool/validate cpp-essentials interview-essentials cpp-basics cpp-core
algo-basics algo-systems hft-interview leetcode` reports 0 errors, and
`scripts/lint-shape <your decks>` flags none of your Cards.
