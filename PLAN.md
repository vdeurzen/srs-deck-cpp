# Plan: bring `cpp-core` and `algo-systems` up to standard, in place

Both Decks keep their ids and stay in this repo; nothing moves to new `*-drills`
Decks. Order: correctness → prerequisite graph → missing fundamentals → card
shape. Each phase leaves both Decks loadable and is its own commit (or a few).

## Ground rules (apply to every phase)

- **Card ids never change, cards are never deleted.** Study history is keyed on
  ids; part of `cpp-core` is already in review.
- **`version` is bumped only when the question itself changes** (different thing
  being recalled, or a `kind` change). Fixing a wrong fact, tightening prose,
  trimming a back, or fixing a harness keeps the version — the schedule stays.
- **Splitting an essay card:** the original id keeps the one question closest to
  its current front and is bumped (reset) whenever that front changes meaning;
  every other part becomes a new id that `requires` it where the dependency is
  real.
- **Done means:**
  `tool/validate cpp-core algo-systems` → 0 errors, plus `scripts/check-code`
  → every reference answer compiles and every distractor fails, plus
  `scripts/graph` → no orphan islands, no surprises in depth.
- `docs/FORMAT.md` and `tool/validate` are never edited.

## Phase 0 — housekeeping (small, first)

1. Fix `CLAUDE.md`: validate command becomes `tool/validate cpp-core algo-systems`;
   replace the "ids must not collide with `cpp-core`/`algo-systems`" clause with
   "these two Decks are the installed ones; edit them in place".
2. Delete `cpp-core/topics/.wf-resume.js` (stale workflow script, old `decks/`
   paths). Mine its foundation-topic list for Phase 3 first.
3. Rewrite the stale parts of `algo-systems/README.md` (`decks/`, `dart run`,
   gitignore section, card counts) and add a short `cpp-core/README.md`, which
   FORMAT.md already refers to.
4. Add `scripts/` (not `tool/`, which is exported):
   - `check-code` — assemble every compile-checked `code`/`parsons`/`chunk`
     card as the app does, compile with `g++ -std=c++23 -fsyntax-only`, then
     substitute every distractor and require it to fail. For `parsons`,
     substitute the distractor for each reference line in turn (the gap
     REVIEW.md found in the old tool).
   - `graph` — per-Deck depth histogram, cards with no edges, cross-topic and
     cross-Deck edge counts, and a DOT export for eyeballing.
   - `lint-shape` — reports Phase 4's limits: back length, multi-question
     fronts, cloze blank count, hints that contain their answer.

## Phase 1 — correctness

**cpp-core** (no review exists, so do one first):
1. `callables-function-ref-signature` — doesn't compile under C++23/g142.
   Rewrite to test the same idea with something the compiler has (e.g. choose
   `std::function` vs. a template parameter vs. a function pointer for a
   non-owning, non-allocating callback), or make it a `basic`. Either way bump
   `version` (question/kind changes).
2. `templates-requires-clause` — `typename`/`class` pass. Add a negative check
   (`static_assert(!requires { add_one(1.0); })`-style via a concept probe).
3. `move-semantics-destructor-suppresses-move` — `{}` and `noexcept` pass.
   Tighten the harness (`is_trivially_move_constructible`, or define the type so
   a user-provided body is observably different) or swap distractors.
4. Card-by-card review of all 137 cards, same method as `algo-systems/REVIEW.md`
   (facts, refs, discrimination, hints), written to `cpp-core/REVIEW.md`. Fix
   majors immediately; minors fold into Phase 4 when the card is touched anyway.

**algo-systems** — work `REVIEW.md` § "What to do first" steps 1–10 as written:
bloom chunk snippet, the two `parsons` distractors + README claim, seqlock,
LSM write amplification, LLVM/codegen claims, SSA/dataflow sentences, the
remaining majors (M16–M22), minors by topic (storage first, then low-latency),
refs pass. Mark each finding fixed in `REVIEW.md` as it lands.

Exit: both REVIEWs have no open majors; `check-code` clean.

## Phase 2 — the prerequisite graph

1. Add to `algo-systems/deck.yaml`:
   `relations: [{ deck: cpp-core, role: builds-on }]`. (`cpp-core` needs no
   relation; it should not depend on algorithms.)
2. Author `requires` topic by topic, within each Deck, then across Decks:
   - Only **direct** prerequisites — "you can't answer this without having
     learned that". Not "related", not "same topic". Keep the transitive
     reduction; the scheduler computes depth itself.
   - Typical fan-in 1–2, rarely 3. A card with 5 prerequisites is locked for a
     long time and is usually a sign it should be split (Phase 4).
   - Hands-on cards (`code`, `trace`, `parsons`, `chunk`) require the concept
     card they exercise; `explain` capstones require the cards their rubric
     items come from.
   - Cross-Deck edges where they are real: e.g. `algo-systems` lock-free cards
     → `cpp-core` memory-order cards (once Phase 3 adds them), arena/pool cards
     → `cpp-core` lifetime cards.
3. Sanity: every topic has at least one depth-0 entry point; no locked dead
   ends; `graph` shows a curriculum, not 300 islands.
4. Check the effect on review: cards already in review are never locked (§7.1),
   so the only change you see is the order new cards arrive in.

Note: many natural prerequisites don't exist yet (Phase 3). Edges into new
cards are added in Phase 3 as those cards land; Phase 2 wires what exists.

## Phase 3 — missing fundamentals

**cpp-core**, new topics at levels 1–3, each with concept cards first and at
least one hands-on card, wired into the graph as they are added:

| Topic (proposed path)                | Covers |
| ------------------------------------ | ------ |
| `01-basics/types-and-conversions`    | fundamental types, integer promotion, narrowing, `static_cast` family |
| `01-basics/references-and-pointers`  | reference vs pointer, `const` placement, dangling basics |
| `01-basics/lifetime-and-raii`        | storage duration, scope-bound destruction, RAII as the core idiom |
| `01-basics/linkage-and-odr`          | translation units, `inline`, `static`, ODR, headers |
| `01-basics/undefined-behaviour`      | what UB is, common sources, why the optimiser exploits it |
| `02-types/classes`                   | special members overview, access, invariants, `explicit` |
| `02-types/inheritance-and-virtual`   | virtual dispatch, vtables, virtual destructors, slicing, `final`, `override` |
| `02-types/operator-overloading`      | canonical forms, member vs free, hidden friends |
| `02-types/lambdas`                   | captures, closure types, mutable, generic lambdas |
| `02-types/variadic-templates`        | packs, fold expressions |
| `03-library/containers`              | vector/deque/list/map/unordered_map choice, invalidation (links into algo-systems) |
| `03-library/vocabulary-types`        | `optional`, `variant`/`visit`, `expected`, `string_view`, `span` |
| `03-library/strings-and-format`      | `std::string`, SSO, `std::format`/`print` |
| `04-language/exceptions`             | throw/catch, guarantees, `noexcept`, unwinding |
| `04-language/modules`                | `import std;`, module units (light) |
| `10-concurrency/threads-and-locks`   | `jthread`, mutexes, `scoped_lock`, condition variables |
| `10-concurrency/atomics-and-memory-model` | atomics, happens-before, the orderings |

Target ~5–8 cards per topic (~100 new cards), so the coroutine/execution block
stops being half the Deck. Reuse REVIEW-style verification for every
`code`/`trace` card.

**algo-systems**: add a level-1/2 entry rung (big-O basics, arrays vs lists,
hashing basics, binary search, BFS/DFS) so the Deck has depth-0 cards a
beginner can start on, then REVIEW.md step 11's proposed cards (databases →
compilers → low latency), then the step 12 hands-on cards for prose-only topics.

## Phase 4 — card shape (learning style)

Limits enforced by `scripts/lint-shape`, applied topic by topic, starting
where you study next:

- **One question per front.** "Why X, and when Y?" becomes two cards.
- **`basic` backs ≤ ~60 words** for the answer proper. Context worth keeping
  moves to a short "Why it matters" line or to `elaborate`; detail that is its
  own fact becomes its own card.
- **`cloze` ≤ 3 blanks**, one idea per passage. Hints narrow, never restate.
- **Fronts never contain their answer** (`noexcept-move` and similar).
- **`misconception` fronts must be believable**: state the claim plainly, as
  the reader would actually hold it, no "only reliable way…" strawmen.
- **More retrieval, less re-reading:** convert prose-heavy topics
  (`01-foundations`, `codegen`, `execution-and-sketches`, `14-transfer`, the
  `09-execution` block) to a mix that includes `code`/`trace`/`cloze`.
- Every new card created by a split gets `requires` edges as it is written.

Expected scale: ~100 of the 109 algo `basic` cards and ~40 cpp-core `basic`
cards need splitting or trimming; a split typically yields 2–3 cards.

## Order of work inside each phase

Topic by topic, in study order: coroutines, move semantics and smart pointers
first (already in review, so fixes reach you soonest), then by depth. Each batch: edit → `validate` →
`check-code` → `graph` → commit.

### Splitting `explain` cards

All 14 `explain` cards carry 8–13 rubric items: too many points to hold while
answering aloud. Each splits into 2–3 focused `explain` cards of **5–6 items**
(the Deck's ≥5 convention, and with 5+ items every rating band in §4.6 is
reachable; at 3 items "Good" is not). The original id becomes a short
synthesis capstone — "put it together" — with ≤5 items about how the parts
connect, `requires` on the parts, `version` bumped.

## Decisions (2026-10-06)

- **Already in review:** most of the coroutine topics (`04-language/coroutines-*`),
  some of `02-types/move-semantics` and `03-library/smart-pointers-and-ownership`.
  These go first in Phases 1, 2 and 4.
- **Resets are fine** when a split changes what a front asks: bump `version`
  and the card is relearned.
- **Splitting big reasoning cards** (the `explain` cards above) is part of Phase 4.
