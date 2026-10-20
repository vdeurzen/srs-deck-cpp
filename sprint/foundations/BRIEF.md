# Novice audit brief (2026-10-19)

The learner is rebuilding C++ and DS&A foundations and reports that many Cards
"require a megatonne of background knowledge". Cause: the sprint curation cut
vocabulary and foundation Cards as "trivia", and the earlier review only checked
each Card against its own (already thin) `requires` chain. Only `cpp-essentials`
and `interview-essentials` are active; everything must be learnable from them.

Read /workspace/PEDAGOGY.md (§2, §3 incl. the new "Novice-complete" rule and
§3.1), docs/FORMAT.md (Kinds) and CLAUDE.md. READ-ONLY: write only your own
findings file.

Persona: a programmer who knows variables, loops, functions and arrays as ideas,
has written some code before (e.g. Go), but has forgotten or never solidly
learned C++ and CS fundamentals. They know nothing a Card's `requires` chain
(transitively, via `scripts/graph`-style closure) hasn't taught.

For EVERY Card in your scope:
1. List each term, symbol, notation, library name and language construct the
   Card uses (front, back, code) that the persona wouldn't know.
2. For each, check whether the Card defines it in one clause, or a Card in its
   transitive `requires` teaches it. (To compute the closure, parse front matter;
   scripts/cards.py has a Deck loader you can import from a script in /tmp.)
3. Each gap becomes one finding with the best remedy:
   - **REQUIRE <qualified id>**: a Card already in the essentials Decks teaches it.
   - **MOVE <qualified id>**: a Card in another Deck (cpp-basics, cpp-core,
     algo-basics, algo-systems, hft-interview, leetcode) teaches it at the right
     level. Prefer foundation/vocabulary Cards (`foundations` tag, level 1–2).
     Note what that Card itself requires, so its own chain can come too.
   - **NEW: <one-line description>**: nothing teaches it; a new basic Card should.
   - **DEFINE: <the clause>**: a one-clause definition on the Card is enough.
   - **TOO ADVANCED**: the Card belongs after the sprint (say why); it should
     move out of the essentials Decks.
Also flag Cards whose real difficulty is that they combine 3+ new ideas at once.

Write to sprint/foundations/<scope>.md:

    ## <card id>
    - <term> → REQUIRE|MOVE|NEW|DEFINE|TOO ADVANCED: <target / text>

Only list Cards with gaps. End with a "## Summary" section: the recurring gaps
(terms that many Cards lean on), each with the single remedy that fixes them all,
and the line `Audited N cards: G with gaps, T gaps total, A too advanced.`
Return only that summary.
