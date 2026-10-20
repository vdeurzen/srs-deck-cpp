# Consolidated edits: algo-systems

Per Card staying in the essentials Decks (moved-in Cards included under the batch of their origin). Ids are qualified. `add requires` lists direct prerequisites only, after removing those already reachable; overflow past fan-in 3 became a `define`.

## interview-essentials/complexity-amortised-single-call
- add requires: cpp-essentials/iter-explain-vector-growth

## interview-essentials/complexity-amortised-vs-average
- add requires: interview-essentials/complexity-asym-big-o-definition, cpp-essentials/containers-default-to-vector, interview-essentials/complexity-cost-cases
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas at once (amortised, average-case over a distribution, adversarial hashing); the hash-bucket aside should go or be its own Card

## interview-essentials/complexity-big-o-scaling
- add requires: interview-essentials/complexity-asym-log-rules

## interview-essentials/complexity-cost-arithmetic-sum
- add requires: cpp-essentials/constexpr-fn-static-assert
- remove requires: algo-basics/complexity-cost-trace-triangular

## interview-essentials/complexity-cost-cases
- remove requires: algo-basics/complexity-cost-trace-early-exit

## interview-essentials/complexity-cost-geometric-sum
- remove requires: algo-basics/complexity-cost-trace-doubling
- define: "`constexpr` lets the harness check `closed` at compile time" for constexpr

## interview-essentials/complexity-count-loop-steps
- define: "(n−1)+(n−2)+…+1 = n(n−1)/2" for n(n − 1)/2 pair count
- define: "each `// @N` probe asks for the variables' values when execution reaches that line" for `int main`, `const int n`, probe markers `// @1`

## interview-essentials/complexity-feasible-n
- add requires: interview-essentials/complexity-big-o-scaling
- define: "O(2ⁿ): cost doubles with every extra element" for 2ⁿ / exponential

## interview-essentials/complexity-halving-inner-loop
- add requires: interview-essentials/complexity-cost-geometric-sum
- trace: CONVERT: done in the trace rebuild (trace, two 64-element nests → basic: "is it n log n?" geometric sum, O(n) (v2)); this covers the audit concern(s): two independent loop nests = two runs (one trace should be one run)

## interview-essentials/complexity-log-halvings
- define: "integer division drops the fraction: 7 / 2 == 3" for integer division `n /= 2` drops the fraction
- define: "the apostrophes are only for reading" for digit separator `1'000'000`
- define: "⌊x⌋ rounds x down to a whole number" for ⌊log₂ n⌋

## interview-essentials/complexity-recursion-tree-calls
- add requires: interview-essentials/technique-recursion-sum-code
- define: "the global `calls` counter only counts how many times the function starts" for global `calls` counter / two calls on one line

## interview-essentials/complexity-shrink-by-one-vs-half
- add requires: interview-essentials/complexity-asym-theta-sandwich, interview-essentials/complexity-cost-arithmetic-sum
- define: "T(n) = T(n − 1) + n: the cost at size n is one call on n − 1 plus n steps of work" for T(n) = T(n − 1) + n recurrence notation
- define: "1 + 2 + 4 + … + n < 2n: a doubling series is under twice its last term" for n(n+1)/2 and n + n/2 + … < 2n sums
- trace: CONVERT: done in the trace rebuild (trace, two recursions with work counter → basic: why Θ(n²) vs Θ(n), n=4 example (v2)); this covers the audit concern(s): two runs in one trace

## interview-essentials/complexity-space-stack-depth
- add requires: cpp-essentials/expr-conditional-operator
- define: "std::max(a,b) is the larger" for `std::max` (no include shown)
- trace: CONVERT: done in the trace rebuild (trace with depth instrumentation → basic: stack space O(n) vs O(log n), plain code (v2)); this covers the audit concern(s): 3+ new ideas (space complexity, stack frames, depth counter instrumentation); two runs

## interview-essentials/db-lru-recency-bet
- define: "cache: a small store of recently used entries; hit = found there" for cache (software) and hit rate
- define: "temporal locality: recently used items are likely to be used again soon" for temporal locality, database buffer pool, table scan

## interview-essentials/foundations-bits-lowest-set-bit
- add requires: interview-essentials/foundations-bitwise-operators, cpp-essentials/types-overflow-rules

## interview-essentials/foundations-bits-trace
- define: "the apostrophes in `1'000'000` only make the number readable" for `0b0110'1000` binary literal and digit separator
- define: "`std::uint32_t` (from `<cstdint>`) is an exactly-32-bit unsigned int; `std::popcount(x)` (from `<bit>`) counts its 1 bits" for `std::uint32_t`, `<cstdint>`, `std::popcount`, `<bit>`
- define: "`x &= x - 1` means `x = x & (x - 1)`" for `x &= x - 1` compound assignment
- trace: SHRINK: done in the trace rebuild (4 probes → 3 (dropped popcount lookup probe) (v2)); this covers the audit concern(s): 4 probes (limit 3) and probe @4 reuses mutated `x` — shrink

## interview-essentials/foundations-cache-cost-model
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (cache line, locality, prefetch, pointer chasing)

## interview-essentials/foundations-growth-factor
- add requires: interview-essentials/complexity-asym-theta-sandwich, interview-essentials/linear-dynamic-array-growth

## interview-essentials/foundations-latency-scale
- add requires: interview-essentials/foundations-memory-hierarchy
- define: "x86-64 = the usual 64-bit PC/server CPU family" for x86-64
- split / reshape: cut the B-tree/red-black/open-addressing/chaining names from the back (forward references), or name them only as "pointer-chasing structures"

## interview-essentials/graph-adjacency-list-vs-matrix
- add requires: interview-essentials/graph-vertex-edge-sets, interview-essentials/complexity-big-o-scaling
- define: "sparse: E far below V²; dense: E close to V²; deg(u): the number of edges at u" for sparse / dense, deg(u), ≪
- define: "adjacency list: for each vertex, the list of its neighbours; adjacency matrix: a V×V table with a 1 where an edge exists" for adjacency list / matrix defined only by the diagram

## interview-essentials/graph-bellman-ford-rounds
- define: "relax (u,v,w): if dist[u]+w < dist[v], lower dist[v]; negative cycle: a cycle whose weights sum below 0" for relax, negative cycle
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (relaxation, round-k invariant, negative edges)

## interview-essentials/graph-bfs-distance-code
- add requires: cpp-essentials/iter-array-fixed-size, cpp-essentials/expr-increment-value
- define: "padding convention" for `std::array<int,6> dist{-1,...}, queue{s};` named `queue`, rows padded with -1 (`v != -1`), `for (int head=0, tail=1; head<tail;)`
- define: "an `auto` parameter makes the function a template: each argument type gets its own copy of the function" for `const auto&` parameter
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: `std::array<int,6> dist{-1,...}, queue{s};` named `queue`, rows padded with -1 (`v != -1`), `for (int head=0, tail=1; head<tail;)` — extraneous machinery
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (array queue, -1 padding, distance recurrence)

## interview-essentials/graph-bfs-mark-on-push
- add requires: cpp-essentials/expr-increment-value, interview-essentials/complexity-big-o-scaling
- define: "dense: E close to V²" for array queue `queue[tail++]`, `continue`, dense graph
- split / reshape: inconsistent with graph-bfs-queue-chunk (std::queue vs array queue) — pick one

## interview-essentials/graph-bfs-queue-chunk
- add requires: interview-essentials/std-queue-stack-adaptors, cpp-essentials/iter-range-for-alias
- define: "`seen[v]` marks vertices already queued; s is the source vertex" for `seen` array/vector<bool> and source `s` undefined
- define: "read the front, then pop it: `pop()` returns nothing" for `int u = q.front(); q.pop();`

## interview-essentials/graph-components-code
- add requires: interview-essentials/graph-path-cycle-component, cpp-essentials/iter-array-fixed-size

## interview-essentials/graph-cycle-directed-grey
- add requires: interview-essentials/graph-cycle-spot
- define: "white = not yet visited, grey = on the current DFS path, black = finished" for DFS colours white/grey/black

## interview-essentials/graph-dfs-call-stack-trace
- add requires: interview-essentials/technique-recursion-sum-code
- define: "`adj[u]` is the list of u's neighbours; the nested braces give each list" for `const std::vector<int> adj[5] = {{3,1},{0,2},...}` array of vectors with nested braces
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (recursion, string bookkeeping, array-of-vectors)
- trace: WORKED FIRST: done in the trace rebuild (within budget; now requires new graph-dfs-worked (version kept)); this covers the audit concern(s): `path += char('0' + u)`, `path.pop_back()`, probes inside empty `if (u == 4) {}` — extraneous machinery

## interview-essentials/graph-dfs-discovery-finish-trace
- add requires: interview-essentials/graph-directed-vs-undirected, interview-essentials/technique-recursion-sum-code
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (timestamps, nested intervals, outer restart loop)
- trace: WORKED FIRST: done in the trace rebuild (5 vertices, 2 runs, 10 numbers per probe → 4 vertices, one call, 2 values; requires graph-dfs-worked (v2)); this covers the audit concern(s): trace budget: 10 stamps across two 5-element arrays (limit ≤8 state changes, ≤2 values per probe)

## interview-essentials/graph-dijkstra-popped-final
- add requires: interview-essentials/graph-dijkstra-worked
- define: "a weighted graph gives every edge a number (its weight); a path costs the sum of its weights" for weighted graph / edge weight

## interview-essentials/graph-dijkstra-why-nonnegative
- define: "`s → u weight 1` is a directed edge from s to u of weight 1" for u weight 1`

## interview-essentials/graph-explain-visited-linear
- add requires: interview-essentials/graph-degree-from-edge-list

## interview-essentials/graph-kahn-trace
- add requires: interview-essentials/std-queue-stack-adaptors
- define: "`--indeg[v] == 0` decrements first, then tests the new value" for `--indeg[v] == 0` pre-decrement inside a condition
- define: "`std::to_string(n)` turns a number into text; `+=` appends it" for `std::to_string`, `order += ...`
- trace: WORKED FIRST: done in the trace rebuild (5 vertices, 3 probes of 5-number arrays → 4 vertices, 2 probes; new graph-kahn-worked (v2)); this covers the audit concern(s): global state mutated by `step()` — extraneous machinery

## interview-essentials/graph-list-from-edges-chunk
- add requires: interview-essentials/graph-edge-ordered-pair, cpp-essentials/structured-bindings-basics, cpp-essentials/containers-default-to-vector
- define: "n empty vectors" for `std::vector<std::vector<int>> adj(n)`
- define: "an `auto` parameter makes the function a template: each argument type gets its own copy of the function" for `const auto&` parameter
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (edge list vs adjacency list, vector-of-vectors, structured bindings, undirected double push)

## interview-essentials/graph-topo-order
- add requires: interview-essentials/graph-directed-vs-undirected, interview-essentials/graph-cycle-spot, interview-essentials/complexity-big-o-scaling

## interview-essentials/graph-union-find-forest
- add requires: interview-essentials/graph-union-find-problem, interview-essentials/tree-terms

## interview-essentials/graph-union-find-path-compression
- add requires: interview-essentials/technique-recursion-sum-code, cpp-essentials/iter-array-fixed-size
- define: "grows so slowly it is below 5 for any real n" for inverse Ackermann α(n)
- define: "union by rank: link the shorter tree under the root of the taller one" for union by rank
- define: "O(f(n)): the cost grows at most like f(n) as n grows, constants dropped" for O(...)/Θ/log notation

## interview-essentials/graph-union-find-union-code
- add requires: interview-essentials/sort-swap-temp, interview-essentials/complexity-big-o-scaling

## interview-essentials/hash-chaining-vs-open-addressing
- add requires: cpp-essentials/ptr-holds-an-address
- define: "K = key type, V = value type" for `Node{K key; V val; Node* next;}` with unspecified K, V
- define: "dependent load: a load whose address comes from the previous load, so they cannot overlap" for 'dependent load', allocator

## interview-essentials/hash-unordered-map-is-chained
- add requires: cpp-essentials/containers-stable-references, cpp-essentials/iter-map-subscript-inserts
- define: "rebuild with more buckets, moving elements" for rehash
- split / reshape: cut `absl::flat_hash_map`, `boost::unordered_flat_map`, bucket interface, 'conforming' (back-only aside)
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (standard's reference guarantee, node layout, rehash)

## interview-essentials/hashing-average-vs-worst
- add requires: interview-essentials/hashing-open-addressing
- define: "attacker picks keys that collide; a random seed makes that impractical" for hash flooding / seeded hash
- split / reshape: hash table, key, bucket, hash function never defined in its closure — fix once on hashing-chaining

## interview-essentials/hashing-chaining
- add requires: interview-essentials/hashing-direct-address, interview-essentials/hashing-pigeonhole

## interview-essentials/hashing-direct-address-limit
- add requires: interview-essentials/complexity-big-o-scaling
- define: "a hash table computes a small index from the key and keeps the entry in that slot" for hash table = 'computes a small index from the key'

## interview-essentials/hashing-load-factor
- add requires: cpp-essentials/containers-map-vs-unordered-map, interview-essentials/complexity-big-o-scaling

## interview-essentials/hashing-load-factor-limit
- define: "Google's C++ library; its hash table design" for Abseil / Swiss tables

## interview-essentials/hashing-probe-lookup-stop
- add requires: cpp-essentials/iter-array-fixed-size, cpp-essentials/const-ref-parameter
- define: "once for the Deck" for `#include <array>`

## interview-essentials/heap-child-index-code
- add requires: interview-essentials/tree-terms, cpp-essentials/constexpr-fn-static-assert
- define: "unsigned type used for sizes and indices" for `std::size_t`
- define: "`#include <cstddef>` provides `std::size_t`" for `#include <cstddef>`, `constexpr`

## interview-essentials/heap-heapify-order-code
- add requires: cpp-essentials/ub-unsigned-countdown-trace, cpp-essentials/expr-increment-value
- define: "unsigned type used for sizes and indices" for `std::size_t`
- define: "an `auto` parameter makes the function a template: each argument type gets its own copy of the function" for `const auto&` parameter
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (bottom-up order, countdown idiom, sift_down precondition)

## interview-essentials/heap-min-comparator
- add requires: cpp-essentials/stdalgo-comparator-strict, cpp-essentials/iter-end-one-past
- define: "rearranges a range into a heap ordered by comp" for `std::make_heap(first, last, comp)`
- define: "function object computing a > b" for `std::greater<>()`
- split / reshape: cut `std::priority_queue<int, std::vector<int>, std::greater<>>` (back-only aside (std-priority-queue-api teaches it))

## interview-essentials/heap-push-trace
- define: "sift up: swap with parent while larger" for sift-up never defined; `push(h, x)`/`index_of(h, x)` are hidden helpers
- split / reshape: comma declaration `int s = ..., at = ...;` — use two statements
- trace: WORKED FIRST: done in the trace rebuild (3 pushes with swap counter → one push, plain sift-up code shown; new heap-push-worked (v2)); this covers the audit concern(s): comma declaration `int s = ..., at = ...;` — extraneous machinery

## interview-essentials/heap-shape-and-order
- add requires: interview-essentials/tree-terms, interview-essentials/heap-pq-adt-trace

## interview-essentials/heap-sift-down-code
- add requires: interview-essentials/heap-pq-adt-trace, interview-essentials/sort-swap-temp
- define: "sift down: swap with a child until heap order holds" for sift down / pop never defined before use
- define: "the loop sets c = 2i + 1 (the left child) in its condition and steps i down to c after each pass" for assignment-in-condition `for`
- define: "unsigned type used for sizes and indices" for `std::size_t`
- define: "an `auto` parameter makes the function a template: each argument type gets its own copy of the function" for `const auto&` parameter
- define: "O(f(n)): the cost grows at most like f(n) as n grows, constants dropped" for O(...)/Θ/log notation
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (sift-down contract, child selection, odd loop shape)

## interview-essentials/heap-vs-bst
- add requires: interview-essentials/complexity-big-o-scaling

## interview-essentials/linear-array-index-contiguity
- add requires: interview-essentials/linear-address-formula, cpp-essentials/ptr-arrow-null-check, interview-essentials/complexity-big-o-scaling
- define: "list: nodes scattered in memory, each holding the address of the next" for linked list used as the contrast before linear-list-node teaches it
- define: "each load needs the previous one's result" for 'dependent loads'

## interview-essentials/linear-array-insert-shift
- add requires: cpp-essentials/containers-default-to-vector
- define: "a[5..7] is unused capacity" for array with spare room (`int a[8]` holding 5)
- define: "one bulk copy of a block of memory" for `memmove`
- trace: SHRINK: done in the trace rebuild (probe 2 had 3 values → 2 values (dropped n) (v2)); this covers the audit concern(s): two-line state change with `i`, `moved`, `n`, `a`: 4 variables to track

## interview-essentials/linear-cost-table
- add requires: cpp-essentials/containers-default-to-vector

## interview-essentials/linear-deque-both-ends
- add requires: interview-essentials/linear-sequence-containers
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (history-window requirement, three containers, block storage)

## interview-essentials/linear-doubly-unlink-code
- add requires: cpp-essentials/class-default-member-initialiser

## interview-essentials/linear-dynamic-array-growth
- add requires: interview-essentials/complexity-cost-geometric-sum
- define: "1 + 2 + … + n = n(n + 1)/2" for 10+20+30+…≈n²/20

## interview-essentials/linear-list-insert-misconception
- add requires: interview-essentials/linear-sequence-containers
- define: "std::next(it, k) advances an iterator k places; `end()` marks one past the last element; never dereference it" for `std::next(lst.begin(), 500)` / iterator

## interview-essentials/linear-list-traverse-chunk
- add requires: cpp-essentials/const-pointer-read-rule, cpp-essentials/constexpr-fn-static-assert

## interview-essentials/linear-prefix-sum-range
- add requires: interview-essentials/complexity-big-o-scaling
- define: "sum of the first i elements; p[0] is the empty sum 0" for prefix sum notation p[i] = a[0]+…+a[i−1]

## interview-essentials/linear-queue-ring
- add requires: interview-essentials/linear-queue-adt
- define: "`v.erase(v.begin())` removes the first element and shifts every other one down: O(n)" for `v.erase(v.begin())`

## interview-essentials/linear-ring-buffer-code
- add requires: cpp-essentials/class-struct-vs-class, cpp-essentials/constexpr-fn-static-assert
- define: "`c ? a : b` yields a when c is true, else b; `i % N` is the remainder, wrapping i into 0..N−1" for `cond ? 0 : x` ternary and `% N` wrap
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (struct with member functions, constexpr harness, modular wrap, head/tail protocol)

## interview-essentials/linear-stack-recognition
- add requires: interview-essentials/linear-stack-adt

## interview-essentials/linear-two-pointers-code
- add requires: cpp-essentials/vocab-span-parameter, cpp-essentials/types-static-cast-value
- define: "size() is unsigned" for `(int)a.size()` C-style cast

## interview-essentials/linear-two-pointers-sorted-pair
- add requires: interview-essentials/complexity-big-o-scaling
- define: "lo and hi are indices, called pointers" for 'pointers' lo/hi are array indices here

## interview-essentials/ll-false-sharing
- define: "`std::hardware_destructive_interference_size` is the library's name for the cache-line size (64 on x86-64)" for `std::hardware_destructive_interference_size`, ABI, adjacent-line prefetcher

## interview-essentials/ll-hardware-numbers
- add requires: interview-essentials/foundations-cache-line-ownership, cpp-essentials/layout-alignas-sizeof
- split / reshape: cut AArch64, Apple M-series (back-only aside)

## interview-essentials/ll-shared-counter-scaling
- add requires: cpp-essentials/atomics-trace-relaxed-counter, interview-essentials/foundations-cache-line-ownership

## interview-essentials/ll-spsc-ring
- add requires: cpp-essentials/atomics-compare-exchange-failure
- define: "SPSC: exactly one producer thread pushes and one consumer thread pops" for SPSC (single producer single consumer), 'writer'

## interview-essentials/search-binary-search-chunk
- add requires: interview-essentials/search-binary-search-halving
- define: "rounds down" for integer division `(hi − lo) / 2`
- define: "sits inside a function returning the index, or -1" for `return mid` / `-1` for 'absent' inside a snippet

## interview-essentials/search-binary-search-halving
- add requires: interview-essentials/complexity-big-o-scaling

## interview-essentials/search-first-true-predicate
- define: "a function that returns true or false" for predicate
- define: "given a range whose elements are true…true, false…false under p, returns the first false" for `std::partition_point`

## interview-essentials/search-half-open-invariant
- define: "[ includes, ) excludes the end index" for half-open notation `a[lo..hi)` / `[0, n)`

## interview-essentials/search-lower-bound-meaning
- add requires: cpp-essentials/iter-end-one-past
- define: "std::lower_bound returns an iterator; index is it − a.begin()" for returns an iterator, but the Card talks of 'index'

## interview-essentials/search-midpoint-overflow
- add requires: cpp-essentials/types-overflow-rules, cpp-essentials/constexpr-fn-static-assert
- define: "half-open [lo, hi): includes lo, excludes hi" for half-open `[lo, hi)`

## interview-essentials/search-on-answer-monotone
- add requires: cpp-essentials/fn-declaration-vs-definition

## interview-essentials/seq-invalidation-rules
- add requires: cpp-essentials/containers-map-vs-unordered-map
- define: "node-based containers (`std::list`, `std::map`) never move their elements, so references to them stay valid" for iterator, pointer, reference to an element, invalidation
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3 containers × 3 handle kinds in one cloze (3+ ideas)

## interview-essentials/seq-ring-buffer-full-vs-empty
- define: "mask: i & (N−1) equals i % N when N is a power of two" for 'masks them' (bit mask) used before seq-ring-buffer-mask teaches it
- define: "the counters only ever increase" for free-running 64-bit counters / 584 years

## interview-essentials/seq-ring-buffer-mask
- add requires: interview-essentials/foundations-bitwise-operators, cpp-essentials/ub-static-assert-finds-ub
- define: "integer division drops the fraction: 7 / 2 == 3" for LMAX Disruptor, 'tens of cycles of integer division'
- define: "`static_cast<double>(x)` converts x to double before the arithmetic" for `std::has_single_bit`, `<bit>`, `static_assert`, `inline constexpr`, `static_cast<std::size_t>`, `std::uint64_t`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (bitmask wrap, power-of-two invariant, free-running sequence)

## interview-essentials/seq-ring-waste-one-slot
- add requires: interview-essentials/linear-queue-ring, cpp-essentials/class-const-object-call

## interview-essentials/seq-vector-vs-deque
- add requires: cpp-essentials/iter-explain-vector-growth
- define: "node-based containers (`std::list`, `std::map`) never move their elements, so references to them stay valid" for vector reallocation moving elements

## interview-essentials/sort-compare-properties
- add requires: interview-essentials/sort-quick-worst
- define: "in place = O(1) extra space" for stable / in place / extra space vocabulary
- define: "recursion uses stack space proportional to its deepest chain of open calls" for quicksort, 'smaller side recursed first', call-stack space
- split / reshape: insertion sort covered only by elementary-compare; 5 sorts × 2 properties in one table — split per property (rule: list > 3 items)

## interview-essentials/sort-counting-idea
- add requires: interview-essentials/linear-prefix-sum-range
- remove requires: interview-essentials/sort-lower-bound
- define: "any sort that only compares elements needs Ω(n log n) comparisons in the worst case" for comparison-sort lower bound
- split / reshape: overruled TOO ADVANCED, not a TOO ADVANCED call on the Card itself: it only leaned on sort-lower-bound. Keep; drop that edge and DEFINE the Ω(n log n) fact.

## interview-essentials/sort-elementary-compare
- add requires: interview-essentials/complexity-big-o-scaling
- define: "the prefix a[0..i) is already sorted, the rest not yet; 999 + 998 + … + 1 = 1000·999/2 = 499 500" for sorted/unsorted prefix; 499 500 = 999+998+…+1

## interview-essentials/sort-lomuto-trace
- add requires: cpp-essentials/expr-increment-value, interview-essentials/complexity-big-o-scaling
- define: "`std::array a{4, 7, 1}` deduces both the element type and the length from the list" for `std::array a{4, 7, ...}` (deduced type)
- define: "unsigned type used for sizes and indices" for `std::size_t`
- trace: WORKED FIRST: done in the trace rebuild (6 elements, 5 iterations → 5 elements, 4 iterations, 2 probes; new sort-lomuto-worked (v2)); this covers the audit concern(s): trace budget: ~10 state changes over a 6-element array (>8)

## interview-essentials/sort-lomuto-worked
- add requires: interview-essentials/sort-quick-idea, interview-essentials/sort-swap-temp

## interview-essentials/sort-merge-idea
- add requires: interview-essentials/sort-merge-runs-trace, interview-essentials/complexity-asym-theta-sandwich
- define: "best/worst case: the minimum/maximum cost over all inputs of size n; an average needs a distribution of inputs" for Θ, best/average/worst

## interview-essentials/sort-merge-space
- split / reshape: cut `std::inplace_merge` (back-only aside)

## interview-essentials/sort-merge-stable-code
- add requires: cpp-essentials/iter-array-fixed-size
- define: "unsigned type used for sizes and indices" for `std::size_t`
- define: "`x++` yields x's old value then adds 1; `++x` adds 1 and yields the new value" for `out[k++]`
- define: "`c ? a : b` is an if that yields a value: a when c is true, else b" for ternary
- split / reshape: extraneous machinery: `bool operator==(const Rec&) const = default;` (harness leak) — hide in harness or MOVE cpp-basics/class-compare-defaulted-shortcut

## interview-essentials/sort-pivot-choice
- add requires: interview-essentials/complexity-cost-cases, interview-essentials/complexity-asym-theta-sandwich
- define: "median-of-three: the pivot is the median of the first, middle and last element; median-of-medians: a slower pivot choice that guarantees a balanced split (cut the McIlroy 1999 reference from the back)" for median-of-three, median-of-medians, McIlroy 1999

## interview-essentials/sort-quick-worst
- add requires: interview-essentials/technique-recursion-sum-code, cpp-essentials/ptr-reference-vs-pointer
- split / reshape: cut hidden helper `lomuto(...)` that bumps `cmp` (hidden helper; the rebuild converted this Card to a basic)
- trace: CONVERT: done in the trace rebuild (trace, 3 full quicksorts of 7 with counter → basic: sorted-input comparisons n(n−1)/2 (v2)); this covers the audit concern(s): trace budget: three 7-element runs with recursion (limit is one run, ≤8 state changes)

## interview-essentials/sort-quickselect-trace
- define: "worked example first (NEW: basic Card for quickselect idea)" for quickselect, k-th smallest 0-based
- trace: WORKED FIRST: done in the trace rebuild (7 elements, 3 values, calls counter → 5 elements, 2 values; new sort-quickselect-worked (v2)); this covers the audit concern(s): 3 runs of lomuto on 7 elements hidden in `lomuto(...)`; trace budget exceeded

## interview-essentials/sort-std-sort-vs-stable
- define: "each (introsort: 'quicksort that falls back to heap sort when recursion gets too deep'; libstdc++: 'GCC's standard library')" for introsort, in place, O(n log² n), libstdc++, ⌈n/2⌉ elements

## interview-essentials/sort-swap-temp
- add requires: cpp-essentials/iter-array-fixed-size

## interview-essentials/technique-activity-selection
- add requires: cpp-essentials/stdalgo-sort-by-length, cpp-essentials/iter-array-fixed-size
- define: "half-open [a, b): includes a, excludes b" for half-open intervals `[start, end)`
- define: "`for (T x : c)` runs the body once per element of c, with x initialised from that element" for range-for `for (T x : c)`
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 4+ new ideas at once (template, std::array, sort with lambda, greedy loop)

## interview-essentials/technique-backtracking-state-space
- define: "choose a subset of the items whose sum equals a target" for subset sum problem never stated

## interview-essentials/technique-backtracking-undo
- define: "an ordering of all the items" for permutation

## interview-essentials/technique-coin-change-table
- add requires: cpp-essentials/iter-range-for-alias
- define: "the apostrophes in `1'000'000` only make the number readable" for digit separator `1'000'000`
- define: "`std::max(a, b)` / `std::min(a, b)` return the larger / smaller of two values" for `std::min`
- define: "dp[a]: fewest coins that pay a" for coin-change problem and `dp` table
- define: "`std::array<int, 101> dp{}` starts with every element 0" for `std::array<int,101> dp{}` zero-initialised

## interview-essentials/technique-dp-overlapping-subproblems
- define: "memo: a table that caches each call's answer by its arguments, so a repeated call returns at once" for memo / memoisation
- define: "fib(n) = fib(n−1)+fib(n−2)" for fib(n)
- define: "exponential: the cost doubles (or worse) with each extra element, like 2ⁿ" for exponential

## interview-essentials/technique-dp-state
- add requires: cpp-essentials/iter-array-fixed-size
- define: "dp[i] is a table cell holding the answer to subproblem i, filled in increasing i" for dp table, recurrence, 'state' (no Card has introduced a table yet; memo-vs-table comes later)
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (state, recurrence, base cases)

## interview-essentials/technique-fast-power
- add requires: cpp-essentials/ptr-reference-vs-pointer, interview-essentials/technique-recursion-sum-code
- define: "T(n) = T(n − 1) + n: the cost at size n is one call on n − 1 plus n steps of work" for T(n) = T(n/2) + O(1) recurrence
- define: "`c ? a : b` yields a when c is true, else b" for `n % 2 ? a : b`
- split / reshape: `int& calls` output reference parameter (instrumentation leaks into real code) — drop the counter

## interview-essentials/technique-greedy-coins-counterexample
- add requires: cpp-essentials/ptr-array-name-to-pointer
- define: "greedy: always take the locally best choice" for greedy / canonical coin systems
- trace: SHRINK: done in the trace rebuild (two runs (US 63 + {4,3,1}) → one run on {4,3,1}; US case in prose (v2)); this covers the audit concern(s): two runs in one trace (limit one run)

## interview-essentials/technique-knapsack-direction
- define: "pick items, each at most once, total weight ≤ W, maximising total value" for 0/1 knapsack problem (weights, values, capacity W)
- define: "`std::max(a, b)` / `std::min(a, b)` return the larger / smaller of two values" for `std::max`

## interview-essentials/technique-lcs-match
- add requires: cpp-essentials/strings-string-view-parameter
- define: "row i, column j; all zero" for 2D array `int dp[16][16] = {}`
- define: "unsigned type used for sizes and indices" for `std::size_t`
- define: "`c ? a : b` yields a when c is true, else b; a chain tests conditions left to right" for ternary with the blank inside a chain
- split / reshape: 3+ new ideas (subsequence, 2D table, last-character case split)

## interview-essentials/technique-max-invariant-code
- add requires: interview-essentials/technique-loop-invariant-sum, cpp-essentials/vocab-span-parameter, cpp-essentials/types-static-cast-value
- define: "half-open [a, b): includes a, excludes b" for half-open `a[0..i)` notation

## interview-essentials/technique-max-start-element-code
- add requires: cpp-essentials/iter-end-one-past
- define: "the smallest int, −2³¹" for `std::numeric_limits<int>::min()`
- define: "identity element: the start value that leaves the result unchanged (0 for +, the smallest int for max)" for identity element

## interview-essentials/technique-memo-vs-table
- define: "top-down caches on demand; bottom-up fills in order" for memoised recursion vs bottom-up table
- define: "`long f[91] = {0, 1};` sets f[0] and f[1]; every other element starts at 0" for `long f[91] = {0, 1};` partial array initialisation

## interview-essentials/technique-recursion-depth
- add requires: cpp-essentials/ptr-holds-an-address
- define: "-O0: no optimisation; the crash is a stack overflow" for `-O0`, `ulimit -s`, stack overflow

## interview-essentials/technique-recursion-sum-code
- define: "`std::span<const int> a` is a read-only view of an int array: a pointer plus a length" for `std::span`

## interview-essentials/technique-recursion-unwind
- add requires: interview-essentials/technique-call-stack-trace
- define: "turns a digit into its character" for `out += char('0' + n)`
- trace: SHRINK: done in the trace rebuild (dropped the `calls` instrumentation counter; probe is `out` only (v2)); this covers the audit concern(s): global `out` and `calls` — extraneous machinery

## interview-essentials/trace-lru-order
- add requires: interview-essentials/lru-design-worked
- define: "`if (init; cond)` runs init, then tests cond, with the variable scoped to the if" for `if (auto it = ...; cond)` if-with-initialiser
- trace: SHRINK: done in the trace rebuild (3 values per probe → 2 per probe (v3)); this covers the audit concern(s): 3+ new ideas (list, map of iterators, if-init, eviction order); trace budget exceeded
- trace: WORKED FIRST: interview-essentials/lru-design-worked (new) is the worked example, wired by the add requires above

## interview-essentials/trace-lru-splice
- add requires: interview-essentials/linear-sequence-containers, cpp-essentials/iter-end-one-past
- define: "splice relinks node it before pos, no copy" for `std::next`, `splice(pos, list, it)`

## interview-essentials/trap-linked-list-insertion
- add requires: cpp-essentials/stdalgo-find-if-not-found
- define: "`c` stands for either container; the loop is the same for both" for generic `c` standing for list or vector
- define: "`[&x]` captures x by reference (sees later changes); `[x]` copies it when the lambda is created" for capture `[&]`
- define: "vector: fast at the back only; deque: fast at both ends and indexable; list: O(1) insert/erase at a held position, no indexing" for `std::list`
- split / reshape: cut 'vectorisable' (SIMD) (back-only aside)

## interview-essentials/trap-random-access-is-free
- add requires: cpp-essentials/iter-range-for-alias
- define: "TLB: a cache of virtual-to-physical page translations; page walk: the memory lookups on a TLB miss" for TLB, page walk
- define: "the setup fills a 256 MB vector and a shuffled index array of its positions" for 256 MB vector / 'shuffled idx' setup

## interview-essentials/trap-small-n
- add requires: cpp-essentials/containers-map-vs-unordered-map, interview-essentials/search-lower-bound-meaning
- define: "pair: 'two values stored together" for `std::map` (tree of nodes), `std::pair`, `std::lower_bound` on a sorted vector

## interview-essentials/tree-balance-families
- define: "AVL and red-black trees are binary search trees that rebalance with rotations (re-hanging a node under its child); a B-tree holds many keys per node and rebalances by splitting and merging nodes" for AVL, red-black, B-tree, rotation, split/merge
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas in one cloze (three tree families, two repair mechanisms)

## interview-essentials/tree-bst-check-bounds
- add requires: interview-essentials/technique-recursion-sum-code, interview-essentials/complexity-big-o-scaling
- define: "node v is an index; key[], left[], right[] are parallel arrays, -1 means no child" for index-encoded tree (`t.key[v]`, `t.left[v]`, -1 = none)
- define: "`INT_MIN`/`INT_MAX` (from `<climits>`) are the smallest and largest `int`, −2³¹ and 2³¹ − 1" for `#include <climits>`, `INT_MIN`/`INT_MAX`
- define: "an `auto` parameter makes the function a template: each argument type gets its own copy of the function" for `const auto&` parameter
- define: "a `constexpr` function can run while compiling, and `static_assert(cond)` stops the build when cond is false" for `constexpr` / why the code is `constexpr` (compile-time harness)
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (array-encoded tree, recursion, bounds window)

## interview-essentials/tree-bst-delete-cases
- split / reshape: overload flag: three delete cases in one Card — flag: 3+ ideas (leaf / one child / two children + successor) (no prerequisite fixes it; consider splitting)
- split / reshape: three delete cases in one Card — split into two Cards

## interview-essentials/tree-bst-inorder-trace
- add requires: interview-essentials/tree-traversal-orders, cpp-essentials/ptr-arrow-null-check
- define: "to_string turns a number into text; += appends" for `std::string out; out += std::to_string(k) + ' '`
- define: "`const T*` lets you read through the pointer but not write" for `p->field`
- define: "each call gets its own stack frame with its own locals; a recursive call stacks a new frame until the base case returns; a recursive function answers a base case directly and otherwise calls itself on a smaller input" for recursion / stack frames
- define: "O(f(n)): the cost grows at most like f(n) as n grows, constants dropped" for O(...)/Θ/log notation
- split / reshape: show `struct Node { int key; Node* left; Node* right; };` in the snippet
- trace: WORKED FIRST: done in the trace rebuild (3 calls on 7-node tree → one call on 5-node tree; new tree-bst-inorder-worked (v2)); this covers the audit concern(s): 3+ new ideas (recursion, string accumulation, pointer chains); no worked example first

## interview-essentials/tree-height-code
- add requires: cpp-essentials/tmpl-auto-param-cloze, interview-essentials/complexity-big-o-scaling
- define: "node v is an index; key[], left[], right[] are parallel arrays, -1 means no child" for index-encoded tree (`t.key[v]`, `t.left[v]`, -1 = none)
- define: "`std::max(a, b)` / `std::min(a, b)` return the larger / smaller of two values" for `std::max`

## interview-essentials/tree-level-order-code
- add requires: cpp-essentials/iter-array-fixed-size
- define: "BFS visits vertices level by level, nearest first, using a queue" for BFS named before it is taught
- define: "node v is an index; key[], left[], right[] are parallel arrays, -1 means no child" for index-encoded tree (`t.key[v]`, `t.left[v]`, -1 = none)
- define: "`x++` yields x's old value then adds 1; `++x` adds 1 and yields the new value" for post-increment inside an index (`x[head++]`)
- define: "an `auto` parameter makes the function a template: each argument type gets its own copy of the function" for `const auto&` parameter
- split / reshape: overload flag carried by the added/now-reachable prerequisites, no split: 3+ new ideas (index-encoded tree, array queue, post-increment)

## interview-essentials/tree-terms
- add requires: interview-essentials/tree-recursive-def

## interview-essentials/tree-trie-end-flag
- add requires: interview-essentials/tree-terms
- define: "a tree with one letter per edge; a root-to-node path spells a prefix" for trie never defined

## interview-essentials/tree-why-balance
- add requires: interview-essentials/complexity-big-o-scaling


## Applied (interview-essentials/topics/algo/01-* … 05-*)

Plus, on every Card in these dirs: `elaborate` added where §4 needs one; redundant edges dropped (theta-sandwich → big-o-definition, sequence-containers → big-o-scaling).

- complexity-amortised-single-call: done.
- complexity-amortised-vs-average: done; hash define kept on the front (needed for the contrast), adversarial-bucket aside cut from the back.
- complexity-big-o-scaling: done.
- complexity-cost-arithmetic-sum: done (old edge already gone).
- complexity-cost-cases: done (old edge already gone); front cut to one question.
- complexity-cost-geometric-sum: changed-from-plan: requires constexpr-fn-static-assert instead of the define (same as its sibling).
- complexity-count-loop-steps: changed-from-plan: requires cost-arithmetic-sum; the formula define would hand over the answer, the probe define is obsolete (Card is a basic now).
- complexity-feasible-n: done.
- complexity-halving-inner-loop: done.
- complexity-log-halvings: done (integer-division define); ⌊⌋ removed from the bold instead of defined; digit-separator define obsolete.
- complexity-recursion-tree-calls: done; `calls` define obsolete.
- complexity-shrink-by-one-vs-half: changed-from-plan: requires cost-geometric-sum + theta-sandwich; arithmetic sum is reachable via recursion-tree-calls; T(n) define obsolete (no T notation on the Card); a front define of the sum would leak.
- complexity-space-stack-depth: changed-from-plan: code switched to `std::span` (as in recursion-sum-code); no ternary/std::max left, so no edge.
- linear-array-index-contiguity: done (linked-list define on front); back code rewritten without `i--` and `sizeof(T)`, so no "dependent loads" define needed.
- linear-array-insert-shift: changed-from-plan: still over §3.1 (moved counter, 4+ values): shrunk to 4 elements, no counter; new worked example linear-array-insert-worked; memmove cut (v3).
- linear-cost-table, linear-deque-both-ends (std::queue aside cut, tags), linear-doubly-unlink-code, linear-queue-ring, linear-prefix-sum-range (define already on front), linear-two-pointers-sorted-pair: done.
- linear-dynamic-array-growth: done.
- linear-list-insert-misconception: changed-from-plan: requires std-list-basics (teaches std::list and std::next) instead of sequence-containers + define; front recast as "Many expect".
- linear-list-traverse-chunk: done except constexpr-fn-static-assert (already reachable); expose_ms fixed to 11000.
- linear-ring-buffer-code: changed-from-plan: requires expr-conditional-operator instead of the define; constexpr already reachable.
- linear-stack-recognition: done; `stacks` tag removed (named the answer).
- linear-two-pointers-code: done; `(int)` cast replaced by `static_cast<int>`, so no define.
- hashing-average-vs-worst: done; hash-flooding/seed aside cut instead of defined (a front define would leak).
- hashing-chaining: done.
- hashing-direct-address-limit: changed-from-plan: requires hashing-direct-address (which now requires big-o-scaling); "hash table" reworded out of the back.
- hashing-load-factor: changed-from-plan: map-unordered-map-intro (teaches the term) instead of map-vs-unordered-map; big-o-scaling reachable.
- hashing-load-factor-limit: changed-from-plan: Abseil aside cut instead of defined.
- hashing-probe-lookup-stop: done; `#include` define skipped (std-names-and-headers reachable).
- hashing-explain-chained-table (not in plan): rubric rewritten to the §4 talk order, ≤ 20 words each, requires index-mod-trace and average-vs-worst (v2).
- hashing-index-mod-trace (not in plan): probe 1 had 3 values, now 2; requires fn-declaration-vs-definition (v2).
- search-binary-search-chunk: done (one define line before the code); integer-division define skipped (Go baseline); expose_ms 11000.
- search-binary-search-halving, search-first-true-predicate, search-half-open-invariant, search-lower-bound-meaning, search-on-answer-monotone: done.
- search-midpoint-overflow: done; Java history and std::midpoint cut from the back, INT_MAX reworded.
- search-lo-equals-mid-trace (not in plan): new worked example search-half-open-worked required first.
- tree-balance-families: skipped the define: it would state both blanks.
- tree-bst-check-bounds: changed-from-plan: auto/constexpr via tmpl-auto-param-cloze; index encoding as a code comment; INT_MIN/INT_MAX the one front define.
- tree-bst-delete-cases: split: new tree-bst-delete-one-child (rung 1); original keeps the two-children question (version kept).
- tree-bst-inorder-trace: changed-from-plan: requires worked + recursion-sum-code + ptr-arrow-null-check (traversal-orders via worked); struct shown; to_string the one define; tree shrunk to 4 nodes, 3 frames (v3). Probe still reads one 4-key string.
- tree-bst-inorder-worked (not in plan): table moved to the front with a self-explanation question (§3.1a) (v2).
- tree-height-code: done, plus recursion-sum-code; std::max/min the one define (index comment already in code).
- tree-level-order-code: changed-from-plan: requires expr-increment-value + tmpl-auto-param-cloze; code cut to 10 lines (returns digits, no std::array), so no array edge; BFS kept on the back as the target's name.
- tree-terms, tree-trie-end-flag (trie defined on front), tree-why-balance: done.


## Applied (interview-essentials/topics/algo/06-* … 09-*, systems/)

### algo/06-heaps, algo/07-sorting (parent)
- heap-child-index-code: changed-from-plan (requires tree-terms, constexpr-fn-static-assert as planned; `std::size_t`/`<cstddef>` replaced by `int` instead of two defines; "complete" is the one front clause; elaborate added)
- heap-heapify-order-code: changed-from-plan (loop rewritten on `int` (`int i = n / 2 - 1; i >= 0; --i`), `auto` parameter → `std::vector<int>&`, so ub-unsigned-countdown-trace is not needed; expr-increment-value moved to heap-sift-down-code, where `++` first appears; same question and answer meaning, version kept; values rerun; elaborate added)
- heap-min-comparator: changed-from-plan (+ stdalgo-comparator-strict; iter-end-one-past dropped as reachable through it; one front clause covers make_heap and the two function objects; priority_queue aside cut; elaborate added)
- heap-push-trace: changed-from-plan (comma declaration already gone after the trace rebuild; `std::size_t` → `int`; + sort-swap-temp for `std::swap` (reaches vector-basics); unreached O(log n) cut from the back; elaborate added)
- heap-shape-and-order: done (+ tree-terms, heap-pq-adt-trace; elaborate added)
- heap-sift-down-code: changed-from-plan (+ heap-shape-and-order (teaches max-heap, reaches pq-adt-trace) instead of heap-pq-adt-trace, + sort-swap-temp, + expr-increment-value; sift down is the one front define; `size_t`, `auto` parameter and assignment-in-condition `for` removed by rewriting the loop as `while` on `int`; O(log n) cut from the back; elaborate added)
- heap-vs-bst: done (+ complexity-big-o-scaling; elaborate added)
- sort-compare-properties: split (v1→v2: the table had 5 sorts × 2 properties). The id keeps the extra-space cloze (merge, quicksort smaller-side, counting; c2 now counting's O(n + k)), requires sort-quick-worst + sort-counting-idea, one front clause for stack frames. Heap sort's stability → NEW sort-heap-sort-unstable (requires sort-heap-sort, sort-stable-meaning; values rerun)
- sort-counting-idea: done (+ linear-prefix-sum-range; sort-lower-bound was already gone; the lower bound is stated on the front without naming comparisons (that would give the answer) and anchored on merge sort, so + sort-merge-idea; version kept)
- sort-elementary-compare: changed-from-plan (complexity-big-o-scaling not added: the Card uses no O-notation; the sum 499 500 is given on the front; elaborate added)
- sort-lomuto-trace: changed-from-plan (`a[store++]` and `std::size_t` removed; probes cut to 2 values each (a was 5 numbers); Θ(n) formula lesson cut from the back, so neither expr-increment-value nor big-o-scaling needed directly; version 2→3; values rerun; elaborate added)
- sort-lomuto-worked: changed-from-plan (+ sort-quick-idea, sort-swap-temp, + expr-increment-value; step table moved to the front with one self-explanation question about row i = 2, §3.1(a); `a[store++]` split; version 1→2)
- sort-merge-idea: done (+ sort-merge-runs-trace, complexity-asym-theta-sandwich; "best, average and worst" reworded "on every input", so no define; elaborate added)
- sort-merge-space: done (inplace_merge aside cut; elaborate added)
- sort-merge-stable-code: changed-from-plan (`std::array`/`std::size_t`/`out[k++]`/`?:` removed: `std::vector` + `push_back`, one if/else; `operator==` moved out of the snippet, the harness compares tags; requires + cpp-essentials/class-struct-members, vector-basics reachable; second static_assert on ties added; every distractor fails; version kept; elaborate added)
- sort-pivot-choice: changed-from-plan (+ complexity-cost-cases; theta-sandwich reachable through sort-quick-worst; median-of-medians and McIlroy cut from the back, median-of-three glossed in place)
- sort-quick-worst: changed-from-plan (+ technique-recursion-sum-code, + complexity-asym-theta-sandwich for Θ; ptr-reference-vs-pointer not needed since the rebuild made it a basic; elaborate added)
- sort-quickselect-trace: done (quickselect-worked already existed; Θ formula lesson cut from the back)
- sort-std-sort-vs-stable: done (in place defined in one clause; libstdc++ → "GCC's"; log² written as (log n)²; ⌈n/2⌉ checked against libstdc++ stl_algo.h)
- sort-swap-temp: changed-from-plan (+ iter-array-fixed-size, + ptr-bump-by-reference for the `&` parameter; `std::size_t` → `int`; elaborate added)

Other Cards touched: sort-quickselect-worked reshaped to §3.1(a) (table on the front, one self-explanation question; v1→v2); heap-push-worked reshaped likewise (v1→v2); NEW sort-merge-worked (worked example before the merge trace); sort-merge-runs-trace rebuilt (`out[k++] = … ? L[i++] : R[j++]`, 7-value probe and 3-value probe → 4 values, 2 probes of 2; requires sort-merge-worked, vector-basics, expr-increment-value; v1→v2; values rerun); sort-heap-sort (+ complexity-log-halvings for O/log; "Build the heap, O(n)" and the quicksort contrast cut; elaborate); heap-pq-adt-trace (comma declaration split; elaborate); heap-op-costs (elaborate).

Capstones missing: algo/06-heaps (10 Cards; would require heap-sift-down-code, heap-heapify-order-code, heap-op-costs, heap-vs-bst, heap-min-comparator); algo/07-sorting (21 Cards; choosing capstone would require sort-merge-stable-code, sort-quick-worst, sort-counting-idea, sort-heap-sort, sort-std-sort-vs-stable).

### algo/08-graphs (fork G)
- graph-adjacency-list-vs-matrix: changed-from-plan (requires vertex-edge-sets, complexity-big-o-scaling; one define for adjacency list/matrix on front; sparse/deg(u)/≪ reworded in plain words instead of a second define; back trimmed to ≤40 words)
- graph-bellman-ford-rounds: changed-from-plan (relax already defined on front; "negative cycle" replaced by "cycle whose weights sum below 0" instead of a second define; elaborate added; bold shortened)
- graph-bfs-distance-code: changed-from-plan (requires iter-array-fixed-size, expr-increment-value; one define for −1 padding; `auto` param replaced by explicit `std::array` type; comma declaration split; elaborate added)
- graph-bfs-mark-on-push: changed-from-plan (snippet rewritten to std::queue to match bfs-queue-chunk, so no increment/array-queue terms; define "dense"; big-o-scaling edge dropped as reachable via bfs-queue-chunk)
- graph-bfs-queue-chunk: done (requires std-queue-stack-adaptors, iter-range-for-alias; one prose define line for `s`/`seen`; front/pop taught by the adaptors Card, no second define; expose_ms 12000 per §4; elaborate added)
- graph-components-code: done (requires path-cycle-component, iter-array-fixed-size; one define for "connected components"; elaborate added)
- graph-cycle-directed-grey: changed-from-plan (requires cycle-spot; colour define skipped: defining grey on the front gives the answer away; colours stay on the back as the target idea)
- graph-dfs-call-stack-trace: changed-from-plan (recursion reached via graph-dfs-worked; strings replaced by vectors (no char('0'+u)), requires vector-back-pop-back; define for `adj[u]` braces; probes cut to ≤2 values each: path[1], order.size(); version 1→2; values rerun; elaborate added)
- graph-dfs-discovery-finish-trace: changed-from-plan (directed-vs-undirected and recursion now reached via graph-dfs-worked; "subtree" reworded; values rerun; elaborate added)
- graph-dijkstra-popped-final: done (requires graph-dijkstra-worked, which replaces bfs-why-shortest and heap-min-comparator; weighted-graph define; bold shortened; elaborate added)
- graph-dijkstra-why-nonnegative: changed-from-plan (arrow notation already taught by directed-vs-undirected in closure, no define; front reworded to the §4 "Many expect" premise)
- graph-explain-visited-linear: done (requires degree-from-edge-list; front no longer lists topics; rubric item 3 now the concrete example per talk order; elaborate added)
- graph-kahn-trace: changed-from-plan (requires std-queue-stack-adaptors, expr-increment-value instead of the `--indeg` define; `std::to_string` removed (order is a vector); define `adj[u]`; probe 2 cut to order[1], order[2]; values rerun; elaborate added)
- graph-list-from-edges-chunk: changed-from-plan (requires graph-directed-vs-undirected (reaches edge-ordered-pair), structured-bindings-basics, vector-of-vectors (teaches `adj(n)`) instead of containers-default-to-vector; `auto` parameter kept, covered by types-auto-deduces via structured-bindings-basics; expose_ms 11000; elaborate added)
- graph-topo-order: changed-from-plan (requires directed-vs-undirected, cycle-spot; big-o-scaling dropped: the Card uses no O-notation; tag topological-sort → ordering (leaked the answer))
- graph-union-find-forest: done
- graph-union-find-path-compression: changed-from-plan (requires graph-union-find-union-code (teaches union by rank, reaches big-O and std::array) and technique-recursion-sum-code instead of three defines; α stays glossed on the back; elaborate added)
- graph-union-find-union-code: done (elaborate added)

Other Cards touched: graph-directed-vs-undirected (+requires adjacency-list-vs-matrix: its front asks about adjacency lists); graph-dfs-worked and graph-kahn-worked reshaped to §3.1(a) (step table on the front, one self-explanation question; dfs-worked +requires technique-recursion-sum-code, expr-increment-value; kahn-worked +requires linear-queue-adt, in-degree define; both untracked new Cards, version kept at 1); graph-degree-from-edge-list (+requires structured-bindings-basics, iter-array-fixed-size; elaborate); graph-bfs-and-dfs (dropped linear-queue-ring: queue ADT reached via bfs-queue-chunk); elaborate added to graph-path-cycle-component, graph-cycle-spot; redundant direct edges removed.
Version bumps: graph-dfs-call-stack-trace 1→2 (probes changed).
Capstone missing: algo/08-graphs has only a concept explain (visited); no choosing capstone (BFS / Dijkstra / Bellman-Ford / topo / union-find). It would require graph-bfs-distance-code, graph-dijkstra-popped-final, graph-bellman-ford-rounds, graph-kahn-trace, graph-union-find-path-compression.
Unresolved: no foundation Card teaches an `auto` function parameter or `std::size_t` in the essentials Decks; graph-bfs-queue-chunk keeps two statements on two lines (splitting breaks the 7-line chunk limit); graph-topo-order bold still names DAG and topological order together.

### algo/09-techniques (fork T)

- technique-activity-selection: changed-from-plan (template + `std::array` replaced by `std::vector<Talk>` by value; requires cpp-essentials/stdalgo-sort-basics (sort + lambda + vector) instead of stdalgo-sort-by-length, plus iter-array-fixed-size (struct, constexpr); half-open notation removed from front and back (stated in words), so the one define is range-for; comma declaration split)
- technique-backtracking-state-space: done (subset sum stated in one clause)
- technique-backtracking-undo: done (permutation defined)
- technique-coin-change-table: changed-from-plan (requires memo-vs-table + cpp-essentials/vector-sized-constructor + iter-range-for-alias; dp-state dropped as now reachable; template/`std::array`/`1'000'000`/`?:` removed: coins and dp are `std::vector`, sentinel `amount + 1`, if instead of `?:`; one define, `std::min`; "unlike greedy" aside reworded)
- technique-dp-overlapping-subproblems: done (memo is the one define; fib given as its formula; "exponential" said in words; merge-sort contrast replaced by halving sum, which the closure teaches)
- technique-dp-state: done (+ cpp-essentials/iter-array-fixed-size; DP table defined; `dp{}` left: zero-init is never read, so not needed to answer)
- technique-fast-power: changed-from-plan (counter dropped, so no `int&` and no ptr-reference-vs-pointer edge; `?:` replaced by if; recurrence notation removed from back, so no define; requires + technique-recursion-sum-code; harness now checks O(log n) through `power(1, 100000)` within the constexpr depth limit; version kept: same question)
- technique-greedy-coins-counterexample: done (+ cpp-essentials/ptr-array-name-to-pointer; front now states the belief as a neutral premise per §4 misconception; greedy is described on the front, no extra define)
- technique-knapsack-direction: changed-from-plan (template/`std::array` → `std::vector`; problem stated in one clause; one define, `std::max`; class-struct-members not added: reachable through coin-change-table)
- technique-lcs-match: changed-from-plan (+ strings-string-view-parameter, vector-of-vectors; `std::size_t` loops → `int m, n`; 2D C array → vector of vectors; `?:` → if/else; one define, `std::max`; code is 9 lines + 3 includes)
- technique-max-invariant-code: done (+ loop-invariant-sum, vocab-span-parameter, types-static-cast-value; `(int)` cast → `static_cast<int>`; half-open `a[0..i)` rewritten as `a[0] ... a[i - 1]`, so the one define is `constexpr`)
- technique-max-start-element-code: changed-from-plan (iter-end-one-past not added: the `std::max_element`/`end()` aside was cut from the back; `numeric_limits` define phrased without the chip text (lint front-answers); identity element not defined, it is the target)
- technique-memo-vs-table: changed-from-plan (requires technique-dp-state instead of overlapping-subproblems; back code uses `std::array<long, 91> f{}; f[1] = 1;`, so no partial-init define needed; top-down/bottom-up taught by the back + dp-state)
- technique-recursion-depth: changed-from-plan (Node/pointer code replaced by a `count(n)` recursion, so no ptr edge; `-O0` defined; `ulimit -s` and binary-search aside cut; crash re-verified at -O0 with 8 MB stack)
- technique-recursion-sum-code: done (span defined; + cpp-essentials/constexpr-fn-static-assert)
- technique-recursion-unwind: done (+ technique-call-stack-trace; `char('0' + n)` defined)

Other Cards touched: NEW technique-call-stack-worked (worked example for fact(3), §3.1(a)); technique-call-stack-trace now requires it; elaborate added to every Card lacking one (all except the worked example). technique-dp-optimal-substructure: graph longest-path aside cut (out of closure). technique-greedy-vs-dp: "exchange argument" (moved-out Card) reworded.

Version bumps: none.

Capstones missing (leaf algo/09-techniques, 21 Cards, no explain): recursion (call-stack-trace, recursion-sum-code, recursion-unwind, recursion-depth); DP choosing (dp-overlapping-subproblems, dp-optimal-substructure, dp-state, coin-change-table, greedy-vs-dp); greedy (greedy-coins-counterexample, activity-selection, greedy-vs-dp); loop invariants (loop-invariant-sum, max-invariant-code, max-start-element-code). Backtracking has only rungs 1/3 (no trace or produce Card).

Missing foundations (no essentials Card teaches them): `std::max`/`std::min`, `std::size_t`, `auto` parameter, `{}` value-initialisation of arrays.

### systems/ (fork S)
- db-lru-recency-bet: changed-from-plan (required lru-design-worked, which teaches LRU and cache capacity, instead of the two defines; one define kept: "hit"; back's "buffer pool/table scan" reworded; elaborate added)
- foundations-bits-lowest-set-bit: done (+ one define "`~x` flips every bit"; elaborate)
- foundations-bits-trace: changed-from-plan (`std::uint32_t`/`<cstdint>` replaced by `unsigned`, popcount aside cut, so only the digit-separator define is needed; `&=` is Go baseline; values re-run: 8, 96, 3/0)
- foundations-cache-cost-model: done (no split; "spatial locality"/"big-O" reworded away, pointer chasing glossed inline; "per miss" leak of c1 fixed; elaborate)
- foundations-growth-factor: done (complexity-amortised-vs-average dropped: reachable via linear-dynamic-array-growth; elaborate)
- foundations-latency-scale: changed-from-plan (x86-64 dropped from front; define is L1; B-tree/RB/hashing names cut; elaborate rephrased to one sentence)
- hash-chaining-vs-open-addressing: changed-from-plan (K/V replaced by int, "dependent load" reworded inline, so no define; hashing-chaining dropped as reachable via hashing-open-addressing)
- hash-unordered-map-is-chained: done (define rehash; absl/boost/bucket interface/"conforming" cut; elaborate reworded)
- ll-false-sharing: changed-from-plan (back aside on hardware_destructive_interference_size/ABI/prefetcher cut instead of defined; code simplified to `constexpr int`, `std::atomic<long>`; layout-alignas-sizeof dropped as now reachable via ll-hardware-numbers; elaborate)
- ll-hardware-numbers: done (AArch64/Apple cut; foundations-latency-scale dropped: unused; elaborate)
- ll-shared-counter-scaling: done (elaborate)
- ll-spsc-ring: done (atomics-modification-order dropped: reachable via compare-exchange-failure; "CAS" replaced by `compare_exchange`; SPSC defined; elaborate)
- seq-invalidation-rules: changed-from-plan (define skipped: it would give away c2/c3; iterator/pointer/reference are taught by iter-explain-vector-growth via seq-vector-vs-deque; elaborate)
- seq-ring-buffer-full-vs-empty: done (one define: bit mask as a cheap wrap; "free-running" reworded as "only ever increase"; elaborate rephrased)
- seq-ring-buffer-mask: changed-from-plan (static_assert/has_single_bit/size_t/uint64_t/inline removed from snippet, so ub-static-assert-finds-ub not needed; constexpr reachable; back cut to the target idea; remote check clean)
- seq-ring-waste-one-slot: changed-from-plan (`const` dropped from the snippet instead of requiring class-const-object-call; elaborate)
- seq-vector-vs-deque: changed-from-plan (define not needed: iter-explain-vector-growth teaches reallocation; foundations-cache-cost-model dropped: unused; "O(1)" reworded)
- trace-lru-order: changed-from-plan (lru-design-worked reachable via db-lru-recency-bet, so not added directly; if-init define added; elaborate)
- trace-lru-splice: changed-from-plan (std-list-basics, which teaches std::list and std::next, instead of linear-sequence-containers + iter-end-one-past; splice defined; elaborate)
- trap-linked-list-insertion: changed-from-plan (std-list-basics replaces the std::list define; `[&]` → `[x]` (lambda-syntax-intro); front reshaped to misconception form; seq-vector-vs-deque replaced by foundations-memory-hierarchy; "vectorisable" cut)
- trap-random-access-is-free: changed-from-plan (TLB/page walk cut from back instead of defined; misconception front; elaborate one sentence)
- trap-small-n: done (pair-basics reachable via map-vs-unordered-map; misconception front)

Other Cards touched: lru-design-worked (redundant complexity-big-o-scaling edge dropped), chunks-cache-padded-counter (expose_ms 6000→11000 per §4 formula, + iter-array-fixed-size, elaborate). No version bumps.

Capstones missing (leaf ≥4 Cards): systems/01-foundations/cost-models (7 Cards; would require memory-hierarchy, cache-cost-model, latency-scale, bits-trace, growth-factor — arguably two concepts: cache cost and bit tricks); systems/02-sequences/arrays-and-buffers (5; would require seq-ring-buffer-mask, seq-ring-buffer-full-vs-empty, seq-ring-waste-one-slot, seq-vector-vs-deque, seq-invalidation-rules).

Unresolved: foundations-growth-factor nearly duplicates linear-dynamic-array-growth (same question); seq-vector-vs-deque overlaps cpp-essentials/containers-stable-references. Trap re-measurements (same CPU, but host heavily loaded) confirmed direction/magnitude (list/vector 35×, shuffled/sequential 14×, map/vector 2.6× at 1M, tie at 1000) but not the cited absolute numbers, which were kept. trace-lru-order is ~9 state changes (limit 8).

- Unresolved: trace-lru-order still makes 9 state changes (limit 8).
