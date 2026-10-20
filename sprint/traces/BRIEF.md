# Trace rebuild brief (2026-10-19)

The learner reports trace Cards take far too long: some ask for several full runs
of an algorithm (e.g. three insertion sorts on 5–6 elements with a comparison
counter), which overloads working memory, so the hours go into bookkeeping, not
learning. PEDAGOGY.md now has a budget for this: **read §3 including the new
§3.1 "Working-memory budget" and the "Novice-complete" rule first**, plus §2,
docs/FORMAT.md (§4.9 trace) and CLAUDE.md.

For EVERY `trace` Card in your scope (`grep -rl "^kind: trace" <dirs>`):

1. Measure it against §3.1: number of runs, input size, loop iterations,
   state changes the learner must track, probes and values per probe,
   extraneous machinery (counters, comma operators, instrumentation), and an
   honest time estimate for a learner who knows the concept but is rebuilding.
2. Decide one of:
   - **OK**: already within budget. Leave it.
   - **SHRINK**: keep the lesson, cut to one run / smaller input / fewer probes /
     plain code. Keep the probe that sits at the most instructive decision point.
   - **CONVERT**: the lesson is a count, bound or rule. Make it a `basic` or
     `cloze` that asks for the reasoning (a 2–3 element example is fine), and
     change `kind` accordingly.
   - **WORKED FIRST**: an algorithm trace with no fully worked example before
     it. Add a new `basic` Card (id `<trace-id>-worked` or similar) whose front
     names the algorithm and a tiny input (different from the trace's) and
     whose back is a short annotated step table, ≤ 6 rows. Wire the trace to
     `require` it, and give the worked Card the trace's concept prerequisites.
     Combine with SHRINK when needed.
   If one Card holds several runs that each teach something, keep the most
   instructive run on this Card and make the others separate small Cards only
   if they teach a different point. Otherwise drop them.
3. Verify every expected value by compiling and running the snippet locally
   (g++ -std=c++23) in /tmp/<scope>/. The loader checks that the `// @N` markers
   and `probes` keys match.

History: every Deck now has review history (the learner has studied since
2026-10-17). Bump `version` (+1) on any Card whose question or expected answer
changed (SHRINK, CONVERT, a changed probe); the learner agreed to the reset.
Wording-only edits keep the version. Never rename or delete ids. New Card ids
must be unique in the Deck ([a-z0-9-]+, grep first). New Cards: refs, level,
tags as siblings, and only `requires` that their Deck's relations allow (an
essentials Deck may require only the two essentials Decks; interview-essentials
may require cpp-essentials, not the reverse).

Don't touch non-trace Cards except to add a `requires` edge to a new worked Card.
Don't commit.

Record every Card's decision in your file, sprint/traces/<scope>.md, one line each:
`<id> | OK/SHRINK/CONVERT/WORKED FIRST | before → after (≤ 20 words)`.

Done means, from /workspace:
    tool/validate cpp-essentials interview-essentials cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode   → 0 errors
    scripts/check-code <your decks> --id <compile-graded Cards you touched, if any>   (+ --remote)   → 0 problems
    scripts/lint-shape <your decks>   → no flags on your Cards
Return one line: counts per decision, new Cards, and the validation tails.
