# Consolidated edits: leetcode-hft

Per Card staying in the essentials Decks (moved-in Cards included under the batch of their origin). Ids are qualified. `add requires` lists direct prerequisites only, after removing those already reachable; overflow past fan-in 3 became a `define`.

## interview-essentials/arr-3sum-frame-parsons
- add requires: cpp-essentials/types-mixed-sign-compare
- define: "`if` with an init-statement" for `if (int s = ...; cond) ... else if`
- define: "`<bits/stdc++.h>` is a GCC header that includes the whole standard library" for `<bits/stdc++.h>`
- define: "`std::ranges::sort(a)` sorts the whole container a" for `std::ranges::sort`
- define: "`std::size_t lo = 0, hi = n - 1;` declares two variables of the same type" for two declarators in one line (`std::size_t lo = ..., hi = ...`)

## interview-essentials/arr-3sum-outer-skip-code
- add requires: cpp-essentials/tmpl-auto-param-cloze, cpp-essentials/vector-of-vectors
- define: "`using A = B;` gives the type B a second name A" for `using VV = ...`

## interview-essentials/arr-diff-code
- add requires: cpp-essentials/vector-sized-constructor, cpp-essentials/iter-range-for-alias
- define: "builds a vector from `[begin, end-1)`" for `return {d.begin(), d.end() - 1}` iterator-range construction

## interview-essentials/arr-intervals-merge-chunk
- add requires: cpp-essentials/vector-of-vectors, interview-essentials/complexity-big-o-scaling
- define: "vectors compare lexicographically, so it sorts by start" for `std::ranges::sort(iv)` on vectors
- define: "`[a,b]` and `[c,d]` overlap when `c <= b`" for "overlap" of intervals
- define: "`std::max(a, b)` / `std::min(a, b)` return the larger / smaller of two values" for `std::max`

## interview-essentials/arr-kadane-all-negative
- define: "smallest `int`" for `INT_MIN`
- define: "contiguous run (and 'empty subarray')" for "subarray"

## interview-essentials/arr-kadane-chunk
- define: "`INT_MIN`/`INT_MAX` (from `<climits>`) are the smallest and largest `int`, −2³¹ and 2³¹ − 1" for `INT_MIN`
- define: "a contiguous subarray is a run of adjacent elements" for "contiguous subarray"

## interview-essentials/arr-prefix-hash-parsons
- add requires: cpp-essentials/iter-map-subscript-inserts, cpp-essentials/tmpl-auto-param-cloze
- split / reshape: combines prefix sums, counting map, and `p - k` ordering (3 ideas)

## interview-essentials/arr-prefix-hash-signal
- add requires: interview-essentials/hashing-direct-address-limit, interview-essentials/arr-window-signal

## interview-essentials/arr-window-trace
- define: "first three counts 1, rest 0" for `int need[26]{1, 1, 1}` array init
- define: "`x++` yields x's old value then adds 1; `++x` adds 1 and yields the new value" for `need[s[hi] - 'a']-- > 0`, `++need[...] > 0` (increment/decrement used inside an expression)
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: combines 4 ideas (need-counts, `missing`, shrink-while, record-before-shrink)

## interview-essentials/arr-window-variable-chunk
- add requires: cpp-essentials/initialization-default-value-zero, cpp-essentials/types-char-is-integer
- define: "`x++` yields x's old value then adds 1; `++x` adds 1 and yields the new value" for `cnt[s[hi]]` char as an index; `cnt[s[lo++]]` post-increment in an index
- define: "mixing a signed int with an unsigned one converts the signed value to unsigned, so −1 becomes huge" for `int(s.size())`

## interview-essentials/bit-mask-enumerate-code
- add requires: interview-essentials/bits-mask-as-set
- define: "mixing a signed int with an unsigned one converts the signed value to unsigned, so −1 becomes huge" for `a.size()` into `int n`

## interview-essentials/bit-precedence-trap
- define: "compiler warning flag" for `-Wparentheses` / `-Wall`

## interview-essentials/bit-xor-single-signal
- add requires: interview-essentials/foundations-bitwise-operators, interview-essentials/complexity-space-stack-depth
- define: "combine every element into one accumulator" for "one-pass fold"

## interview-essentials/book-match-cross
- add requires: interview-essentials/book-order-book-vocabulary, cpp-essentials/structured-bindings-basics
- define: "`qty[t]` is the quantity resting at price tick t; `std::min` takes the smaller of two values" for `std::array<long, 8>` indexed by tick, `std::min`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: combines domain terms, structured binding, nested loop with sentinel (3+ ideas)

## interview-essentials/bs-first-true-chunk
- add requires: cpp-essentials/stdalgo-lambda-syntax, interview-essentials/search-midpoint-overflow
- define: "round up" for `⌈p / v⌉`

## interview-essentials/bt-combination-start-index
- add requires: cpp-essentials/types-using-alias
- define: "combination: a choice of items where order does not matter; permutation: an ordering" for "combination" (order ignored) vs "permutation"

## interview-essentials/bt-permutations-parsons
- add requires: cpp-essentials/vector-sized-constructor

## interview-essentials/bt-subsets-chunk
- add requires: cpp-essentials/tmpl-auto-param-cloze

## interview-essentials/bucket-refill
- define: "the apostrophes in `1'000'000` only make the number readable" for fixed-point "nano-tokens" (`kToken`, `1'000'000'000` digit separators)
- define: "`std::int64_t` is an exactly-64-bit signed int; `std::min(x, cap)` clamps x to at most cap" for `std::int64_t`, `std::min` clamp
- define: "a clock that never goes backwards, in nanoseconds" for "monotonic ns" clock
- split / reshape: combines token bucket, fixed-point credit, clamp + `last` update (3 ideas)

## interview-essentials/dp-coin-ways-chunk
- add requires: cpp-essentials/vector-sized-constructor, cpp-essentials/types-overflow-rules

## interview-essentials/dp-edit-distance-code
- add requires: cpp-essentials/types-mixed-sign-compare
- define: "CTAD infers `vector<vector<int>>`" for `std::vector d(a.size() + 1, std::vector<int>(...))` (no template args)
- define: "min of a braced list" for `std::min({x, y, z})`
- define: "`<bits/stdc++.h>` is a GCC header that includes the whole standard library" for `<bits/stdc++.h>`

## interview-essentials/dp-grid-dag-signal
- add requires: interview-essentials/graph-topo-order
- define: "DAG = directed graph without cycles" for "DAG", "topological order"
- split / reshape: cut the Dijkstra clause (the audit's alternative): a DP recognition Card should not wait on Dijkstra

## interview-essentials/dp-grid-paths-chunk
- add requires: cpp-essentials/vector-sized-constructor

## interview-essentials/dp-lis-patience-parsons
- add requires: interview-essentials/dp-lis-quadratic
- define: "subsequence: elements kept in order but not necessarily adjacent; substring: adjacent" for "subsequence" vs substring
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: combines patience tails, binary search, strictness (3+ ideas)

## interview-essentials/dp-memo-robber-code
- define: "the `calls` counter exists only for the harness" for `calls` instrumentation counter
- define: "`<bits/stdc++.h>` is a GCC header that includes the whole standard library" for `<bits/stdc++.h>`

## interview-essentials/dp-min-path-sum-code
- add requires: cpp-essentials/types-mixed-sign-compare
- define: "`INT_MIN`/`INT_MAX` (from `<climits>`) are the smallest and largest `int`, −2³¹ and 2³¹ − 1" for `INT_MAX` sentinel
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: padded rolling row with `d[j]` meaning column `j-1` — combines rolling row, sentinel padding, INT_MAX wall (3 ideas)

## interview-essentials/dp-word-break-code
- add requires: cpp-essentials/vector-sized-constructor
- define: "true if the string ends with `w`" for `s.substr(0, i).ends_with(w)`
- define: "mixing a signed int with an unsigned one converts the signed value to unsigned, so −1 becomes huge" for `dp[i - w.size()]` unsigned arithmetic
- define: "`std::string_view` is a non-owning view of characters: a pointer plus a length" for `std::string_view`

## interview-essentials/gr-dijkstra-heap-parsons
- define: "`dist[s] = 0` yields the assigned value, so `{dist[s] = 0, s}` is the pair {0, s}" for `pq.push({dist[s] = 0, s})` assignment inside an expression
- define: "replace `dist[v]` if the path through `u` is shorter" for "relax"
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: combines lazy deletion, heap of pairs, relax, stale-skip (4 ideas)

## interview-essentials/gr-grid-dfs-code
- add requires: interview-essentials/graph-grid-as-graph, cpp-essentials/types-char-is-integer
- define: "`std::vector<std::vector<int>> g(n)` is n empty rows; `g[i][j]` is row i, column j" for `vector<vector<char>>`
- define: "an `auto` parameter makes the function a template: each argument type gets its own copy of the function" for `auto& g`

## interview-essentials/gr-grid-dfs-depth
- define: "each call pushes a frame holding its locals and return address" for "main-thread stack is typically 8 MB", "frame", "return address"

## interview-essentials/gr-kahn-build-code
- add requires: cpp-essentials/types-using-alias

## interview-essentials/gr-kahn-chunk
- add requires: cpp-essentials/expr-increment-value, cpp-essentials/tmpl-auto-param-cloze
- define: "`order` is both the output and the queue: index h walks it while new vertices are appended" for `order` doubling as the queue (index `h` walking a growing vector)
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: combines Kahn's rule, output-as-queue, decrement-and-test (3 ideas)

## interview-essentials/gr-multi-source-bfs-code
- add requires: interview-essentials/graph-grid-as-graph, cpp-essentials/types-using-alias
- define: "`d.fill(-1)` sets every element; cell (r, c) of the 3x3 grid has id 3r + c; `nbrs[i]` lists i's neighbours" for `std::array<int, 9>`, `d.fill(-1)`, flattened 3x3 row-major, `nbrs` table
- define: "virtual source: start BFS with every source in the queue at distance 0, as if one extra vertex pointed at them all" for "virtual source"
- define: "an `auto` parameter makes the function a template: each argument type gets its own copy of the function" for `auto` params, `constexpr`, `using Grid`

## interview-essentials/list-fast-slow-parsons
- add requires: cpp-essentials/tmpl-function-syntax
- define: "`a && b` evaluates b only when a is true" for `&&` short-circuits left to right
- define: "a node's `next` leads back to an earlier node" for "cycle" in a list

## interview-essentials/list-reverse-parsons
- add requires: cpp-essentials/tmpl-function-syntax
- define: "`->`" for `->`, `Node*`, `nullptr`

## interview-essentials/lru-std-list-allocates
- define: "hot path: the code that runs on every request; rehash: rebuild the table with more buckets, moving every element" for "hot path", "rehash"
- define: "the map stores, for each key, an iterator to its node in the list, so it can find and move it in O(1)" for stored iterator in a map (`index[k] = order.begin()`)

## interview-essentials/lru-touch
- define: "`n[i]` and `p[i]` hold the next and previous slot of slot i: indices standing in for pointers" for parallel arrays `n`, `p` as pointers (indices instead of pointers)
- split / reshape: overload flag: combines index-linked list, sentinel, ordering of four assignments (3 ideas) (no prerequisite fixes it; consider splitting)

## interview-essentials/mono-histogram-trace
- add requires: cpp-essentials/vector-sized-constructor
- trace: WORKED FIRST: done in the trace rebuild (6 bars, ~15 state changes → 4 bars, 2 probes; new mono-histogram-worked (v2)); this covers the audit concern(s): combines monotone stack, width formula, sentinel 0, `>=` pops equals (4 ideas)

## interview-essentials/mono-next-greater-chunk
- add requires: cpp-essentials/vector-back-pop-back

## interview-essentials/mono-stack-signal
- add requires: interview-essentials/linear-deque-both-ends

## interview-essentials/rec-dp-cell-vs-mask
- remove requires: interview-essentials/dp-bitmask-signal
- split / reshape: overruled TOO ADVANCED, keep: the recognition skill (when position alone is not enough state) is core DP; reshape part (b) to a non-mask goal-dependent state (House Robber: took previous or not) and drop the edge to dp-bitmask-signal.

## interview-essentials/rec-explain-dp
- split / reshape: overruled TOO ADVANCED, keep: the DP-formulation capstone is a staple; replace rubric item (5) (bitmask/TSP) with a 1-D or grid formulation; item (3) gets the new dp-lis-quadratic.

## interview-essentials/rec-explain-graphs
- define: "a grid is a graph: each cell is a vertex joined to its in-bounds up/down/left/right neighbours" for (1) word ladder = BFS over words as an implicit graph
- split / reshape: overruled TOO ADVANCED, keep: graph-algorithm choice is a staple; replace rubric item (2) (0-1 BFS) with plain BFS-vs-Dijkstra on weights.

## interview-essentials/rec-intervals-greedy-vs-dp
- add requires: interview-essentials/technique-activity-selection
- remove requires: interview-essentials/technique-exchange-argument
- define: "pick non-overlapping jobs maximising profit (answer follows from technique-exchange-argument)" for "weighted interval scheduling" is not taught
- define: "exchange argument: swapping an optimal answer's first pick for the greedy pick never makes it worse" for exchange argument

## interview-essentials/rec-list-vs-count
- add requires: interview-essentials/complexity-feasible-n
- define: "polynomial: cost like n² or n³; exponential output: the number of answers itself grows like 2ⁿ" for "polynomial in n" vs exponential output size

## interview-essentials/rec-one-vs-two-sequences
- define: "subsequence: elements kept in order but not necessarily adjacent; substring: adjacent" for "subsequence"

## interview-essentials/rec-shortest-path-weights
- add requires: interview-essentials/linear-deque-both-ends
- define: "a grid is a graph: each cell is a vertex joined to its in-bounds up/down/left/right neighbours" for (a) 8-neighbour grid BFS
- split / reshape: overruled TOO ADVANCED, keep: weights decide BFS vs Dijkstra, a staple; drop part (b) (0-1 BFS).

## interview-essentials/rec-top-k-choice
- add requires: interview-essentials/hashing-direct-address-limit
- define: "design a class': the problem asks for an object whose methods are called many times (add, then query)" for "design a class" streaming interface

## interview-essentials/rec-union-find-vs-dfs
- add requires: interview-essentials/graph-adjacency-list-vs-matrix
- define: "an extra edge closes exactly one cycle" for "tree with one extra edge"

## interview-essentials/stl-accumulate-overflow
- add requires: cpp-essentials/types-overflow-rules, cpp-essentials/const-ref-parameter
- define: "`LL` makes the literal a 64-bit `long long`" for `0LL` literal suffix / `long` is 32 or 64 bit
- define: "signed size of a container" for `std::ssize`

## interview-essentials/stl-binding-auto-copies
- add requires: cpp-essentials/structured-bindings-basics
- define: "sorts the whole range" for `std::ranges::sort`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: combines 3 new ideas (structured binding, map element = pair, auto-copy trap)

## interview-essentials/stl-equal-range-count
- add requires: cpp-essentials/structured-bindings-basics
- define: "returns the half-open `[lo, hi)` of elements equal to `t`" for `std::equal_range`

## interview-essentials/stl-int-min-traps
- define: "smallest/largest `int`, -2147483648 / 2147483647" for `INT_MIN`/`INT_MAX` from `<climits>`
- define: "`/` and `%` on negative ints truncate toward zero: −7 / 10 == 0 and −7 % 10 == −7" for `x % 10` and `x /= 10` truncate toward zero, remainder keeps the sign

## interview-essentials/stl-iota-argsort
- add requires: interview-essentials/heap-min-comparator
- remove requires: cpp-essentials/ranges-sort-projection
- define: "fills 0, 1, 2, ..." for `std::iota`
- define: "argsort: sort the positions 0..n−1 by their values, leaving the values where they are" for argsort (sort indices by a key)
- define: "the third argument of `std::ranges::sort` (a projection) maps each element to the key that is compared" for projection

## interview-essentials/stl-letter-count-chunk
- add requires: cpp-essentials/types-char-is-integer, cpp-essentials/tmpl-auto-param-cloze
- define: "fixed-size array object that supports `==`" for `std::array<int, 26>` and `==` on arrays

## interview-essentials/stl-map-subscript-probe
- define: "true if the key exists, never inserts" for `unordered_map::contains`
- define: "`template <class Map = ...>` only lets the checker substitute another map type; read Map as `std::unordered_map<int, int>`" for default template argument
- define: "`return {a, b};` builds the return value (here a two-element vector) from the list" for `return {seen[need], i}` brace-return of a vector

## interview-essentials/stl-multiset-erase-one
- add requires: interview-essentials/std-set-multiset, cpp-essentials/iter-end-one-past
- define: "median of every window of k values" for sliding-window-median context

## interview-essentials/stl-pq-lambda-comparator
- add requires: cpp-essentials/pair-basics
- define: "`inline constexpr auto cmp = ...` is a compile-time constant named cmp" for `inline constexpr`
- define: "each entry pairs a value with how often it occurs" for frequency counts as `(value, count)` pairs
- define: "a lambda is an object of a unique unnamed class whose `operator()` is the body" for `decltype(cmp)` / lambda type

## interview-essentials/stl-pq-min-heap-type
- add requires: interview-essentials/std-priority-queue-api, cpp-essentials/types-mixed-sign-compare
- define: "`using A = B;` gives the type B a second name A" for `using KeepK = ...` alias

## interview-essentials/stl-substr-quadratic
- add requires: interview-essentials/complexity-count-loop-steps
- define: "`substr` copies; `find` returns `npos` if absent" for cost of `substr` (copies) and `std::string::find`/`npos`
- define: "`push_back` that builds the element in place" for `emplace_back`
- define: "loop forever until `return`" for `for (;;)`

## interview-essentials/stl-vector-paren-brace
- add requires: cpp-essentials/vector-of-vectors, cpp-essentials/constexpr-fn-static-assert

## interview-essentials/tree-inorder-iterative-parsons
- add requires: interview-essentials/std-queue-stack-adaptors, interview-essentials/linear-list-node
- define: "after the base case returns, each pending call finishes its remaining work, innermost first" for stack mirrors recursion frames
- define: "an `auto` parameter makes the function a template: each argument type gets its own copy of the function" for `auto st` parameter

## interview-essentials/tree-lca-bst
- define: "any node on the path up to the root" for "ancestor"

## interview-essentials/tree-lca-chunk
- add requires: interview-essentials/linear-list-node, cpp-essentials/expr-conditional-operator
- define: "`->`" for `Node*`, `->`, null test
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: combines hit-returns-immediately, both-sides rule, pass-up rule (3 ideas)

## interview-essentials/tree-validate-int-limits
- add requires: cpp-essentials/types-overflow-rules, interview-essentials/linear-list-node
- define: "parameters with defaults" for `int lo = INT_MIN` default arguments

## interview-essentials/trivia-exceptions-cost
- add requires: interview-essentials/foundations-latency-scale, cpp-essentials/err-pick-a-channel
- define: "unwind tables are compiler-written lookup data used to find handlers" for "Itanium ABI", "unwind tables", "happy path"

## interview-essentials/trivia-volatile-not-atomic
- add requires: cpp-essentials/conc-atomic-or-mutex
- define: "tells the compiler not to elide accesses; nothing more" for `volatile`
- define: "memory-mapped I/O: device registers that look like memory; reads and writes must really happen" for "memory-mapped I/O and signal handlers"
- define: "any function that reads the feed" for `poll_feed()`

## interview-essentials/uptr-array-specialisation
- define: "the deleter is the callable that frees the pointer" for `std::default_delete`, `unique_ptr<T[]>`
- define: "a struct" for `Tick` is an undefined type in the front

## interview-essentials/vec-reserve-in-loop
- add requires: interview-essentials/linear-dynamic-array-growth, interview-essentials/complexity-count-loop-steps
- define: "the three major standard-library implementations" for "libstdc++, libc++, MSVC"
- define: "`Order` is any small struct; `book` is a `std::vector<Order>`" for `Order` type and `book` vector

## interview-essentials/vec-three-pointers
- add requires: cpp-essentials/layout-padding-sizeof, cpp-essentials/iter-end-one-past
- define: "x86-64: the usual 64-bit PC/server CPU; libstdc++: GCC's standard library" for "x86-64", "libstdc++"

## interview-essentials/vec-zero-capacity-growth
- add requires: interview-essentials/linear-dynamic-array-growth, cpp-essentials/expr-conditional-operator
- define: "allocating 0 slots is a bug the compile-time harness rejects" for `allocate(0)`/"constant evaluation rejects"
- define: "mixing a signed int with an unsigned one converts the signed value to unsigned, so −1 becomes huge" for `std::size_t`


## Applied (interview-essentials/topics/leetcode, interview-essentials/topics/hft)

New foundation Cards (leetcode/00-stl, rung 1): `stl-size-t-unsigned`, `stl-bits-stdcpp-header`, `stl-min-max`, `stl-int-limits` — they replace the repeated `size_t` / `<bits/stdc++.h>` / `std::min` / `INT_MIN` defines below. New mixed-recognition Cards (12-recognition): `rec-sorted-pair-cue`, `rec-prereq-order-cue` (from the split explains). Every `add requires` was applied, then edges made redundant by the new graph were removed (transitive reduction; explain and mixed-recognition edges to their named cards kept).

- arr-3sum-frame-parsons: changed-from-plan: `types-mixed-sign-compare` → `stl-size-t-unsigned` + `stl-bits-stdcpp-header`; define `ranges::sort`; if-init and two declarators are Go baseline.
- arr-3sum-outer-skip-code: done (`using` define); two statements merged onto one line to fit 10 lines.
- arr-diff-code: done; `<bits/stdc++.h>` → `<vector>`.
- arr-intervals-merge-chunk: changed-from-plan: chunk has no front, so `stl-min-max` + `vector-back-pop-back` required instead of defines; expose_ms fixed.
- arr-kadane-all-negative: done (subarray define); bold shortened.
- arr-kadane-chunk: changed-from-plan: chunk, so `stl-int-limits` + `stl-min-max` required instead of defines.
- arr-prefix-hash-parsons: done; no split (the three ideas are the idiom's lines; distractors test two).
- arr-prefix-hash-signal: done; pattern tags removed.
- arr-window-trace: changed-from-plan: rebuilt (v3) within §3.1: no `x++`-in-expression, starts at the valid window, 7 changes, 4 values; no define needed.
- arr-window-min-worked: reshaped to §3.1(a), table on the front (v2).
- arr-window-variable-chunk: changed-from-plan: chunk, so `expr-increment-value` + `stl-min-max` required; `initialization-default-value-zero` dropped (fan-in 4; Go zero-values arrays, the back explains `{}`).
- bit-mask-enumerate-code: done; + vector-basics, constexpr-fn-static-assert.
- bit-precedence-trap: changed-from-plan: no define (the flag is on the back); misconception premise added.
- bit-xor-single-signal: done; pattern tags removed.
- book-match-cross: changed-from-plan: rewritten without the struct and structured binding (fits 10 lines); requires book-order-book-vocabulary, iter-array-fixed-size, ptr-bump-by-reference; define `std::min`.
- bs-first-true-chunk: done (⌈⌉ is on the back; chunk has no front).
- bt-combination-start-index: done.
- bt-permutations-parsons: done.
- bt-subsets-chunk: done; body-only, comments removed, ≤ 7 lines (v2).
- bucket-refill: changed-from-plan: reshaped to integer ticks (no nano-tokens, no digit separators, no int64_t); requires class-struct-members, constexpr-fn-static-assert; define `std::min`.
- dp-coin-ways-chunk: done (sized-constructor edge then redundant, removed).
- dp-edit-distance-code: changed-from-plan: CTAD removed from the code; `stl-bits-stdcpp-header` + `stl-min-max` instead of mixed-sign; define `size_t`.
- dp-grid-dag-signal: done; Dijkstra clause cut; DAG taught by graph-topo-order; pattern tags removed.
- dp-grid-paths-chunk: done.
- dp-lis-patience-parsons: done; + stl-bits-stdcpp-header; no split.
- dp-memo-robber-code: changed-from-plan: `stl-bits-stdcpp-header` + `stl-min-max` required; `calls` already explained on the front.
- dp-min-path-sum-code: changed-from-plan: `stl-int-limits` + `stl-min-max` replace mixed-sign; define `<bits/stdc++.h>`; no split.
- dp-word-break-code: changed-from-plan: `<bits/stdc++.h>` → two headers; + stl-size-t-unsigned; one define for `string_view`/`ends_with`.
- gr-dijkstra-heap-parsons: done (assignment-in-expression define; "relax" is the back's target idea); no split.
- gr-grid-dfs-code: done (auto-parameter define).
- gr-grid-dfs-depth: changed-from-plan: two-question front merged into one; bold shortened.
- gr-kahn-build-code: done.
- gr-kahn-chunk: changed-from-plan: body-only, comments removed, ≤ 80 chars (v2); + stl-size-t-unsigned; no split.
- gr-multi-source-bfs-code: done; + iter-array-fixed-size; one define (auto parameter); the rest is in code comments.
- list-fast-slow-parsons: done (cycle define; `&&` short-circuit is Go baseline).
- list-reverse-parsons: changed-from-plan: no define needed (`->`, `nullptr` reached via linear-list-node).
- lru-std-list-allocates: changed-from-plan: "hot path"/"rehash" reworded away; stored iterator taught by trace-lru-order.
- lru-touch: done; + iter-array-fixed-size; no split (reported).
- mono-histogram-trace: rebuilt (v3) within §3.1: 8 changes, 3 values, probes ≤ 2 values; vector-sized-constructor replaced by expr-conditional-operator + stl-min-max.
- mono-histogram-worked: reshaped to §3.1(a), table on the front (v2).
- mono-next-greater-chunk / mono-stack-signal: done; pattern tags removed from the signal.
- rec-dp-cell-vs-mask: reshaped (v2): (b) is now a stock with fee, state (day, holding) — House Robber was rejected because position alone *is* enough there.
- rec-explain-dp / rec-explain-graphs / rec-explain-windows: split (v2 each): each id is now a single-concept choosing capstone (DP state choice; shortest-path choice; sliding window). Dropped items map to existing Cards (dp-edit-distance-signal, rec-list-vs-count, dp-lis-quadratic, dp-grid-dag-signal, rec-shortest-path-weights, rec-union-find-vs-dfs, arr-prefix-hash-signal, linear-prefix-sum-range) or to the two new mixed Cards; TSP and 0-1 BFS dropped.
- rec-intervals-greedy-vs-dp: changed-from-plan: "exchange argument" removed from the bold instead of defined; pattern tags removed.
- rec-list-vs-count: done. rec-one-vs-two-sequences: done (subsequence taught by dp-lis-quadratic).
- rec-shortest-path-weights: done (v2, 0-1 BFS dropped); changed-from-plan: linear-deque-both-ends not added, since the deque statement is gone.
- rec-top-k-choice / rec-union-find-vs-dfs: done; pattern tags removed.
- stl-accumulate-overflow: changed-from-plan: returns the sum, so no `std::ssize`; define `LL`.
- stl-binding-auto-copies: done; + containers-map-vs-unordered-map; misconception premise.
- stl-equal-range-count: changed-from-plan: equal_range defined without "half-open" (that is the answer); returns `vector<long>`, no casts.
- stl-int-min-traps: done (INT_MIN/MAX define; truncation stays on the back).
- stl-iota-argsort: changed-from-plan: `iota` replaced by a loop; define projection; + stdalgo-capture-ref-vs-copy.
- stl-letter-count-chunk: changed-from-plan: + iter-array-fixed-size instead of a define (chunk).
- stl-map-subscript-probe: changed-from-plan: `contains` not defined on the front (it would give the answer); template define; misconception tag removed (code Card, no belief premise); fits 10 lines.
- stl-multiset-erase-one: done. stl-pq-lambda-comparator: done (`inline` dropped, decltype define). stl-pq-min-heap-type: changed-from-plan: types-using-alias required, define `size_t`.
- stl-substr-quadratic: done; `emplace_back` → `push_back`, `for (;;)` → `while (true)`, define `find`/`npos`; elaborate added.
- stl-vector-paren-brace: done.
- tree-inorder-iterative-parsons: done (one define covers the template). tree-lca-bst: skipped (no "ancestor" on the front). tree-lca-chunk: done; + tmpl-function-syntax. tree-validate-int-limits: done.
- trivia-exceptions-cost: changed-from-plan: jargon reworded off the front and back instead of defined.
- trivia-volatile-not-atomic: changed-from-plan: `volatile` not defined (target idea); poll_feed define; front reshaped to a misconception premise.
- uptr-array-specialisation: done (Tick define; premise added).
- vec-reserve-in-loop: done; + const-ref-parameter; library names reworded.
- vec-three-pointers: done; "x86-64" → "64-bit machine", libstdc++ defined.
- vec-zero-capacity-growth: done; define `size_t`; elaborate added. vec-reserve-contract: elaborate added.
