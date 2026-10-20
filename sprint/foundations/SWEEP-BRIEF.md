# Final sweep brief (2026-10-20)

An independent audit of 80 random essentials Cards (sprint/foundations/audit-*.md)
found: give-aways still in ~12 % of Cards (answer reachable from a function or
method name, an `#include`, elimination among chips, or a front that states the
property asked); some traces still over the §3.1 budget; DS&A Cards requiring C++
hands-on Cards (pulling 25–40 C++ Cards upstream); untaught machinery in some code
and parsons Cards; compound capstone rubric items; grader/verification boilerplate
on backs.

Read from disk: CLAUDE.md, PEDAGOGY.md (all of it; note the new §3 "lowest rung"
sentence), docs/FORMAT.md, and your agent definition.

For EVERY Card in your topic dirs (not only sampled ones):
1. **Give-away test** (§2 rule 5): answer the front using the requires closure but
   *without the Card's target idea*. If you can (identifier/function/method name,
   `#include`, comment, chips eliminable by prerequisites, a front stating the
   property, problem title), fix it: rename neutrally, drop the revealing include
   behind a neutral one or into the harness, replace eliminable chips with
   plausible misconceptions (incl. the most common wrong answer), reword the front.
2. **Traces** (§3.1): for each `trace`, list its state changes and the changing
   values held at once, explicitly, in your scratch notes. If > 8 changes or > 4
   values held, or more than one hidden run (e.g. a partition inside a select),
   shrink it or split it. Re-verify values by running.
3. **Lowest-rung requires** (§3): replace any `requires` that supplies only a term
   via a trace/code/parsons/chunk/explain Card with the lowest-rung `basic` that
   teaches the term. /workspace/sprint/foundations/coupling.tsv lists the 29
   interview-essentials Cards that directly require a hands-on cpp-essentials Card.
4. **Untaught machinery** in code/parsons/chunk snippets: every construct is taught
   by the closure or the snippet is simplified (prefer simplifying).
5. **Capstones**: each rubric item one claim, ≤ 20 words, tickable from speech.
6. **Backs**: remove grader/verification boilerplate beyond one short closing
   sentence naming the compiler (FORMAT's per-Kind guide); never explain how the
   app grades.
7. Apply every row in /workspace/sprint/foundations/audit-<deck>.md for Cards in
   your dirs (verify each first).

History: bump `version` only when a front or expected answer changes meaning. Never
rename or delete ids. Edit only Cards in your topic dirs. Don't commit. Another agent
works on other dirs concurrently.

Done means (from /workspace):
    tool/validate cpp-essentials interview-essentials cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode
    scripts/check-code cpp-essentials interview-essentials
    scripts/check-code cpp-essentials interview-essentials --remote --id <compile-graded Cards you changed>
    scripts/lint-shape cpp-essentials interview-essentials
Return ≤ 120 words: counts per item 1–7, version bumps, anything unresolved.
