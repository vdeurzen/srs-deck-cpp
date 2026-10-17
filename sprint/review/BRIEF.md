# Quality review brief (2026-10-17)

The learner is in a 2-week interview sprint on `cpp-essentials` and
`interview-essentials` (see sprint/README.md). Every other Deck is paused, so a
Card may lean only on Cards in these two Decks. Goal: every Card meets the
highest learning quality — correct, unambiguous, answerable in ~15 s (except
hands-on/explain), self-contained, and worth an interview candidate's time.

Read /workspace/PEDAGOGY.md (all of it, including the new §2 rule 13
"Self-contained"), /workspace/docs/FORMAT.md (Kinds), and CLAUDE.md.

Check EVERY Card in your scope, as a learner who has met only the Cards its
`requires` chain reaches. For each Card look for:

1. **Wrong**: a factual error, an outdated claim, a trace value that is wrong
   (verify trace values and any numbers by compiling and running code with
   local g++ -std=c++23 in a scratch dir under /tmp/<your-scope-name>/), a code
   Card whose reference answer would not be the only right answer, a distractor
   that is also correct.
2. **Ambiguous**: a front with more than one defensible answer, missing
   context ("in C++23", "for std::vector"), a blank whose answer could be
   several tokens.
3. **Leaks**: the answer visible in the front, a hint, another blank, the id
   wording, blank length, or a unique surface cue; chips where only one choice
   is grammatical.
4. **Not self-contained**: undefined terms or names, references to another
   Card, a problem number, or an example that lives elsewhere.
5. **Shape**: more than one idea, answer longer than PEDAGOGY §2 allows,
   explain rubric not exactly 5 distinct checkable items, parsons lines with
   no single right place, chunk too long to read in its expose_ms.
6. **Weak teaching**: no concrete example, no "what goes wrong without it",
   a trivia/lookup fact, near-duplicate of another sprint Card (name it),
   misconception Card without an elaborate prompt, missing refs.

Severity: **wrong** (teaches something false or grades a right answer wrong),
**confusing** (a learner would stall or argue), **weak** (works, but could
teach better). Don't report style nits.

Write your findings to the file you were given (sprint/review/<name>.md, via
Bash heredoc; it is the only file you may write in /workspace) as:

    ## <card id>  (<path>)
    - **<severity>**: <problem, ≤ 40 words>. **Fix:** <concrete fix: the new
      wording, the right value, the replacement distractor>.

Order by severity (wrong first). End the file with a line
`Reviewed N cards: W wrong, C confusing, K weak; OK: M.`
Return only that line and the 3 most serious findings in one sentence each.
