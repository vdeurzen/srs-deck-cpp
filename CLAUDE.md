# Decks for srs

This repo holds study Decks for the srs spaced-repetition app. Every Card must load in
that app. The app's source is not available here; what you need of it is bundled.

## Format
- The grammar is docs/FORMAT.md (deck.yaml, front matter, the seven Kinds, loader rules,
  prerequisites, and a per-Kind guide with examples). Read it before writing or changing
  a Card. It wins over anything else, including this file.
- docs/FORMAT.md and tool/validate are exported from the app and overwritten on
  every export. Never edit them; if the format seems wrong, say so instead.
- Layout: <deck>/deck.yaml plus <deck>/topics/<topic-path>/<card-id>.md. A repo may hold
  several Decks; one Deck may not sit inside another. The Topic is the directory path
  under topics/ and nothing more: there is no Topic metadata file.
- This repo holds the installed `cpp-essentials` and `interview-essentials` Decks (the
  foundation layer), `cpp-basics`, `cpp-core`, `algo-basics` and `algo-systems`, plus the
  interview-prep Decks `hft-interview` and `leetcode`; edit them in place. Their ids are
  fixed. A new Deck's id must not collide with them.
- The two essentials Decks were made on 2026-10-17 by moving the ~550 highest-payoff Cards
  out of the other six (the learner agreed to lose those Cards' history). `sprint/moved.tsv`
  maps every old id to its new one; `sprint/README.md` is the study plan. On 2026-10-19/20
  they were rebuilt foundations-first: ~110 foundation Cards moved in or written, ~70
  advanced Cards moved back out to their original Decks and ids
  (`sprint/foundations/moved-out.tsv`). Those were one-offs: the id rule below applies
  to the essentials Decks as to every other.
- PEDAGOGY.md is the authoring standard (teaching order, working-memory budget, no
  give-aways); the agents in .claude/agents follow it.
- Part of `cpp-core` is in active review (coroutines, move semantics, smart
  pointers). Bump `version` only when a Card's question changes meaning.
- Card ids are [a-z0-9-]+, unique within the Deck, and never change once pushed:
  review history is keyed on them. To reset a Card's schedule, bump `version`;
  never rename the id. Deleting a Card orphans it; it does not erase its history.
- Every Card cites at least one reference in `refs` (cppreference, a paper, a book).
- `code` Cards must discriminate a wrong answer at compile time (the compile service
  never executes): use static_assert / constexpr checks, not a main() that returns.
- `cpp-essentials` builds on nothing; `interview-essentials` builds on it. Neither may
  `require` a Card outside the two: they must stay complete when the other six are paused.
- `cpp-basics` builds on `cpp-essentials`; `cpp-core` on that and `cpp-basics`;
  `algo-basics` builds on both essentials Decks, `cpp-basics` and `cpp-core`;
  `algo-systems` builds on those plus `algo-basics`, so it may `require`
  `cpp-basics/<id>`, `cpp-core/<id>` and `algo-basics/<id>`. `hft-interview` and
  `leetcode` build on all of them; nothing requires them, so they can be paused on
  their own. Validate all Decks together so those edges are checked.
- PLAN.md is the current work plan.

## Done means validated
From the repo root, run:
    tool/validate cpp-essentials interview-essentials cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode
    scripts/check-code cpp-essentials interview-essentials cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode
New or changed compile-graded Cards are also checked against the app's compiler:
    scripts/check-code <decks...> --remote --id <ids...>
Pass every Deck in this repo in one run, so `requires` between them is checked.
Do not report work as finished until this prints 0 errors.
