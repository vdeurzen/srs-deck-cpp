---
name: card-craft
description: How to write, split or rewrite a single srs Card in this repo so it loads, teaches and stays within its time budget. Front-matter templates per Kind (basic, worked basic, cloze, code, chunk, parsons, trace, explain, misconception), the checks to run on each Card, and version/id rules. Use whenever creating or editing a Card file under */topics/.
user-invocable: false
---

# Writing one Card

The standards are `docs/FORMAT.md` (what loads; it wins), `PEDAGOGY.md` (what
teaches) and `TEACHING.md` (where the Card sits in its topic and its time
budget). This skill is the hands-on procedure. Templates for every Kind are
in [kinds.md](kinds.md): copy the closest one rather than writing front
matter from memory.

## Before writing
1. Know the Card's **rung and tier** (TEACHING §2–3). If there is a lesson
   plan in `curriculum/<deck>/<topic>.md`, the plan gives both, plus the id
   and `requires`.
2. Read every Card in its `requires` closure. The Card may use only what
   those Cards teach, plus one-clause definitions on the Card itself
   (PEDAGOGY §3, novice-complete).
3. Check that the id is unused: `grep -rx "id: <id>" <deck>/topics` must
   print nothing. Ids are `[a-z0-9-]+` and permanent.

## While writing
- One idea; the front asks one question; one defensible answer.
- Concrete example first, 3–8 lines. Vary identifiers between sibling Cards.
- Use the topic's subgoal labels word for word in comments (TEACHING §5).
- Define each new term in one clause where it is first used, unless a
  prerequisite teaches it.
- `refs`: at least one primary source (cppreference / eel.is / WG21 paper for
  C++; the original paper, official docs or cp-algorithms for algorithms; the
  problem URL for a LeetCode problem). Open the URL to check the anchor.
- `level` follows the rung (TEACHING §4). `tags` match siblings'.
- Only `requires` within the Deck's `relations` (CLAUDE.md). Essentials
  Decks may require only each other, and `cpp-essentials` only itself.

## Checks (all must pass before you report)
Run from the repo root.

    scripts/estimate-time <deck> --id <id> [<id> ...]   # within tier, no structural flags (or justify)
    scripts/lint-shape <deck> --topic <prefix>          # your Cards unflagged (or justify)

- **trace**: write the snippet into a scratch file with prints at each probe,
  compile with `g++ -std=c++23 -Wall -Wextra` and run it. The probe values
  are what it printed. Name the compiler in the explanation.
- **code / parsons / chunk with a harness**: `scripts/check-code <deck> --id
  <ids>`, then `--remote` (GCC 14.2, which is what the app uses). The reference must
  compile, and every distractor must fail. No `main()` that returns a verdict:
  the app never runs code.
- **The cold read**: reread the front as someone who knows only the
  `requires` closure. Can you answer it within the tier? If you hesitated on a
  word, define it or add the prerequisite.

The repo-wide validate command (all eight Decks together, so cross-Deck
`requires` are checked) is in CLAUDE.md; it must print 0 errors.

## Changing an existing Card
- Never rename or delete a Card file or change its `id`.
- Bump `version` by 1 when the question or the expected answer changes
  (a new probe value, a different blank, a changed front). Wording, refs,
  explanation and `requires` edits keep the version.
- Splitting: the original id keeps the part closest to its current front;
  the other parts get new ids, wired with `requires`.
- A Card that is too long, needs a worked example, or combines ideas: shrink
  it, put a rung beneath it, or split it, in that order of preference.
