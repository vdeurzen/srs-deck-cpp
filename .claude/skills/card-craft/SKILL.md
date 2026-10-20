---
name: card-craft
description: How to write, split or rewrite a single srs Card in this repo so it loads, teaches and stays within its time. Front-matter templates per Kind and rung (basic, vocabulary, worked example, faded and full trace, misconception, cloze, parsons, code, chunk, explain capstone, mixed recognition, stretch), the checks to run on each Card, and the version/id rules. Use whenever creating or editing a Card file under */topics/.
user-invocable: false
---

# Writing one Card

The standards are `docs/FORMAT.md` (what loads; it wins), `PEDAGOGY.md`
(what teaches: the §0 ladder, §2 Card rules, §3 sequencing, §3.1 trace
budget, §4 Kinds and times) and `TEACHING.md` (topic planning, growth,
stretch Cards, subgoal labels). This skill is the hands-on procedure. The
templates for every Kind and rung are in [kinds.md](kinds.md): copy the
closest one rather than writing front matter from memory.

## Before writing
1. Know the Card's **rung** (PEDAGOGY §0) and its concept. If there is a
   lesson plan in `curriculum/<deck>/<topic>.md`, take the id, Kind,
   `requires` and subgoal labels from it.
2. Compute the Card's transitive `requires` closure (a script importing
   `scripts/cards.py`) and read those Cards. The Card may use only what that
   closure teaches, plus at most one one-clause definition on the front
   (PEDAGOGY §3, novice-complete).
3. Check that the id is unused: `grep -rlx "id: <id>" <deck>/topics` must
   print nothing. Ids are `[a-z0-9-]+` and permanent.

## Checks (all must pass before you report)
Run from the repo root.

    scripts/estimate-time <deck> --id <id> [<id> ...]   # within budget (TEACHING §2), no structural flags, or justified
    scripts/lint-shape <deck> --topic <prefix>          # your Cards unflagged, or justified

- **trace**: write the snippet into a scratch file with prints at each
  probe, compile with `g++ -std=c++23 -Wall -Wextra`, and run it. The probe
  values are what it printed.
- **code / parsons / chunk with a harness**: `scripts/check-code <deck> --id
  <ids>`, then the same with `--remote` (GCC 14.2, which is what the app
  uses). The reference must compile, and every distractor must fail.
- **Give-aways** (PEDAGOGY §2 rule 5): answer using the closure but without
  this Card's target idea. If you still get it right, from a comment, a
  name, the id, the tags or by elimination, the Card leaks.
- **Cold read**: reread the front as someone who knows only the closure.
  If you hesitated on a word, define it or add the prerequisite (its
  lowest-rung Card).
- By hand, since lint-shape can't check them: the numeric limits of PEDAGOGY
  §2 rule 2, §3 fan-in, §3.1 and the §4 table; `elaborate` present where
  required; ≥ 1 `refs` (open the URL).

The repo-wide validate and check-code commands (all eight Decks together,
so cross-Deck `requires` are checked) are in CLAUDE.md. They must print 0
errors.

## Changing an existing Card
- Never rename or delete a Card file or change its `id`.
- Bump `version` by 1 when the question or the expected answer changes (a
  new probe value, a different blank, a changed front). Wording, `refs`,
  explanation and `requires` edits keep the version.
- Splitting: the original id keeps the part closest to its current front;
  the other parts get new ids, wired with `requires`.
- A Card that is too long, needs a worked example, or combines ideas: shrink
  it, put a rung beneath it, or split it, in that order of preference.
