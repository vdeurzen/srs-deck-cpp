# Novice audit: interview-essentials/topics/leetcode and hft

Shorthand used below (all defined in the Summary):
SCAFFOLD = harness boilerplate (`constexpr`, `using X = ...`, `auto` params, `template <class Node>`, `<bits/stdc++.h>`).
Ids are interview-essentials unless prefixed `cpp-essentials/`.

## stl-accumulate-overflow
- signed `int` overflow is UB → REQUIRE cpp-essentials/types-overflow-rules
- `0LL` literal suffix / `long` is 32 or 64 bit → DEFINE: `LL` makes the literal a 64-bit `long long`
- `std::ssize` → DEFINE: signed size of a container
- `const std::vector<int>&` parameter → REQUIRE cpp-essentials/const-ref-parameter
- `constexpr` → SCAFFOLD

## stl-binding-auto-copies
- structured binding `auto [key, words]` → NEW: structured bindings (`auto [a, b] = pair`; `auto&` to alias, plain `auto` copies)
- map element is a `std::pair` (key, value) → NEW: std::pair basics
- `std::ranges::sort` → DEFINE: sorts the whole range
- combines 3 new ideas (structured binding, map element = pair, auto-copy trap)

## stl-equal-range-count
- `auto [lo, hi] = equal_range(...)` → NEW: structured bindings
- `std::equal_range` → DEFINE: returns the half-open `[lo, hi)` of elements equal to `t`
- iterator subtraction `hi - v.begin()` gives an index → REQUIRE cpp-essentials/iter-end-one-past
- `{-1, -1}` returned as a vector → NEW: std::pair/brace-init (or DEFINE: brace list builds the return value)
- `constexpr` → SCAFFOLD

## stl-int-min-traps
- `INT_MIN`/`INT_MAX` from `<climits>` → DEFINE: smallest/largest `int`, -2147483648 / 2147483647
- `x % 10` and `x /= 10` truncate toward zero, remainder keeps the sign → DEFINE: that rule in one clause
- negating `INT_MIN` is UB → in closure (types-overflow-rules); keep

## stl-iota-argsort
- `std::iota` → DEFINE: fills 0, 1, 2, ...
- `std::greater{}` → REQUIRE heap-min-comparator
- argsort (sort indices by a key) → DEFINE (front half-defines it; add "sort positions, not values")
- `constexpr` → SCAFFOLD

## stl-letter-count-chunk
- `c - 'a'` (char is a small integer) → NEW: chars are integers; `c - 'a'` is the letter's 0..25 index
- `std::array<int, 26>` and `==` on arrays → DEFINE: fixed-size array object that supports `==`
- `const auto&` params → SCAFFOLD

## stl-map-subscript-probe
- `unordered_map::contains` → DEFINE: true if the key exists, never inserts
- `template <class Map = ...>` default template argument → SCAFFOLD (say: ignore, the checker swaps the map)
- `return {seen[need], i}` brace-return of a vector → DEFINE

## stl-multiset-erase-one
- `std::multiset` → NEW: ordered containers `set`/`multiset` (sorted, `find`, `erase(key)` vs `erase(iterator)`)
- `find` returning `end()` → REQUIRE cpp-essentials/iter-end-one-past
- Card has `requires: none`; add the two above
- sliding-window-median context → DEFINE: "median of every window of k values"

## stl-pair-key-hash
- `std::pair` → NEW: std::pair basics (`.first/.second`, `{a, b}`)
- unordered_map's third template argument is the hasher type → NEW: custom hash for unordered_map keys
- `decltype(lambda)` / each lambda has its own type → REQUIRE cpp-essentials/lambda-closure-type
- lambda `-> std::size_t` trailing return → REQUIRE cpp-essentials/stdalgo-lambda-syntax
- `<<`, `^`, `std::uint32_t(...)` bit packing → NEW: bitwise operators and masks
- `std::hash<T>{}(x)` call → DEFINE: a hash functor, called like a function
- combines 6 new ideas; split it (type-of-lambda Card, then hasher Card), or TOO ADVANCED until pair/lambda-type/bit packing are taught

## stl-pq-lambda-comparator
- `std::pair` `.second` → NEW: std::pair basics
- `decltype(cmp)` / lambda type → REQUIRE cpp-essentials/lambda-closure-type
- `inline constexpr auto cmp` → SCAFFOLD
- `priority_queue` API and "pops when it holds k+1" → NEW: std::priority_queue API (`push`, `top` = largest, `pop` returns nothing)
- frequency counts as `(value, count)` pairs → DEFINE

## stl-pq-min-heap-type
- `std::priority_queue` push/pop/top/size and its default max-heap → NEW: std::priority_queue API (heap-min-comparator teaches `make_heap`, not `priority_queue`)
- `std::size_t` → REQUIRE cpp-essentials/types-mixed-sign-compare
- `using KeepK = ...` alias → SCAFFOLD

## stl-substr-quadratic
- cost of `substr` (copies) and `std::string::find`/`npos` → DEFINE: `substr` copies; `find` returns `npos` if absent
- summing copies to O(n²) → REQUIRE complexity-count-loop-steps (and complexity-big-o-scaling)
- `emplace_back` → DEFINE: `push_back` that builds the element in place
- `for (;;)` → DEFINE: loop forever until `return`
- `std::vector<std::string>` growth → n/a

## stl-vector-paren-brace
- the `vector(count, value)` fill constructor → NEW: vector everyday operations (fill ctor, `push_back`, 2-D vector)
- `tri[i - 1][j - 1]` vector of vectors → same NEW
- `constexpr` → SCAFFOLD

## arr-3sum-frame-parsons
- `std::size_t` unsigned index with `hi = a.size() - 1` → REQUIRE cpp-essentials/types-mixed-sign-compare
- `if (int s = ...; cond) ... else if` → DEFINE: `if` with an init-statement
- `std::ranges::sort(a)`, `<bits/stdc++.h>` → SCAFFOLD
- two declarators in one line (`std::size_t lo = ..., hi = ...`) → DEFINE

## arr-3sum-outer-skip-code
- `auto pairs` as a callable parameter → SCAFFOLD
- `using VV = ...` → SCAFFOLD
- `vector<vector<int>>` result → NEW: vector everyday operations

## arr-diff-code
- `std::vector<int> d(n + 1)` zero-filled → NEW: vector everyday operations (size-n ctor zero-fills)
- `return {d.begin(), d.end() - 1}` iterator-range construction → DEFINE: builds a vector from `[begin, end-1)`
- `const auto& e : b` → REQUIRE cpp-essentials/iter-range-for-alias

## arr-intervals-merge-chunk
- Card has `requires: none`
- `std::ranges::sort(iv)` on vectors → DEFINE: vectors compare lexicographically, so it sorts by start
- `out.back()[1]`, `push_back` on `vector<vector<int>>` → NEW: vector everyday operations
- O(n log n) → REQUIRE complexity-big-o-scaling
- "overlap" of intervals → DEFINE: `[a,b]` and `[c,d]` overlap when `c <= b`
- `std::max` → DEFINE

## arr-kadane-all-negative
- `INT_MIN` → DEFINE: smallest `int`
- "subarray" → DEFINE: contiguous run (and "empty subarray")

## arr-kadane-chunk
- `INT_MIN` → DEFINE
- "contiguous subarray" → DEFINE (defined only on the back)

## arr-prefix-hash-parsons
- `seen[p - k]` on a missing key reads 0 and inserts → REQUIRE cpp-essentials/iter-map-subscript-inserts
- hash map as a counter → REQUIRE hashing-direct-address-limit (intro to key to value lookup)
- `auto& seen` parameter → SCAFFOLD
- combines prefix sums, counting map, and `p - k` ordering (3 ideas)

## arr-prefix-hash-signal
- "hash map counts" → REQUIRE hashing-direct-address-limit
- "contiguous", "negatives allowed rules out a window" → REQUIRE arr-window-signal (so the foil exists first)

## arr-window-trace
- `need[s[hi] - 'a']-- > 0`, `++need[...] > 0` (increment/decrement used inside an expression) → NEW: `++x` vs `x++` as expressions
- `s[hi] - 'a'` → NEW: chars are integers
- `int need[26]{1, 1, 1}` array init → DEFINE: first three counts 1, rest 0
- combines 4 ideas (need-counts, `missing`, shrink-while, record-before-shrink)

## arr-window-variable-chunk
- `int cnt[128]{}` zero-initialised C array → REQUIRE cpp-essentials/initialization-default-value-zero
- `cnt[s[hi]]` char as an index; `cnt[s[lo++]]` post-increment in an index → NEW: chars are integers; NEW: `++x` vs `x++`
- `int(s.size())` → REQUIRE cpp-essentials/types-mixed-sign-compare

## bs-first-true-chunk
- `auto ok` callable parameter; lambda call `ok(mid)` → REQUIRE cpp-essentials/stdalgo-lambda-syntax
- `lo + (hi - lo) / 2` → REQUIRE search-midpoint-overflow
- `⌈p / v⌉` → DEFINE: round up

## mono-histogram-bounds
- `st.back()`, `st.pop_back()` (a vector used as a stack) → NEW: vector everyday operations

## mono-histogram-trace
- same vector-as-stack gap → NEW: vector everyday operations
- combines monotone stack, width formula, sentinel 0, `>=` pops equals (4 ideas)

## mono-next-greater-chunk
- `ans(t.size())` zero-filled vector; `for (; cond; st.pop_back())` → NEW: vector everyday operations

## mono-stack-signal
- sliding-window maximum "needs a deque" → REQUIRE linear-deque-both-ends

## list-fast-slow-parsons
- `Node*`, `->`, `nullptr`, `Node *slow = head, *fast = head;` → REQUIRE linear-list-node and cpp-essentials/ptr-holds-an-address (neither teaches `->`: add DEFINE `p->x` is `(*p).x`)
- `&&` short-circuits left to right → DEFINE (back uses it)
- "cycle" in a list → DEFINE: a node's `next` leads back to an earlier node
- `template <class Node>` → SCAFFOLD

## list-reverse-parsons
- `->`, `Node*`, `nullptr` → REQUIRE linear-list-node and cpp-essentials/ptr-holds-an-address; DEFINE `->`
- `template <class Node>` → SCAFFOLD

## tree-inorder-iterative-parsons
- `std::stack` (`push`, `top`, `pop` returns void) → NEW: std::stack/queue API
- `TreeNode*`, `->left`, `nullptr` → REQUIRE linear-list-node
- stack mirrors recursion frames → REQUIRE technique-recursion-unwind
- inorder → REQUIRE tree-traversal-orders (not in closure)
- `auto st` parameter → SCAFFOLD

## tree-lca-bst
- "ancestor" → DEFINE: any node on the path up to the root

## tree-lca-chunk
- `Node*`, `->`, null test → REQUIRE linear-list-node; DEFINE `->`
- `a && b ? r : a ? a : b` nested ternary, pointers as truth values → DEFINE (no Card teaches `?:`)
- postorder → in closure
- combines hit-returns-immediately, both-sides rule, pass-up rule (3 ideas)

## tree-validate-int-limits
- `int lo = INT_MIN` default arguments → DEFINE: parameters with defaults
- `INT_MIN`, `INT_MAX` → REQUIRE cpp-essentials/types-overflow-rules
- `TreeNode*`, `->` → REQUIRE linear-list-node

## gr-01-bfs-code
- TOO ADVANCED: 0-1 BFS (deque with free edges at the front) is a niche variant that nothing in the Decks builds toward; move out of essentials, or add Dijkstra-then-0-1 as a post-sprint pair
- `std::deque` `push_front`/`pop_front` → REQUIRE linear-deque-both-ends
- `for (auto [v, w] : g[u])` → NEW: structured bindings
- grid as a graph (cells to nodes, flattened ids) → NEW: a grid is a graph
- `auto q` by value, `constexpr` → SCAFFOLD

## gr-dijkstra-heap-parsons
- `std::priority_queue<P, vector<P>, greater<P>>`, `top`/`pop` → NEW: std::priority_queue API
- `P = {distance, vertex}` pairs compared lexicographically → NEW: std::pair basics
- `auto [d, u] = pq.top()` → NEW: structured bindings
- `pq.push({dist[s] = 0, s})` assignment inside an expression → DEFINE
- "relax" → DEFINE: replace `dist[v]` if the path through `u` is shorter
- combines lazy deletion, heap of pairs, relax, stale-skip (4 ideas)

## gr-grid-dfs-code
- grid as a graph, `dr`/`dc` direction arrays, bounds check → NEW: a grid is a graph (4-neighbour offsets and bounds check)
- `'1'`/`'0'` char literals vs strings → NEW: chars are integers (one clause: `'1'` is a character, not a number)
- `vector<vector<char>>` → NEW: vector everyday operations
- `auto& g` → SCAFFOLD

## gr-grid-dfs-depth
- "main-thread stack is typically 8 MB", "frame", "return address" → DEFINE: each call pushes a frame holding its locals and return address; the thread's stack is a fixed-size region (REQUIRE complexity-space-stack-depth is in closure but gives no byte sizes)
- grid DFS → REQUIRE gr-grid-dfs-code (in closure)

## gr-kahn-build-code
- `using VI = ...` → SCAFFOLD
- `{a, b}` meaning "b before a" is stated; no gap beyond SCAFFOLD

## gr-kahn-chunk
- `--indeg[v] == 0` (pre-decrement inside a condition) → NEW: `++x` vs `x++` as expressions
- `auto indeg` by value, `const auto& adj` → SCAFFOLD
- `order` doubling as the queue (index `h` walking a growing vector) → DEFINE
- combines Kahn's rule, output-as-queue, decrement-and-test (3 ideas)

## gr-multi-source-bfs-code
- `std::array<int, 9>`, `d.fill(-1)`, flattened 3x3 row-major, `nbrs` table → DEFINE; NEW: a grid is a graph
- "virtual source" → DEFINE
- `auto` params, `constexpr`, `using Grid` → SCAFFOLD

## bt-combination-start-index
- `using V`, `const V&`, `std::vector<V>& out` → SCAFFOLD
- "combination" (order ignored) vs "permutation" → DEFINE

## bt-dup-skip-code
- SCAFFOLD only (`using V`, `constexpr`)

## bt-permutations-parsons
- `auto& used` (a vector<bool> of flags) → SCAFFOLD; NEW: vector everyday operations

## bt-subsets-chunk
- `auto& cur`, `auto& out` → SCAFFOLD

## dp-bitmask-signal
- TOO ADVANCED: bitmask DP / BFS over (visited mask, node) (Shortest Path Visiting All Nodes, L4); belongs after the sprint
- bit masks as sets → NEW: bitwise operators and masks
- Held-Karp mention → DEFINE or cut

## dp-coin-ways-chunk
- `std::vector<unsigned> dp(amount + 1)` → NEW: vector everyday operations
- unsigned wraparound vs signed overflow UB → REQUIRE cpp-essentials/types-overflow-rules

## dp-edit-distance-code
- `std::vector d(a.size() + 1, std::vector<int>(...))` (no template args) → DEFINE: CTAD infers `vector<vector<int>>`
- `std::min({x, y, z})` → DEFINE: min of a braced list
- `std::size_t i`, `d[i][j] = i + j` → REQUIRE cpp-essentials/types-mixed-sign-compare
- `std::string_view` → in cpp-essentials (REQUIRE cpp-essentials/strings-string-view-parameter)
- `<bits/stdc++.h>`, `constexpr` → SCAFFOLD

## dp-grid-dag-signal
- "DAG", "topological order" → REQUIRE graph-topo-order; DEFINE: DAG = directed graph without cycles
- Dijkstra mention → REQUIRE graph-dijkstra-popped-final or cut the clause

## dp-grid-paths-chunk
- `std::vector<int> row(n, 1)` fill constructor → NEW: vector everyday operations

## dp-lis-patience-parsons
- the O(n log n) LIS is not derivable from the O(n^2) DP, and the O(n^2) DP has no Card → NEW: LIS as O(n^2) DP over "ending at i"
- `*it = x`, `t.end()` iterators → REQUIRE cpp-essentials/iter-end-one-past
- "subsequence" vs substring → DEFINE
- `std::ranges::lower_bound(t, x)` → in closure (search-lower-bound-meaning)
- combines patience tails, binary search, strictness (3+ ideas)

## dp-memo-robber-code
- `struct Robber { std::vector<int> v, memo = std::vector<int>(v.size(), -1); ... int best(int i) }` struct with member function and default member initialiser → REQUIRE cpp-essentials/class-struct-vs-class (default member initialisers still unexplained: DEFINE)
- `calls` instrumentation counter → DEFINE (harness only)
- `<bits/stdc++.h>` → SCAFFOLD

## dp-min-path-sum-code
- `INT_MAX` sentinel → DEFINE
- padded rolling row with `d[j]` meaning column `j-1` → combines rolling row, sentinel padding, INT_MAX wall (3 ideas)
- `g[0].size()` assigned to `int` → REQUIRE cpp-essentials/types-mixed-sign-compare

## dp-word-break-code
- `s.substr(0, i).ends_with(w)` → DEFINE: true if the string ends with `w`
- `std::vector<bool>` default false → NEW: vector everyday operations
- `dp[i - w.size()]` unsigned arithmetic → REQUIRE cpp-essentials/types-mixed-sign-compare
- `std::string_view` → REQUIRE cpp-essentials/strings-string-view-parameter

## bit-count-dp-code
- `&`, binary, "the 1 bits of i" → NEW: bitwise operators and masks (foundations-bits-lowest-set-bit starts from two's complement and `~`, never teaches `&`/`|`/`^`/shifts)
- `i & (i - 1)` → in closure (foundations-bits-trace)

## bit-mask-enumerate-code
- `1 << n`, `m >> i & 1`, `^=` → NEW: bitwise operators and masks
- "subset as a bit mask" → NEW: a set of n items as an n-bit integer
- `a.size()` into `int n` → REQUIRE cpp-essentials/types-mixed-sign-compare

## bit-precedence-trap
- `&`, `<<`, `|=` operators, mask-as-set → NEW: bitwise operators and masks
- `-Wparentheses` / `-Wall` → DEFINE: compiler warning flag
- `==` binds tighter than `&` → keep (this is the point)

## bit-xor-single-signal
- Card has `requires: none`; `^` (XOR) never taught → NEW: bitwise operators and masks (include XOR identities)
- "one-pass fold" → DEFINE: combine every element into one accumulator
- "constant extra space" → REQUIRE complexity-space-stack-depth

## rq-fenwick-code
- TOO ADVANCED: Fenwick tree (blocks defined by lowest set bit, `i & -i` stepping); belongs after the sprint
- needs `&`/`-` on signed ints → NEW: bitwise operators and masks

## rq-segment-signal
- TOO ADVANCED: segment/Fenwick tree is named but nothing builds it; move out with rq-fenwick-code, or NEW: segment tree basics

## rec-dp-cell-vs-mask
- TOO ADVANCED: part (b) is bitmask DP (see dp-bitmask-signal); replace (b) with a non-mask goal-dependent state (e.g. House Robber "took previous or not")
- "state" → in closure

## rec-explain-dp
- TOO ADVANCED: item (5) is bitmask/TSP DP; item (3) needs the O(n^2) LIS DP, which has no Card → NEW: LIS O(n^2) DP
- five DP formulations in one answer (5 ideas)

## rec-explain-graphs
- (2) is 0-1 BFS → TOO ADVANCED part (see gr-01-bfs-code); `deque` → REQUIRE linear-deque-both-ends
- (1) word ladder = BFS over words as an implicit graph → NEW: a grid is a graph (generalise: build neighbours on the fly)
- (5) union-find extra edge → in closure
- five algorithms in one answer (5 ideas)

## rec-intervals-greedy-vs-dp
- "weighted interval scheduling" is not taught → DEFINE: pick non-overlapping jobs maximising profit (answer follows from technique-exchange-argument)

## rec-list-vs-count
- "polynomial in n" vs exponential output size → DEFINE; REQUIRE complexity-feasible-n
- partitions counts → fine

## rec-min-max-vs-min-sum
- TOO ADVANCED: contrasts binary search on the answer with a split-array DP, and the DP (over elements used, pieces cut) is never taught
- "contiguous pieces", "monotone" → DEFINE

## rec-one-vs-two-sequences
- (c) longest palindromic subsequence needs interval DP `s[i..j]`, untaught → NEW: interval-state DP, or drop (c)
- (a) needs the O(n^2) LIS DP → NEW: LIS O(n^2) DP
- "subsequence" → DEFINE

## rec-shortest-path-weights
- (b) 0-1 BFS → TOO ADVANCED part; `deque` → REQUIRE linear-deque-both-ends
- (a) 8-neighbour grid BFS → NEW: a grid is a graph
- (c) Dijkstra → in closure

## rec-top-k-choice
- (b) counting frequencies with a hash map → REQUIRE hashing-direct-address-limit
- "design a class" streaming interface → DEFINE

## rec-union-find-vs-dfs
- `isConnected` n x n matrix → REQUIRE graph-adjacency-list-vs-matrix
- "tree with one extra edge" → DEFINE: an extra edge closes exactly one cycle

## opt-union-member-lifetime
- TOO ADVANCED: anonymous union with a non-trivial member (`std::string`), implicit destructor rules; implementing `optional` is post-sprint
- `union` → NEW: union basics (one storage, one live member)

## opt-union-storage
- TOO ADVANCED: builds `std::optional` on an anonymous union with `construct_at`/`destroy_at` in a constant expression
- 5+ new ideas (union, lifetime, `construct_at`, `destroy_at`, `engaged` flag)

## sptr-aliasing-ctor
- TOO ADVANCED: the aliasing constructor of `shared_ptr` is a niche feature beyond basic ownership

## sptr-explain-implement
- TOO ADVANCED: implement `shared_ptr` with atomics, weak counts, aliasing (rubric of 5 library-internal claims; relies on memory orders)

## sptr-make-shared-retention
- TOO ADVANCED: implementation of `make_shared` control-block release; needs `weak_ptr` (REQUIRE cpp-essentials/smart-pointers-weak-ptr-lock if kept)

## sptr-refcount-orders
- TOO ADVANCED: `acq_rel`, release sequences, `fetch_sub`

## sptr-relaxed-increment
- TOO ADVANCED: `memory_order_relaxed` reasoning

## sptr-weak-plus-one
- TOO ADVANCED: libstdc++'s weak-count `+1` invariant (trace of control-block internals)

## uptr-array-specialisation
- `std::default_delete`, `unique_ptr<T[]>` → DEFINE: the deleter is the callable that frees the pointer
- `Tick` is an undefined type in the front → DEFINE: "a struct"
- `new Tick[1024]` / `delete[]` → in closure (life-delete-matches-new)

## uptr-explain-implement
- TOO ADVANCED: EBO / `[[no_unique_address]]`, `reset` ordering, array specialisation in one answer (5 library-internal claims)

## uptr-reset-order
- TOO ADVANCED: a deleter that destroys `*this`, template default arguments, `std::default_delete`

## vec-build-mini-vector
- TOO ADVANCED: capstone with variadic `Args&&...`, `forward`, `move_if_noexcept`, allocator, `construct_at`, strong guarantee (5+ ideas)

## vec-emplace-back-forward
- TOO ADVANCED: variadic templates and perfect forwarding over raw `std::allocator` storage

## vec-erase-shift
- TOO ADVANCED: raw-storage live-range reasoning (`destroy_at`, the `std::move` algorithm overload vs `std::move` the cast → DEFINE if kept); the shift idea alone belongs at array level (linear-array-insert-shift)

## vec-explain-push-back
- TOO ADVANCED: strong guarantee, aliasing, relocation, rollback (5-claim rubric)

## vec-push-back-delegates
- TOO ADVANCED: requires variadic `emplace_back` and the "named rvalue reference is an lvalue" rule

## vec-push-back-self-alias
- TOO ADVANCED: undefined behaviour from aliasing the buffer being reallocated (LWG 526), raw storage, `std::move`

## vec-realloc-order
- TOO ADVANCED: ordered steps on raw storage (`allocate`, `construct_at`, `destroy`, `deallocate`), `const T&` aliasing

## vec-realloc-rollback
- TOO ADVANCED: try/catch cleanup of `construct_at` objects, `throw;` rethrow, strong guarantee

## vec-relocate-move-if-noexcept
- TOO ADVANCED: `move_if_noexcept`, noexcept move constructors, strong guarantee

## vec-reserve-in-loop
- O(n^2) growth cost → REQUIRE linear-dynamic-array-growth and complexity-count-loop-steps
- "libstdc++, libc++, MSVC" → DEFINE: the three major standard-library implementations
- `Order` type and `book` vector → DEFINE

## vec-three-pointers
- `sizeof` of a type, 24 bytes → REQUIRE cpp-essentials/layout-padding-sizeof
- `begin`/`end` as pointers → REQUIRE cpp-essentials/iter-end-one-past
- "x86-64", "libstdc++" → DEFINE

## vec-zero-capacity-growth
- "geometric growth", "amortised O(1)" → REQUIRE linear-dynamic-array-growth
- `allocate(0)`/"constant evaluation rejects" → DEFINE (harness detail; say "allocating 0 slots is a bug")
- `cond ? a : b` → DEFINE (no Card teaches `?:`)
- `std::size_t` → REQUIRE cpp-essentials/types-mixed-sign-compare

## lru-evict-map
- TOO ADVANCED: LRU kept in parallel index arrays with a sentinel ring plus a key-to-slot table with an invariant (L4); also tombstones
- combines sentinel ring, slot table, invariant (3+ ideas)

## lru-std-list-allocates
- `std::list` node-based, one heap allocation per node → REQUIRE cpp-essentials/containers-stable-references
- "hot path", "rehash" → DEFINE (hashing-load-factor teaches rehash)
- stored iterator in a map (`index[k] = order.begin()`) → DEFINE

## lru-touch
- parallel arrays `n`, `p` as pointers (indices instead of pointers) → DEFINE
- sentinel ring → in closure (linear-doubly-unlink-code)
- combines index-linked list, sentinel, ordering of four assignments (3 ideas)

## book-match-cross
- order-book vocabulary (limit buy, ask, bid side, resting, aggressive, price tick, lots, price-time FIFO, venue) → NEW: order book vocabulary and what "matching" means
- `auto& [qty, best] = a` structured binding of a struct → NEW: structured bindings
- `std::array<long, 8>` indexed by tick, `std::min` → DEFINE
- combines domain terms, structured binding, nested loop with sentinel (3+ ideas)

## book-trade-price
- "continuous price-time-priority venue", "limit buy", "resting ask", "aggressor" → NEW: order book vocabulary and what "matching" means
- "BYX Rule 11.13" → fine as citation

## packet-reinterpret-ub
- TOO ADVANCED: strict aliasing, implicit object creation, `std::launder`, `start_lifetime_as`, `bit_cast`
- `alignas`, `recv()`, `memcpy` → DEFINE if kept

## bucket-refill
- fixed-point "nano-tokens" (`kToken`, `1'000'000'000` digit separators) → DEFINE
- `std::int64_t`, `std::min` clamp → DEFINE
- "monotonic ns" clock → DEFINE: a clock that never goes backwards, in nanoseconds
- combines token bucket, fixed-point credit, clamp + `last` update (3 ideas)

## spsc-explain
- TOO ADVANCED: SPSC queue design with cached indices, release/acquire, cache-line padding (L5)

## spsc-layout-chunk
- TOO ADVANCED: `alignas(64)`, false sharing, cached indices, atomics

## spsc-publish-order
- TOO ADVANCED: release/relaxed stores, data race with a plain slot write

## spsc-try-pop-parsons
- TOO ADVANCED: acquire/release/relaxed loads and stores on a lock-free ring

## spsc-try-push
- TOO ADVANCED: atomics with memory orders, power-of-two mask, cached head (3+ ideas)

## trivia-constinit-fix
- TOO ADVANCED: dynamic vs constant initialisation across translation units, `constinit`, `extern`

## trivia-exceptions-cost
- "Itanium ABI", "unwind tables", "happy path" → DEFINE: unwind tables are compiler-written lookup data used to find handlers
- "hundreds of ns to µs" → REQUIRE foundations-latency-scale
- "return code" alternative → REQUIRE cpp-essentials/err-pick-a-channel

## trivia-init-order-fiasco
- TOO ADVANCED: unspecified order of dynamic initialisation across translation units; `extern`; "indeterminately sequenced"

## trivia-mi-sizeof
- TOO ADVANCED: multiple inheritance layout, primary base, one vptr per polymorphic base (Itanium ABI)

## trivia-overload-puzzles
- TOO ADVANCED: overload ranking of standard vs user-defined conversions, pointer to `bool`, array decay (language-lawyer puzzle)

## trivia-volatile-not-atomic
- `volatile` → DEFINE: tells the compiler not to elide accesses; nothing more
- "memory-mapped I/O and signal handlers" → DEFINE
- `std::atomic<bool>` → REQUIRE cpp-essentials/conc-atomic-or-mutex
- `poll_feed()` → DEFINE: any function that reads the feed

## Summary

Recurring gaps, each with the one remedy that fixes them all:

1. **Bit operators.** `&`, `|`, `^`, `<<`, `>>`, binary, masks, XOR identities (bit-*, rq-fenwick, dp-bitmask, stl-pair-key-hash; the systems bits Cards assume them too). Remedy: NEW basic Card(s) "bitwise operators and masks" (level 1, `foundations`), required by foundations-bits-lowest-set-bit.
2. **Structured bindings and `std::pair`.** `auto [a, b]`, `.first/.second`, `{a, b}` (stl-*, gr-*, book-match-cross, and algo/graph-list-from-edges-chunk). Remedy: NEW Cards "structured bindings" and "std::pair basics"; require them.
3. **Vector everyday operations** (fill constructor, `push_back/pop_back/back/size`, `vector<vector<>>`, zero-fill, `vector<bool>`). Remedy: NEW Card "vector everyday operations" before the iterator Cards.
4. **Chars are integers and `++x`/`x++` as expressions** (`c - 'a'`, `cnt[s[lo++]]`, `--indeg[v] == 0`; Go persona knows `x++` only as a statement). Remedy: NEW pair of Cards.
5. **Container vocabulary**: `std::stack`, `std::set/multiset`, `std::priority_queue` API. Remedy: NEW "STL containers: stack, set/multiset, priority_queue".
6. **Grid as graph** (dr/dc, flattened ids, implicit graph of words). Remedy: NEW Card in algo/08-graphs.
7. **Pointers and `->` in tree/list Cards** (not taught by linear-list-node). Remedy: MOVE one Card teaching `->` and `nullptr` into the closure; REQUIRE linear-list-node plus it.
8. **Harness SCAFFOLD** (`constexpr`, `using`, `auto` params, `template <class Node>`, `<bits/stdc++.h>`). Remedy: one NEW Card "reading this Deck's snippets" and REQUIRE it from every code/chunk/parsons Card, plus REQUIRE cpp-essentials/tmpl-function-syntax.
9. **Signed/unsigned and `INT_MIN/INT_MAX`** (`int(a.size())`, `std::size_t`). Remedy: REQUIRE cpp-essentials/types-mixed-sign-compare and types-overflow-rules.
10. **Missing algorithm prerequisites**: LIS O(n^2) DP, interval DP, order-book vocabulary, `deque`, hash-map-as-counter. Remedy: NEW LIS DP Card; REQUIRE linear-deque-both-ends and hashing-direct-address-limit.
11. **Whole families too advanced for a basics rebuild**: hft smart-pointers (except uptr-array-specialisation), hft vector "implement" Cards, optional, SPSC, packet-reinterpret, init-order/constinit/MI/overload trivia, bitmask DP, Fenwick/segment tree, 0-1 BFS, split-array contrast. Remedy: move out of the essentials Decks.

Audited 123 cards: 111 with gaps, 248 gaps total, 37 too advanced.
