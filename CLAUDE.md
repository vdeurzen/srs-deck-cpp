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
- This repo holds the installed `cpp-core`, `algo-basics` and `algo-systems` Decks;
  edit them in place. Their ids are fixed. A new Deck's id must not collide with them.
- Part of `cpp-core` is in active review (coroutines, move semantics, smart
  pointers). Bump `version` only when a Card's question changes meaning.
- Card ids are [a-z0-9-]+, unique within the Deck, and never change once pushed:
  review history is keyed on them. To reset a Card's schedule, bump `version`;
  never rename the id. Deleting a Card orphans it; it does not erase its history.
- Every Card cites at least one reference in `refs` (cppreference, a paper, a book).
- `code` Cards must discriminate a wrong answer at compile time (the compile service
  never executes): use static_assert / constexpr checks, not a main() that returns.
- `algo-basics` builds on `cpp-core`; `algo-systems` builds on both, so it may
  `require` `cpp-core/<id>` and `algo-basics/<id>`. Validate all Decks together
  so those edges are checked.
- PLAN.md is the current work plan.

## Done means validated
From the repo root, run:
    tool/validate cpp-core algo-basics algo-systems
    scripts/check-code cpp-core algo-basics algo-systems
Pass every Deck in this repo in one run, so `requires` between them is checked.
Do not report work as finished until this prints 0 errors.
