# Fix brief (2026-10-17)

Read /workspace/CLAUDE.md, /workspace/PEDAGOGY.md (incl. §2 rule 13), /workspace/docs/FORMAT.md,
and the review brief /workspace/sprint/review/BRIEF.md. Then apply the findings file you were given.

- Verify each finding before acting. If it's wrong, skip it and say why. If the
  suggested fix is poor, apply a better one that solves the stated problem.
- Fix all **wrong** and **confusing** findings. Fix **weak** findings when the fix is
  clearly better for a learner and stays within PEDAGOGY limits; skip pure taste.
- Leave the "Verified by … / compiled with GCC …" provenance lines alone: FORMAT.md's
  per-Kind guide documents them as this Deck's convention.
- Cards in `cpp-essentials` and `interview-essentials` have no review history: edit
  freely, no `version` bump, never rename ids. A Card in any other Deck has history:
  bump `version` only if its question changes meaning.
- New Cards are allowed when a finding asks for a missing prerequisite. Put them in
  the same Deck/topic, give them refs, and wire them with `requires`. Keep fan-in at
  ≤ 2 and the essentials Decks' max depth from growing (check with `scripts/graph
  cpp-essentials interview-essentials`; currently 11). A new Card in either essentials
  Deck may require only Cards in those two Decks (interview-essentials may require
  cpp-essentials, not the reverse).
- Trace values, numbers and code claims: verify by compiling/running in /tmp/<scope>/.
- Only touch Cards listed in your findings file (plus any new Cards and edges they
  need). Don't commit.

Done means, from /workspace:
    tool/validate cpp-essentials interview-essentials cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode   → 0 errors
    scripts/check-code cpp-essentials interview-essentials --id <compile-graded Cards you changed/added>   and the same with --remote   → 0 problems
    scripts/lint-shape cpp-essentials interview-essentials   → no flags on your Cards
Append to the findings file a section `## Applied` listing per Card: fixed / skipped (why).
Return one line: counts fixed / skipped / new Cards, and the validation tails.
