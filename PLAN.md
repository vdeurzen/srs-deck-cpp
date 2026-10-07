# Plan: bring `cpp-core` and `algo-systems` up to standard, in place

Both Decks keep their ids and stay in this repo; nothing moves to new `*-drills`
Decks. Order: correctness → prerequisite graph → missing fundamentals → card
shape. Each phase leaves both Decks loadable and is its own commit (or a few).

## Status (2026-10-07)

| Phase | State |
| --- | --- |
| 0 Housekeeping | done |
| 1 Correctness | done: both REVIEW.md files worked |
| 2 Prerequisite graph | done |
| 3 Missing fundamentals | done: every topic in the table and the gaps table |
| 4 Card shape | done for every topic except the 10 `parsons` Cards, which wait for the app's pre-filled lines |

Now: cpp-core 416 Cards / 543 edges, depth ≤ 8; algo-systems 559 Cards /
666 edges (21 into cpp-core), depth ≤ 9. `tool/validate` 0 errors,
`scripts/check-code` 0 problems (5 LOOSE parsons), `lint-shape` 0 flags.
Every topic was reviewed by `learning-designer` and revised before commit.

Remaining:
- Parsons Cards: convert includes/class shells to pre-filled lines once the
  FORMAT.md re-export defines them; then fix the 5 LOOSE distractors.
- Small open items noted by reviewers: a hands-on MOP-vs-MFP Card
  (09-compilers); the Aho–Corasick failure trace is 16 lines.

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
| `01-basics/types-and-conversions`    | fundamental types and what the standard guarantees, fixed-width aliases, `size_t`/`ptrdiff_t` and the signed/unsigned trap, promotion and usual arithmetic conversions, signed overflow UB vs unsigned wrap, narrowing, `enum class` vs `enum`, `char` signedness, the `static_cast` family |
| `01-basics/layout`                   | `struct` layout, padding, `sizeof`, `alignof`/`alignas` (opens the seam to algo-systems, which uses alignment 9×) |
| `01-basics/references-and-pointers`  | reference vs pointer, `const` placement, `auto` dropping const/ref, dangling basics |
| `01-basics/lifetime-and-raii`        | storage duration, scope-bound destruction, RAII as the pattern the language is organised around |
| `01-basics/linkage-and-odr`          | translation units, `inline`, `static`, ODR, headers |
| `01-basics/undefined-behaviour`      | what UB is, common sources, why the optimiser exploits it |
| `02-types/classes`                   | invariants and the constructor that establishes them, access as invariant protection, `class` vs `struct`, special members as a set and Rule of Zero/Three/Five, `explicit`, `const` members and logical constness, `friend`, `[[nodiscard]]`, delegating constructors, member-init **order** (trace) |
| `02-types/inheritance-and-virtual`   | the vtable mechanism, pure virtual/abstract interfaces, virtual destructors and what leaks without one, slicing, `override`/`final` and the bug `override` catches, name hiding, virtual calls in ctors/dtors (trace), dispatch cost, composition vs inheritance by deciding property, NVI |
| `02-types/static-polymorphism`       | CRTP and what it buys over virtual, static vs dynamic dispatch, EBO / `[[no_unique_address]]`, policies and mixins, type erasure as the inverse trade, tag dispatch → `if constexpr`/concepts, PIMPL |
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

Target ~5–8 cards per topic (~120 new cards), so the coroutine/execution block
stops being half the Deck. Reuse REVIEW-style verification for every
`code`/`trace` card.

**Gaps found while wiring prerequisites (Phase 2).** Each is a concept that
existing Cards assume and no Card teaches. Once the Card lands, wire the
listed dependents to it.

| Missing concept | Deck / where it goes | Dependents to wire |
| --- | --- | --- |
| RAII & destructors | cpp `01-basics/lifetime-and-raii` (table above) | `transfer-defer-vs-raii`, smart-pointer Cards |
| Lambdas; `std::function`/callable basics | cpp `02-types/lambdas` (table above) | `05-interview/function-ref-and-callables` |
| `std::optional`, `nullptr` | cpp `03-library/vocabulary-types` (table above) | `transfer-nil-vs-nullptr-optional` |
| Atomics, memory model, `alignas` | cpp `10-concurrency/atomics-and-memory-model`, `01-basics/layout` | algo `ll-memory-orders`, `ll-false-sharing`, `ll-progress-guarantees` (cross-Deck) |
| Pointers & arrays basics | cpp `01-basics/references-and-pointers` | algo slice, ring and handle Cards in `02-sequences` |
| Async scope (`counting_scope`, `spawn`), `as_awaitable` | cpp `09-execution` | `execution-split-multi-shot`, `execution-senders-and-coroutines` |
| Binary search on a sorted array (entry Card) | algo `04-ordered` | `lower-bound-loop`, `chunks-lower-bound-lookup` |
| Bit tricks (`x & -x`, `x & (x-1)`) | algo `01-foundations` | `fenwick-tree`, `chunks-iterate-set-bits`, `branchless-select` |
| Dynamic programming basics; tree tiling | algo `01-foundations` / `09-compilers` | `compiler-instruction-selection`, `db-join-ordering` |
| Transactions & isolation levels | algo `10-databases` | `db-mvcc` |
| LRU / cache replacement | algo `05-priority` or `10-databases` | `trace-lru-order`, `db-buffer-pool` |
| `stop_token`/`stop_callback`; `mutex`/`lock_guard`; `thread_local`; `jthread` basics | cpp `10-concurrency/threads-and-locks` | `coroutines-scheduling-stop-token-plumbing`, thread-affinity Cards, `parsons-jthread-stop-token` |
| Temporaries die at the end of the full-expression | cpp `01-basics/lifetime-and-raii` | `coroutines-parameters-copied`, `coroutines-generator-dangling-parameter` |
| Range categories (`input_range` …) | cpp `03-library/ranges-and-views` | `coroutines-generator-is-a-view` |
| Variadic templates, `using` pack expansion | cpp `02-types/variadic-templates` | `chunks-visit-overload-set` |
| Go concurrency; GC & leaks; thread scaling | algo `11-low-latency` / `14-transfer` | `chunks-go-worker-pool`, `trap-go-gc-and-leaks`, `trap-more-threads` |

Phase 2 follow-up (done 2026-10-06; Cards that already existed): wired
`trap-bloom-false-negative` and `chunks-bloom-double-hashing` →
`db-bloom-filter`, and `chunks-cache-padded-counter` → `ll-false-sharing`.
These had been barred during Phase 2 to keep the parallel agents from
creating cycles between them.

Topic directories can be renumbered freely (e.g. a `00-foundations` prefix, or
shifting `01-basics` down): the Topic is only the directory path, and review
history is keyed on card ids, not paths.

Design principles for new cards (from the earlier foundation-rung brief; the
goal is a solid base of associated long-term patterns that make complex
problems recognisable quickly):

- **Simple, not shallow.** A foundation card needs nothing taught later; its
  assumptions are exactly its `requires`.
- **Association.** Every foundation card names, via the graph, something later
  that builds on it. One nothing builds on is trivia.
- **Recognition over definition.** "This call does not dispatch — why?" beats
  "What is a virtual function?". Favour cards that force a choice or explain a
  symptom.
- **Discrimination pairs** for things beginners confuse (`class`/`struct`,
  virtual/CRTP, `enum`/`enum class`, reference/pointer, copy/move,
  stack/heap): the answer names the deciding property.
- **Production.** At least half of each new topic is `code`, `chunk`,
  `parsons` or `trace`. Compile-graded cards discriminate at compile time
  (`static_assert` on `sizeof`/`alignof`/traits/`constexpr` values, or a
  deliberate access/overload failure).
- **Capstones.** Each foundation strand ends in one `explain` that rebuilds a
  design from memory (e.g. "design a value type that owns a buffer"), sized
  per the `explain` rule below.

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

### Code-building cards (`parsons`, `chunk`): every line has one right place

Problem: `parsons` cards run 8–34 lines, and every one has 1–3 `#include`s that
can go anywhere, plus interchangeable members. Grading compiles, but the
*suggested rating* counts moves beyond the authored order (§4.8), so a valid
different order is still marked Hard or Again. 13 of 18 `chunk` cards are
`compile: null`, graded by exact text match, so any reordering fails outright.

Rules:
- **≤ 9 movable lines** per `parsons`, all order-determined. A bigger program
  becomes several cards (e.g. `parsons-rule-of-five` → one per special member,
  or the copy-assignment body alone), chained with `requires`.
- **Includes and scaffolding** (class shell, other members) will move into the
  app's upcoming pre-filled `parsons` lines. Wait for the FORMAT.md re-export
  that defines them, then convert; don't restructure cards around the missing
  feature before that.
- **`chunk`** stays ≤ 7 lines, order-determined, and gets a `constexpr` harness
  where possible, so a correct reproduction is never failed on text alone.


App-side requests (FORMAT.md is exported from the app, not ours to change):
1. Pre-filled lines for `parsons`: **coming** (2026-10-06). Parsons
   restructuring for includes/scaffolding waits for it.
2. Rating a compile-correct `parsons` answer by moves away from one authored
   order penalises valid alternatives: when `compile` passes, grade on
   compile alone.

### Splitting `explain` cards

All 14 `explain` cards carry 8–13 rubric items: too many points to hold while
answering aloud. Each splits into 2–3 focused `explain` cards of **5 items**
(the Deck's ≥5 convention; learning research puts the ideal at 4–5 distinct,
checkable claims, and at 5 every rating band in §4.6 is still reachable). The original id becomes a short
synthesis capstone — "put it together" — with ≤5 items about how the parts
connect, `requires` on the parts, `version` bumped.

## Decisions (2026-10-06)

- **Already in review:** most of the coroutine topics (`04-language/coroutines-*`),
  some of `02-types/move-semantics` and `03-library/smart-pointers-and-ownership`.
  These go first in Phases 1, 2 and 4.
- **Resets are fine** when a split changes what a front asks: bump `version`
  and the card is relearned.
- **Splitting big reasoning cards** (the `explain` cards above) is part of Phase 4.

## Phase 5 — `algo-basics` Deck (2026-10-07)

Why: algo-systems assumes the textbook core. A learner coming back to it
needs that core first, as its own Deck that algo-systems builds on.

- Deck `algo-basics` (builds-on cpp-core); algo-systems builds-on it.
- Level 1–3, reminder-style for a programmer who once knew this: one idea per
  Card, a concrete example on every Card, the "why it's O(...)" for every
  bound, at least half hands-on (trace/code/parsons-free), PEDAGOGY.md sizes.
- Topics and id prefixes:

| Topic | Prefix | Covers |
| --- | --- | --- |
| `01-complexity` | `complexity-` | big-O/Θ/Ω, common classes, counting loops, logs, best/average/worst, amortised, recurrences and the master theorem |
| `02-linear` | `linear-` | arrays, dynamic arrays, linked lists, stacks, queues/deques, two pointers, sliding window, prefix sums |
| `03-hashing` | `hashing-` | hash functions, chaining vs open addressing, load factor, sets/maps, average vs worst |
| `04-searching` | `search-` | binary search and its invariants, lower/upper bound, searching on the answer |
| `05-trees` | `tree-` | binary trees, traversals, BST insert/delete/search, why balance, AVL and red-black invariants, rotations, B-tree idea, tries |
| `06-heaps` | `heap-` | binary heap, sift up/down, heapify in O(n), priority-queue operations |
| `07-sorting` | `sort-` | insertion, selection, merge, quick (partition, pivot, worst case), heap sort, counting/radix, stability, the n log n lower bound, quickselect |
| `08-graphs` | `graph-` | representations, BFS, DFS, topological sort, cycle detection, Dijkstra, Bellman-Ford, MST (Prim, Kruskal), union-find |
| `09-techniques` | `technique-` | recursion, divide and conquer, greedy (exchange argument), dynamic programming (memo vs table, classic problems), backtracking |

- Moved from algo-systems (recreated here, originals deleted, their
  algo-systems dependents re-pointed to `algo-basics/<new id>`). History is
  not a concern: the learner had only used Practice on algo-systems.
  `foundations-big-o-scaling`, `foundations-count-loop-steps`,
  `foundations-amortised-vs-average`, `foundations-amortised-single-call`,
  `foundations-master-theorem`, `foundations-dp-overlapping-subproblems`,
  `foundations-dp-memo-calls`, `seq-array-insert-shift`,
  `seq-array-vs-list-index`, `hash-average-vs-worst`, `hash-linear-probe-step`,
  `ordered-binary-search-halving`, `ordered-binary-search-trace`,
  `ordered-bst-insert-order-trace`, `ordered-why-balance`,
  `ordered-balance-families`, `sort-stability`, `graph-bfs-and-dfs`,
  `graph-bfs-mark-on-push`, `graph-union-find-forest`.
- Then algo-systems' entry Cards require the algo-basics Cards they build on.

Status: done (2026-10-07). 228 Cards, every topic reviewed by
`learning-designer` and revised; 20 Cards moved (scripts/apply-moves);
30 cross-topic edges inside algo-basics, algo-systems wired onto it.
Closed: tree-complete-shape now precedes heap-shape-and-order.
