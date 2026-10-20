# Foundations plan: notes (2026-10-19)

Consolidates sprint/foundations/{cpp-basics,cpp-core,algo-systems,leetcode-hft}.md (1559 finding lines on 517 Cards) into the files in this directory. Built by scripts in /tmp/pw (parse, resolve, graph, write); nothing outside plan/ was touched. The working tree already holds the concurrent trace rebuild (sprint/traces/, uncommitted, eight untracked `*-worked` Cards); this plan was computed against that state and reuses its worked Cards.

## Counts

| Item | Count |
| --- | --- |
| move-out (move-out.tsv) | 68 (23 cpp-essentials, 45 interview-essentials): 61 audit/“consider” calls accepted + 7 added (1 closure, 6 my calls) |
| move-in (move-in.tsv) | 52 (20 → cpp-essentials, 32 → interview-essentials) |
| new Cards (new-cards.tsv) | 54 (39 cpp-essentials, 15 interview-essentials), all `basic` |
| drop-edges.tsv | 14 edges |
| Cards with edits (edits/*.md) | 439 (cpp-basics 127, cpp-core 116, algo-systems 125, leetcode-hft 71) |
| added `requires` edges | 438 on 306 Cards (after removing 317 already-reachable suggestions) |
| `define` lines | 557 |
| essentials Cards | 581 now → 619 after the plan |

coverage.tsv lists every finding line with its final resolution. Totals: define: 594, requires (added): 437, requires (reachable through the chain): 290, structure: 163, move-out: 145, covered: 77, dropped: 17, requires (already direct): 14, drop-edge cpp-essentials/spaceship-basics: 1. "structure" lines are the audits' overload/trace flags, answered by a `split / reshape` or `trace` line in the edits; "covered" lines are where the audit itself said the term is already taught (ok / in closure / via …).

## Move-out decisions

Accepted audit TOO ADVANCED calls (destination = original id from moved.tsv; `gr-01-bfs-code` and `rq-fenwick-code` were created after the move and go to `leetcode/` under the same id, no collision):

- cpp-essentials: reinterpret casts (2), if-constexpr, static-guard cost, temporary materialization, pimpl, CRTP, type erasure, concepts-vs-SFINAE, unique_ptr deleter size, conditional noexcept + noexcept operator, lock-free-is-per-type, seq-cst store buffering.
- interview-essentials: master theorem, custom hasher/equality functor, AVL-vs-red-black, heapify-is-linear proof, comparison-sort lower bound, exchange argument, growth-below-two, memory-order codegen, pair-key hash, 0-1 BFS, bitmask DP, Fenwick, segment-tree signal, split-array contrast, optional-on-a-union (2), every shared_ptr/unique_ptr implement-it Card except uptr-array-specialisation (8), the raw-storage vector chain (9: build, emplace_back, erase, explain, delegates, self-alias, realloc order/rollback, relocate), LRU-on-index-arrays, packet reinterpret, SPSC (5), constinit / init-order fiasco / MI sizeof / overload puzzles.
- "consider TOO ADVANCED" calls I took: lambda-init-capture (4 ideas, 22-Card closure), templates-two-phase-lookup, ranges-sort-projection (pointer-to-member projection), stl-pair-key-hash (6 ideas).

Added by me (not audit calls):

- cpp-essentials/templates-typename-disambiguator: closure: genuinely needs templates-two-phase-lookup (dependent names); same language-lawyer family.
- interview-essentials/ll-spsc-orders: added: L5 SPSC memory-order cloze; every other SPSC Card moves out (spsc-publish-order requires it), and the audit could only keep it by inventing a new SPSC worked example.
- cpp-essentials/storage-allocate-vs-construct: added: raw storage was brought into essentials only to carry the vec-* implement-it chain (sprint/move.py EXTRA); that chain moves out as TOO ADVANCED, and raw storage is the same post-foundations material.
- cpp-essentials/storage-construct-at: added: raw storage, see storage-allocate-vs-construct.
- cpp-essentials/storage-destroy-at-pop: added: raw storage, see storage-allocate-vs-construct.
- cpp-essentials/storage-destroy-then-deallocate: added: raw storage, see storage-allocate-vs-construct.
- cpp-essentials/storage-live-range-invariant: added: raw storage, see storage-allocate-vs-construct.

Closure (essentials Cards requiring a moved-out Card): templates-typename-disambiguator moves (above); the rest keep their place and lose the edge (drop-edges.tsv):

- interview-essentials/stl-iota-argsort → cpp-essentials/ranges-sort-projection: the lambda projection is self-explanatory with a one-clause DEFINE; argsort is a LeetCode staple.
- cpp-essentials/value-categories-guaranteed-elision → cpp-essentials/value-categories-temporary-materialization: the Card explains prvalue initialisation itself; needs class-delete-copy and std-move-cloze instead.
- cpp-essentials/strings-string-view-parameter → cpp-essentials/value-categories-temporary-materialization: audit: spurious; replace with life-temporary-full-expression.
- interview-essentials/rec-dp-cell-vs-mask → interview-essentials/dp-bitmask-signal: part (b) is reshaped away from bitmask DP.
- interview-essentials/sort-counting-idea → interview-essentials/sort-lower-bound: only the fact is needed; DEFINE it.
- interview-essentials/rec-intervals-greedy-vs-dp → interview-essentials/technique-exchange-argument: the back states the swap argument itself; require technique-activity-selection (earliest-end greedy) instead.

## Overruled audit calls

- interview-essentials/sort-counting-idea: not a TOO ADVANCED call on the Card itself: it only leaned on sort-lower-bound. Keep; drop that edge and DEFINE the Ω(n log n) fact.
- interview-essentials/rec-dp-cell-vs-mask: keep: the recognition skill (when position alone is not enough state) is core DP; reshape part (b) to a non-mask goal-dependent state (House Robber: took previous or not) and drop the edge to dp-bitmask-signal.
- interview-essentials/rec-explain-dp: keep: the DP-formulation capstone is a staple; replace rubric item (5) (bitmask/TSP) with a 1-D or grid formulation; item (3) gets the new dp-lis-quadratic.
- interview-essentials/rec-explain-graphs: keep: graph-algorithm choice is a staple; replace rubric item (2) (0-1 BFS) with plain BFS-vs-Dijkstra on weights.
- interview-essentials/rec-shortest-path-weights: keep: weights decide BFS vs Dijkstra, a staple; drop part (b) (0-1 BFS).
- cpp-essentials/operators-chunk-arithmetic-pair: audit said "consider TOO ADVANCED until OPS and friend exist"; both now exist as new Cards, and operator+ via += is a core idiom. Keep; DEFINE ADL.
- Staples kept as the brief asks: rule of five, move-semantics basics, virtual dispatch, smart-pointer basics (incl. uptr-array-specialisation), vector growth (vec-three-pointers, vec-reserve-*, vec-zero-capacity-growth), hash-map basics, BFS/DFS, binary search, basic DP. The atomics/memory-order Cards the audits kept stay, with the new atomics-memory-order-intro under them.

## Move-in decisions

All moved-in Cards are level 1–2 and mostly tagged `foundations`; none collides with an id in its destination Deck. Their own `requires` are carried over (re-pointed to the essentials ids), except these edges, which are dropped (drop-edges.tsv) and, where needed, replaced in the edits:

- cpp-essentials/ptr-arrow-null-check → cpp-essentials/ptr-nullptr-overload: the Card needs only "nullptr is the null pointer" (one clause), not overload ranking; the edge made `->` depth 4 behind three integer-conversion Cards.
- cpp-essentials/tmpl-auto-param-cloze → cpp-essentials/tmpl-instantiation-statics: a 5-probe trace is not needed to read `auto` parameters; require tmpl-function-syntax instead.
- interview-essentials/complexity-cost-cases → algo-basics/complexity-cost-trace-early-exit: the front states all three costs (1, 22, 28); the 3-run trace is over the §3.1 budget.
- interview-essentials/complexity-cost-arithmetic-sum → algo-basics/complexity-cost-trace-triangular: self-contained closed form; essentials complexity-count-loop-steps already shows the triangular count.
- interview-essentials/complexity-cost-geometric-sum → algo-basics/complexity-cost-trace-doubling: self-contained closed form; 3-run trace over budget, essentials log-halvings covers doubling.

MOVE suggestions not taken:

- cpp-core/operators-postfix-increment: it teaches overloading postfix operator++(int), not what `a[i++]` yields; instead NEW/existing Card cpp-essentials/expr-increment-value.
- cpp-core/initialization-array-ctad: L2 CTAD; one use; instead define: “`std::array a{4, 7, 1}` deduces both the element type and the length from the list”.
- cpp-basics/ub-off-by-one-bound: one use; a clause suffices; instead define: “`int a[8]` has valid indices 0..7; `a[8]` reads one past the end”.
- cpp-basics/class-compare-defaulted-shortcut: harness leak; L2 Card with two cpp-basics prerequisites; instead reshape: hide `operator== = default` inside the harness.
- algo-basics/tree-btree-node: L2, requires tree-min-height; instead define: “B-tree: a wide search tree whose nodes hold many sorted keys, kept shallow for disk”.
- algo-basics/technique-dp-memo-calls: it requires the Card that needs it (cycle); instead define: “memo: a table caching each call's answer by its arguments, so a repeated call returns at once”.
- algo-basics/complexity-cost-trace-shrink-recurrence: two-run trace duplicating complexity-shrink-by-one-vs-half; instead define: “T(n) = T(n − 1) + n: the cost at size n is one call on n − 1 plus n steps of work”.
- algo-basics/hashing-set-map-ops-trace: teaches unordered_set::insert(...).second, not the map operations the Card uses; instead NEW/existing Card cpp-essentials/map-unordered-map-intro.
- algo-basics/sort-partition-regions: trace with an instrumented lambda; a worked basic serves the Lomuto Cards better; instead NEW/existing Card interview-essentials/sort-lomuto-worked.
- Not moved because the essentials Decks already hold a converted or equivalent Card: complexity-cost-trace-single-loop/-doubling/-triangular/-early-exit (multi-run traces; the converted complexity-* basics cover them).

## New Cards

Merged per concept (e.g. the ~40 “NEW [vector]/VEC/vector everyday operations” suggestions became vector-basics, vector-sized-constructor, vector-back-pop-back, vector-of-vectors; the `constexpr`/`static_assert`/SCAFFOLD suggestions became constexpr-fn-static-assert, types-using-alias, plus the moved-in tmpl-auto-param-cloze). Library-API Cards that only interview-essentials uses (queue/stack, priority_queue, list, set) live there so they can build on the moved-in ADT Cards. Hardware primers for cpp-essentials (CACHE) stayed a one-clause define: cpp-essentials may not require interview-essentials.

Worked examples the audits asked for that the trace rebuild had already written are reused, not duplicated: heap-push-worked, sort-lomuto-worked (now gets requires sort-quick-idea, sort-swap-temp), sort-quickselect-worked, graph-kahn-worked, graph-dfs-worked, tree-bst-inorder-worked. New worked/intro Cards: graph-dijkstra-worked, graph-union-find-problem, lru-design-worked, dp-lis-quadratic, layout-padding-worked, err-throw-catch-intro, smart-unique-ptr-intro, smart-shared-ptr-intro, virtual-function-intro, stdalgo-remove-if-worked.

NEW suggestions not taken: union basics, custom unordered_map hash, segment-tree basics, SPSC worked example (their Cards move out); storage-vs-object-lifetime (raw storage moves out); interval-state DP (rec-one-vs-two-sequences drops part (c)); member-initialiser-list basic (a define on class-init-list-required, since class-default-member-initialiser already requires that Card); if-with-initialiser, `std::cout`, "object" (one-clause defines).

## Graph checks and risks

- **Acyclic**: the resulting graph (essentials minus move-out, plus move-in and new Cards, plus every added edge) has no cycle (DFS check). Two suggested edges would have closed one and became defines: conc-single-counter-fix ↔ conc-data-race-one-writer (now via the new conc-atomic-int-intro) and life-scope-automatic → life-destructor-intro.
- **Relations**: no cpp-essentials Card requires interview-essentials. One audit suggestion would have (containers-map-vs-unordered-map → hashing-index-mod-trace); it is a define.
- **Depth**: max 11 today → max 13 after the plan. Deepest chains:
  - rec-explain-dp ← rec-list-vs-count ← dp-coin-ways-chunk ← technique-knapsack-direction ← technique-coin-change-table ← technique-dp-state ← technique-dp-overlapping-subproblems ← complexity-recursion-tree-calls ← complexity-log-halvings ← complexity-count-loop-steps ← complexity-big-o-scaling ← complexity-asym-log-rules ← complexity-asym-big-o-definition ← complexity-asym-step-model
  - rec-explain-graphs ← rec-shortest-path-weights ← graph-dijkstra-why-nonnegative ← graph-dijkstra-popped-final ← graph-dijkstra-worked ← graph-bfs-why-shortest ← graph-bfs-and-dfs ← linear-queue-ring ← linear-array-insert-shift ← linear-array-index-contiguity ← complexity-big-o-scaling ← complexity-asym-log-rules ← complexity-asym-big-o-definition ← complexity-asym-step-model
  - mono-histogram-trace ← mono-histogram-worked ← mono-histogram-bounds ← mono-next-greater-chunk ← mono-stack-signal ← linear-deque-both-ends ← linear-queue-ring ← linear-array-insert-shift ← linear-array-index-contiguity ← complexity-big-o-scaling ← complexity-asym-log-rules ← complexity-asym-big-o-definition ← complexity-asym-step-model
  The growth is foundation Cards at the roots (big-O definition → step model; vector-basics → iterator → algorithm basics). Depth histogram: 0: 48, 1: 45, 2: 70, 3: 71, 4: 70, 5: 63, 6: 67, 7: 52, 8: 42, 9: 39, 10: 30, 11: 15, 12: 5, 13: 2. Two depth-cutting edits are already in: ptr-arrow-null-check drops its edge to ptr-nullptr-overload, and dp-grid-dag-signal cuts its Dijkstra clause.
- **Fan-in**: additions were capped so a Card ends with ≤ 3 `requires` where it had room (always at least one addition when needed); 62 capped suggestions became defines. 14 Cards end with more than 3 requires, 11 of them because of an addition (their existing fan-in was already ≥ 3).
- **Sprint schedule**: README.md's load model (depth 11, done by day 12) no longer holds: +106 Cards in, −68 out, and deeper chains. At 60 new/day with two sessions the extra depth adds ~1 day before the last Cards unlock.
- **Review history**: the learner has studied since 2026-10-17. Moving a Card changes its qualified id, so every moved-out Card loses its essentials history and every moved-in Card starts fresh (its old-Deck history, if any, is orphaned). Apply the moves with scripts/apply-moves, which re-points `requires` in all Decks.
- **Mock interview**: README's day-13 mock "implement `push_back`" is no longer backed by a Card chain once the raw-storage vector Cards leave; vec-three-pointers / vec-reserve-* / vec-zero-capacity-growth and the move-semantics spine remain.
- **Card growth**: 557 defines add a clause each; Cards that collect four or more (const-loop-chunk, const-ref-parameter, tree-bst-inorder-trace, a few LeetCode code Cards) should be read for the 60-word budget when edited, or have a term cut instead.
- **Versions**: defines and requires are wording/graph changes (no bump). The `split / reshape` lines that cut or replace a probe, a distractor or a rubric item change the question: bump `version` (rec-dp-cell-vs-mask, rec-explain-dp, rec-explain-graphs, rec-shortest-path-weights, life-scope-automatic, dp-grid-dag-signal, rec-one-vs-two-sequences).
- **Trace rebuild overlap**: trace lines say "done in the trace rebuild" where sprint/traces already SHRINK/CONVERT/WORKED-FIRSTed a Card; where the rebuild judged a Card OK but an audit disagreed (types-signed-unsigned-trace, trace-temporaries-in-range-for, raii-ctor-throw-unwinds-members, atomics-trace-*, ub-unsigned-countdown-trace) the line is optional.

## Dropped gaps

Gaps resolved by cutting the term from the Card rather than teaching it (each also appears as a `split / reshape` line in the edits):

- dropped: cpp-essentials/types-auto-drops-const — `decltype(auto)` (back only) — cut from the Card (back-only aside; not needed for the lesson)
- dropped: cpp-essentials/class-const-object-call — `std::vector::operator[]` in back — cut from the Card (back-only aside)
- dropped: cpp-essentials/class-delete-copy — `#include <type_traits>` noise — drop — cut/rewritten in the Card
- dropped: cpp-essentials/class-invariant-who-checks — `friend` (back) — cut from the Card (back-only aside (friend is taught in class-friend-basics later))
- dropped: cpp-essentials/life-new-outlives-scope — `-fsanitize=address` in back — cut from the Card (tool name in the back; say "a memory checker reports it" or cut)
- dropped: cpp-essentials/life-temporary-full-expression — overloaded `peek(const Probe&)` vs two-argument form — drop second overload — cut/rewritten in the Card
- dropped: cpp-essentials/life-unique-ptr-owns-trace — "AddressSanitizer reports ... leaked" (back) — cut from the Card (tool name in the back; say "a memory checker reports it" or cut)
- dropped: cpp-essentials/vc-trace-extended-temporary — 4 probes (limit 3) and 3 lifetime ideas (full-expression, extension, inner scope) — drop `inner` block and probe @4 — cut/rewritten in the Card
- dropped: cpp-essentials/virtual-pure-syntax — `virtual ~Shape() = default;` unexplained — delete from snippet or REQUIRE cpp-essentials/virtual-delete-through-base — cut/rewritten in the Card
- dropped: cpp-essentials/tmpl-instantiation-statics — 5 probes (limit 3) and 3 template instantiations — cut to 3 calls, 2 probes — cut/rewritten in the Card
- dropped: cpp-essentials/stdalgo-erase-if — `std::erase`, member `v.erase` (back) — cut from the Card (back-only aside)
- dropped: cpp-essentials/conc-check-then-act — `compare_exchange_strong` (back) — cut from the Card (back-only forward reference (atomics-compare-exchange-failure teaches it))
- dropped: cpp-essentials/conc-join-waits-trace — ThreadSanitizer (back) — cut from the Card (tool name in the back; say "a memory checker reports it" or cut)
- dropped: cpp-essentials/conc-lock-the-counter — "guard refuses a temporary" and "declares a new guard called m" (back) — cut from the Card (back-only asides)
- dropped: cpp-essentials/conc-thread-argument-by-reference — `std::cref` (back) — cut from the Card (back-only aside)
- dropped: cpp-essentials/layout-alignas-sizeof — `[dcl.align]`, "GCC 16 accepts it" — drop (trivia) — cut/rewritten in the Card
- dropped: cpp-essentials/linkage-odr-class-repeat — "variables and templates" — cut or REQUIRE cpp-essentials/templates-instantiation (not yet met) — cut/rewritten in the Card
- dropped: cpp-essentials/virtual-final — `constexpr virtual`, `#include <type_traits>` — noise from the harness — cut/rewritten in the Card
- dropped: cpp-essentials/virtual-final — `constexpr virtual`, `#include <type_traits>` — hide or DEFINE — cut/rewritten in the Card
- dropped: cpp-essentials/lambda-mutable — `static`/`constexpr`/`noexcept` lambda specifiers in the back — cut (extraneous) — cut/rewritten in the Card
- dropped: cpp-essentials/lambda-store-std-function — `decltype` — cut — cut/rewritten in the Card
- dropped: cpp-essentials/move-semantics-forwarding-reference — `auto&&`, `const T&&`, `std::vector<T>&&` — cut from the back — cut/rewritten in the Card
- dropped: cpp-essentials/move-semantics-noexcept-move — `P1286R2`, "conditional spellings" — cut — cut/rewritten in the Card
- dropped: cpp-essentials/operators-hidden-friend-symmetric — explicit object parameter `this Rational l` and `static` in the back — cut (C++23 trivia) — cut/rewritten in the Card
- dropped: cpp-essentials/operators-hidden-friend-symmetric — `std::complex` — cut from the Card (back-only aside)
- dropped: cpp-essentials/strings-string-view-dangling — "a compile error in this constant-evaluated harness" — cut (harness leakage) — cut/rewritten in the Card
- dropped: cpp-essentials/strings-string-view-parameter — requires value-categories-temporary-materialization is spurious — replace with cpp-essentials/life-temporary-full-expression — cut/rewritten in the Card
- dropped: cpp-essentials/exceptions-commit-by-swap — requires move-semantics-noexcept-move is not a direct prerequisite; drops 16 cards into the closure — remove from requires — cut/rewritten in the Card
- dropped: cpp-essentials/trace-temporaries-in-range-for — P2718, C++23 extension in the back — cut — cut/rewritten in the Card
- dropped: cpp-essentials/atomics-synchronizes-with — "release sequence", "sequenced" — cut or DEFINE — cut/rewritten in the Card
- dropped: cpp-essentials/atomics-trace-relaxed-counter — Two threads × 1000 iterations and a formula answer (2000, then 2005) — rewrite as a basic or shrink to 2 iterations — cut/rewritten in the Card
- dropped: cpp-essentials/threads-scoped-lock-two-mutexes — `std::lock`'s algorithm — cut — cut/rewritten in the Card
- dropped: interview-essentials/heap-min-comparator — `std::priority_queue<int, std::vector<int>, std::greater<>>` — cut from the Card (back-only aside (std-priority-queue-api teaches it))
- dropped: interview-essentials/heap-push-trace — comma declaration `int s = ..., at = ...;` — extraneous machinery — cut/rewritten in the Card
- dropped: interview-essentials/sort-merge-space — `std::inplace_merge` — cut from the Card (back-only aside)
- dropped: interview-essentials/sort-merge-stable-code — extraneous machinery: `bool operator==(const Rec&) const = default;` (harness leak) — hide in harness or MOVE cpp-basics/class-compare-defaulted-short — cut/rewritten in the Card
- dropped: interview-essentials/sort-quick-worst — hidden helper `lomuto(...)` that bumps `cmp` — cut from the Card (hidden helper; the rebuild converted this Card to a basic)
- dropped: interview-essentials/graph-bfs-distance-code — `std::array<int,6> dist{-1,...}, queue{s};` named `queue`, rows padded with -1 (`v != -1`), `for (int head=0, tail=1; head<tail;)` — extraneous machin — cut/rewritten in the Card
- dropped: interview-essentials/graph-dfs-call-stack-trace — `path += char('0' + u)`, `path.pop_back()`, probes inside empty `if (u == 4) {}` — extraneous machinery — cut/rewritten in the Card
- dropped: interview-essentials/graph-kahn-trace — global state mutated by `step()` — extraneous machinery — cut/rewritten in the Card
- dropped: interview-essentials/technique-fast-power — `int& calls` output reference parameter (instrumentation leaks into real code) — drop the counter — cut/rewritten in the Card
- dropped: interview-essentials/technique-recursion-unwind — global `out` and `calls` — extraneous machinery — cut/rewritten in the Card
- dropped: interview-essentials/hash-unordered-map-is-chained — `absl::flat_hash_map`, `boost::unordered_flat_map`, bucket interface, 'conforming' — cut from the Card (back-only aside)
- dropped: interview-essentials/ll-hardware-numbers — AArch64, Apple M-series — cut from the Card (back-only aside)
- dropped: interview-essentials/trap-linked-list-insertion — 'vectorisable' (SIMD) — cut from the Card (back-only aside)
