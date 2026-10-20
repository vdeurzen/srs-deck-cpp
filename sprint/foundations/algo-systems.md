# Novice audit: interview-essentials algo + systems (2026-10-19)

## complexity-amortised-single-call
- `std::vector` → REQUIRE cpp-essentials/containers-default-to-vector
- `reserve` → REQUIRE cpp-essentials/iter-reserve-keeps-buffer
- reallocation → REQUIRE cpp-essentials/iter-explain-vector-growth

## complexity-amortised-vs-average
- O(1), 'sequence of n pushes cost O(n)' → MOVE algo-basics/complexity-asym-big-o-definition (requires complexity-asym-step-model)
- `std::vector` → REQUIRE cpp-essentials/containers-default-to-vector
- worst case vs average case → MOVE algo-basics/complexity-cost-cases (requires complexity-cost-trace-early-exit; chain: trace-triangular, product-rule, sum-rule)
- 3+ new ideas at once (amortised, average-case over a distribution, adversarial hashing); the hash-bucket aside should go or be its own Card

## complexity-big-o-scaling
- O(n), O(n²), O(log n) notation (ROOT of the whole Deck, requires nothing) → MOVE algo-basics/complexity-asym-big-o-definition (requires complexity-asym-step-model)
- log₂ and 'log of 10³ ≈ 10' → MOVE algo-basics/complexity-asym-log-rules (requires big-o-definition)

## complexity-cost-master-cases
- T(n) = a·T(n/b) + f(n) recurrence notation, Θ, log_b, geometric series, 'leaves' → TOO ADVANCED: solving recurrences by the master theorem is post-sprint; keep complexity-recursion-tree-calls / shrink-by-one-vs-half as the recognition Cards
- 3+ new ideas (recurrence, leaves-vs-root comparison, Θ)

## complexity-count-loop-steps
- n(n − 1)/2 pair count → DEFINE: '(n−1)+(n−2)+…+1 = n(n−1)/2'
- `int main`, `const int n`, probe markers `// @1` → DEFINE: one clause on how probes are read (once, for the whole trace set)

## complexity-feasible-n
- O(n²), O(n log n), O(2ⁿ) → REQUIRE interview-essentials/complexity-big-o-scaling
- 2ⁿ / exponential → DEFINE: 'O(2ⁿ): cost doubles with every extra element'

## complexity-halving-inner-loop
- geometric series 64+32+…+1 = 2n − 1 → MOVE algo-basics/complexity-cost-geometric-sum (requires complexity-cost-trace-doubling)
- two independent loop nests = two runs (one trace should be one run)

## complexity-log-halvings
- integer division `n /= 2` drops the fraction → DEFINE
- digit separator `1'000'000` → DEFINE: 'the apostrophes are only for reading'
- ⌊log₂ n⌋ floor brackets → DEFINE (or MOVE algo-basics/complexity-asym-log-rules)

## complexity-recursion-tree-calls
- recursion / stack frames → MOVE algo-basics/technique-call-stack-trace (no requires), then algo-basics/technique-recursion-sum-code
- global `calls` counter / two calls on one line → DEFINE

## complexity-shrink-by-one-vs-half
- T(n) = T(n − 1) + n recurrence notation → MOVE algo-basics/complexity-cost-trace-shrink-recurrence (requires complexity-cost-trace-doubling)
- Θ → MOVE algo-basics/complexity-asym-theta-sandwich
- n(n+1)/2 and n + n/2 + … < 2n sums → MOVE algo-basics/complexity-cost-arithmetic-sum and complexity-cost-geometric-sum
- two runs in one trace

## complexity-space-stack-depth
- space complexity, stack frame → MOVE algo-basics/technique-call-stack-trace
- `std::max` (no include shown) → DEFINE: 'std::max(a,b) is the larger'
- `cond ? x : y` ternary → DEFINE (cpp-essentials has no ternary Card) 
- 3+ new ideas (space complexity, stack frames, depth counter instrumentation); two runs

## linear-array-index-contiguity
- `base + i`, `sizeof(T)`, pointer arithmetic → MOVE algo-basics/linear-address-formula (no requires)
- pointer / `Node*` / `nullptr` → REQUIRE cpp-essentials/ptr-holds-an-address
- `p->field` → MOVE cpp-basics/ptr-arrow-null-check (check its own requires)
- linked list used as the contrast before linear-list-node teaches it → DEFINE: 'list: nodes scattered in memory, each holding the address of the next'
- 'dependent loads' → DEFINE: 'each load needs the previous one's result'
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## linear-array-insert-shift
- array with spare room (`int a[8]` holding 5) → DEFINE: 'a[5..7] is unused capacity'
- `memmove` → DEFINE: 'one bulk copy of a block of memory'
- `std::vector` → REQUIRE cpp-essentials/containers-default-to-vector
- two-line state change with `i`, `moved`, `n`, `a`: 4 variables to track

## linear-cost-table
- `std::vector` → REQUIRE cpp-essentials/containers-default-to-vector
- pointer / `Node*` / `nullptr` → REQUIRE cpp-essentials/ptr-holds-an-address
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## linear-deque-both-ends
- std::deque, std::list, std::queue, ring buffer (the answer is a container never introduced) → NEW: basic Card 'the sequence-container menu: vector / deque / list / queue and what each does in O(1)'
- `std::queue` → NEW (see above)
- 3+ new ideas (history-window requirement, three containers, block storage)

## linear-doubly-unlink-code
- pointer / `Node*` / `nullptr` → REQUIRE cpp-essentials/ptr-holds-an-address
- `p->field` → MOVE cpp-basics/ptr-arrow-null-check (check its own requires)
- default member initialiser `Node* prev = nullptr;` → MOVE cpp-basics/class-default-member-initialiser
- `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## linear-dynamic-array-growth
- 1+2+4+…<2n geometric series → MOVE algo-basics/complexity-cost-geometric-sum
- 10+20+30+…≈n²/20 → MOVE algo-basics/complexity-cost-arithmetic-sum
- capacity vs size, allocate → REQUIRE cpp-essentials/iter-size-vs-capacity
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## linear-list-insert-misconception
- `std::list` → NEW: basic Card on std::list (doubly linked, O(1) insert at a held iterator, no indexing) plus the sequence-container menu
- `std::next(lst.begin(), 500)` / iterator → REQUIRE cpp-essentials/iter-end-one-past; DEFINE: 'std::next(it, k) advances an iterator k places'
- `std::vector` → REQUIRE cpp-essentials/containers-default-to-vector

## linear-list-node
- pointer / `Node*` / `nullptr` → REQUIRE cpp-essentials/ptr-holds-an-address

## linear-list-traverse-chunk
- pointer / `Node*` / `nullptr` → REQUIRE cpp-essentials/ptr-holds-an-address
- `p->field` → MOVE cpp-basics/ptr-arrow-null-check (check its own requires)
- `const Node*` → REQUIRE cpp-essentials/const-pointer-read-rule
- `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## linear-prefix-sum-range
- prefix sum notation p[i] = a[0]+…+a[i−1] → DEFINE: 'sum of the first i elements; p[0] is the empty sum 0'
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## linear-queue-ring
- queue (FIFO) never defined → MOVE algo-basics/linear-queue-adt (requires linear-adt-vs-implementation)
- `v.erase(v.begin())` → REQUIRE cpp-essentials/chunks-erase-remove (or DEFINE)

## linear-ring-buffer-code
- `struct` with fields/member functions → REQUIRE cpp-essentials/class-struct-vs-class
- `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- `cond ? 0 : x` ternary and `% N` wrap → DEFINE
- 3+ new ideas (struct with member functions, constexpr harness, modular wrap, head/tail protocol)

## linear-stack-recognition
- stack (LIFO) never defined; the answer is its name → MOVE algo-basics/linear-stack-adt (requires linear-adt-vs-implementation)

## linear-two-pointers-code
- `std::span<const int>` → REQUIRE cpp-essentials/vocab-span-parameter
- `(int)a.size()` C-style cast → REQUIRE cpp-essentials/types-static-cast-value; DEFINE: size() is unsigned
- `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer

## linear-two-pointers-sorted-pair
- 'pointers' lo/hi are array indices here → DEFINE: 'lo and hi are indices, called pointers',
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## hashing-average-vs-worst
- hash table, key, bucket, hash function never defined in its closure → MOVE algo-basics/hashing-direct-address then algo-basics/hashing-index-mod-trace (both no requires); fix once on hashing-chaining
- probe run → REQUIRE interview-essentials/hashing-open-addressing
- hash flooding / seeded hash → DEFINE: 'attacker picks keys that collide; a random seed makes that impractical'
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## hashing-chaining
- hash table, hash, key, collision, bucket (ROOT: nothing defines 'hash'; `12 % 5` is assumed to be the hash) → MOVE algo-basics/hashing-direct-address (no requires), algo-basics/hashing-index-mod-trace (no requires), algo-basics/hashing-pigeonhole (requires index-mod-trace)

## hashing-direct-address-limit
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)
- hash table = 'computes a small index from the key' → DEFINE (done in back, front already says hash)

## hashing-equal-keys-equal-hashes
- `std::unordered_set<std::string, NameHash, NameEq>` custom hasher/equality template arguments, functor `operator()`, `std::hash<std::string>{}(s)`, `size_t`, `contains`, brace-init, function declaration → TOO ADVANCED: custom hasher/equality functors are post-sprint; the contract is already taught by hashing-contract-direction (re-ask it with a tiny `h(key)` function if a second angle is wanted)
- UB → REQUIRE cpp-essentials/ub-definition (if kept)

## hashing-explain-chained-table
- `h(k) mod m` / expected chain length → REQUIRE interview-essentials/complexity-big-o-scaling (O(1) on average)

## hashing-load-factor-limit
- Abseil / Swiss tables → DEFINE: 'Google's C++ library; its hash table design' (or drop)

## hashing-load-factor
- `std::unordered_map`, `max_load_factor` → REQUIRE cpp-essentials/containers-map-vs-unordered-map
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## hashing-probe-lookup-stop
- `std::array<T, N>` → MOVE cpp-basics/iter-array-fixed-size (requires cpp-essentials/iter-size-vs-capacity, cpp-basics/tmpl-class-member-type)
- `const std::array<int, N>&` parameter → REQUIRE cpp-essentials/const-ref-parameter
- `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- `#include <array>` → DEFINE once for the Deck

## search-binary-search-chunk
- the algorithm shown as code before its idea: the explaining Card is search-binary-search-halving → REQUIRE interview-essentials/search-binary-search-halving
- integer division `(hi − lo) / 2` → DEFINE: 'rounds down'
- `return mid` / `-1` for 'absent' inside a snippet → DEFINE: 'sits inside a function returning the index, or -1'

## search-binary-search-halving
- log₂ n → MOVE algo-basics/complexity-asym-log-rules (requires big-o-definition)
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## search-first-true-predicate
- predicate → DEFINE: 'a function that returns true or false'
- `std::partition_point` → DEFINE: 'given a range whose elements are true…true, false…false under p, returns the first false'

## search-half-open-invariant
- half-open notation `a[lo..hi)` / `[0, n)` → DEFINE: '[ includes, ) excludes the end index'

## search-lower-bound-meaning
- returns an iterator, but the Card talks of 'index' → DEFINE: 'std::lower_bound returns an iterator; index is it − a.begin()'
- iterator → REQUIRE cpp-essentials/iter-end-one-past

## search-midpoint-overflow
- `int` overflow, `INT_MAX`, signed overflow UB → REQUIRE cpp-essentials/types-overflow-rules and cpp-essentials/ub-definition
- `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- half-open `[lo, hi)` → DEFINE (see search-half-open-invariant)

## search-on-answer-monotone
- `bool fits(int cap);` declaration without body → REQUIRE cpp-essentials/fn-declaration-vs-definition (or DEFINE: 'body omitted, assume it works')
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## tree-avl-vs-red-black
- AVL, red-black, rotations, 1.44 log₂ n, libstdc++ → TOO ADVANCED: rotation-count trade-offs are post-sprint trivia; keep tree-balance-families and tree-why-balance
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## tree-balance-families
- AVL, red-black, B-tree, rotation, node split/merge → DEFINE each in a clause, or MOVE algo-basics/tree-btree-node for B-tree (check its requires)
- 3+ new ideas in one cloze (three tree families, two repair mechanisms)
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## tree-bst-check-bounds
- index-encoded tree (`t.key[v]`, `t.left[v]`, -1 = none) → DEFINE: 'node v is an index; key[], left[], right[] are parallel arrays, -1 means no child'
- `const auto&` parameter → MOVE cpp-basics/tmpl-auto-param-cloze
- recursion on a tree + passing bounds → MOVE algo-basics/tree-recursive-def (no requires), recursion / stack frames → MOVE algo-basics/technique-call-stack-trace (no requires), then algo-basics/technique-recursion-sum-code
- `#include <climits>`, `INT_MIN`/`INT_MAX` → DEFINE
- `constexpr bool` + `&&` short-circuit → `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)
- 3+ new ideas (array-encoded tree, recursion, bounds window)

## tree-bst-delete-cases
- three delete cases in one Card → flag: 3+ ideas (leaf / one child / two children + successor); split into two Cards

## tree-bst-inorder-trace
- in-order traversal is the lesson but only tree-bst-rule is required → REQUIRE interview-essentials/tree-traversal-orders
- `struct Node` (key, left, right) not shown → DEFINE: show the struct
- `const Node*`, `->` chain `root->left->right` → `p->field` → MOVE cpp-basics/ptr-arrow-null-check (check its own requires) and cpp-essentials/const-pointer-read-rule
- `std::string out; out += std::to_string(k) + ' '` → DEFINE: 'to_string turns a number into text; += appends'
- recursion / stack frames → MOVE algo-basics/technique-call-stack-trace (no requires), then algo-basics/technique-recursion-sum-code
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)
- 3+ new ideas (recursion, string accumulation, pointer chains); no worked example first

## tree-height-code
- index-encoded tree (`t.key[v]`, `t.left[v]`, -1 = none) → DEFINE: 'node v is an index; key[], left[], right[] are parallel arrays, -1 means no child'
- `const auto&` parameter → MOVE cpp-basics/tmpl-auto-param-cloze
- recursion on a tree → MOVE algo-basics/tree-recursive-def (+ technique-recursion-sum-code)
- `std::max` → DEFINE
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## tree-level-order-code
- `std::array<T, N>` → MOVE cpp-basics/iter-array-fixed-size (requires cpp-essentials/iter-size-vs-capacity, cpp-basics/tmpl-class-member-type)
- post-increment inside an index (`x[head++]`) → MOVE cpp-core/operators-postfix-increment
- queue stored in an array with head/tail indices → MOVE algo-basics/linear-queue-adt
- BFS named before it is taught → DEFINE one clause
- index-encoded tree (`t.key[v]`, `t.left[v]`, -1 = none) → DEFINE: 'node v is an index; key[], left[], right[] are parallel arrays, -1 means no child'
- `const auto&` parameter → MOVE cpp-basics/tmpl-auto-param-cloze
- 3+ new ideas (index-encoded tree, array queue, post-increment)

## tree-terms
- 'child', 'binary tree' used but never defined → MOVE algo-basics/tree-recursive-def (no requires)

## tree-trie-end-flag
- trie never defined → DEFINE: 'a tree with one letter per edge; a root-to-node path spells a prefix'
- tree / node / child / root → REQUIRE interview-essentials/tree-terms

## tree-why-balance
- balanced / height O(log n) → REQUIRE interview-essentials/complexity-big-o-scaling

## heap-child-index-code
- complete binary tree, node, child → REQUIRE interview-essentials/tree-terms (card has no requires)
- `std::size_t` → DEFINE: 'unsigned type used for sizes and indices'
- `#include <cstddef>`, `constexpr` → DEFINE; `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer

## heap-heapify-linear
- 'sifts down at most its height', series 512·0+256·1+… < n → TOO ADVANCED: the O(n) heapify proof is post-sprint; keep the fact in heap-op-costs
- 3+ new ideas (heapify, node height, series sum)

## heap-heapify-order-code
- `for (size_t i = h.size()/2; i-- > 0;)` unsigned countdown → REQUIRE cpp-essentials/ub-unsigned-countdown-trace; post-increment inside an index (`x[head++]`) → MOVE cpp-core/operators-postfix-increment
- `std::size_t` → DEFINE: 'unsigned type used for sizes and indices'
- `auto& h` parameter + forward declaration `sift_down(...);` → `const auto&` parameter → MOVE cpp-basics/tmpl-auto-param-cloze
- 3+ new ideas (bottom-up order, countdown idiom, sift_down precondition)

## heap-min-comparator
- `std::make_heap(first, last, comp)` → DEFINE: 'rearranges a range into a heap ordered by comp'
- comparator → REQUIRE cpp-essentials/stdalgo-comparator-strict
- `std::greater<>()` → DEFINE: 'function object computing a > b'
- `due.begin()`/`front()` iterators → REQUIRE cpp-essentials/iter-end-one-past
- `std::priority_queue<int, std::vector<int>, std::greater<>>` → DEFINE or drop from back

## heap-op-costs
- priority queue → MOVE algo-basics/heap-pq-adt-trace (no requires)

## heap-push-trace
- sift-up never defined; `push(h, x)`/`index_of(h, x)` are hidden helpers → DEFINE: 'sift up: swap with parent while larger'
- comma declaration `int s = ..., at = ...;` → extraneous machinery; use two statements
- no worked example of push first → NEW: basic worked-example Card for heap push

## heap-shape-and-order
- tree / node / child / root → REQUIRE interview-essentials/tree-terms
- heap / max-heap purpose (priority queue) → MOVE algo-basics/heap-pq-adt-trace

## heap-sift-down-code
- sift down / pop never defined before use → DEFINE: 'sift down: swap with a child until heap order holds'; pop → MOVE algo-basics/heap-pq-adt-trace
- `for (size_t c; (c = 2*i+1) < n; i = c)` assignment-in-condition `for` → DEFINE or rewrite as while
- `std::size_t` → DEFINE: 'unsigned type used for sizes and indices'
- `std::swap` → MOVE algo-basics/sort-swap-temp
- `const auto&` parameter → MOVE cpp-basics/tmpl-auto-param-cloze
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)
- 3+ new ideas (sift-down contract, child selection, odd loop shape)

## heap-vs-bst
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## sort-compare-properties
- quicksort, 'smaller side recursed first', call-stack space → REQUIRE interview-essentials/sort-quick-worst and interview-essentials/complexity-space-stack-depth
- insertion sort covered only by elementary-compare; 5 sorts × 2 properties in one table → split per property (rule: list > 3 items)
- stable / in place / extra space vocabulary → DEFINE 'in place = O(1) extra space'

## sort-counting-idea
- prefix sum → REQUIRE interview-essentials/linear-prefix-sum-range
- comparison sort / lower bound → via sort-lower-bound (see its TOO ADVANCED)

## sort-elementary-compare
- sorted/unsorted prefix; 499 500 = 999+998+…+1 → DEFINE
- comparison counts, O(n²) → REQUIRE interview-essentials/complexity-big-o-scaling

## sort-heap-sort
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)
- heap sort, sift-down → via heap-heapify-order-code (ok); 'selection sort' from elementary-compare (ok)

## sort-lomuto-trace
- pivot, partition, quicksort, Lomuto never defined → MOVE algo-basics/sort-quick-idea then algo-basics/sort-partition-regions (requires sort-swap-temp, sort-quick-idea)
- `std::array a{4, 7, ...}` (deduced type) → MOVE cpp-core/initialization-array-ctad; `std::array<T, N>` → MOVE cpp-basics/iter-array-fixed-size (requires cpp-essentials/iter-size-vs-capacity, cpp-basics/tmpl-class-member-type)
- `std::swap(a[i], a[store++])` → MOVE algo-basics/sort-swap-temp; post-increment inside an index (`x[head++]`) → MOVE cpp-core/operators-postfix-increment
- `std::size_t` → DEFINE: 'unsigned type used for sizes and indices'
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)
- trace budget: ~10 state changes over a 6-element array (>8)

## sort-lower-bound
- n! orders, decision-tree argument, log₂(n!) ≈ n log₂ n − 1.44n (Stirling), 2ᵏ answers → TOO ADVANCED: information-theoretic lower bound is post-sprint; keep the fact 'comparison sorts need Ω(n log n)' as a DEFINE on sort-counting-idea
- factorial notation → DEFINE

## sort-merge-idea
- merge sort and 'merging' never defined → MOVE algo-basics/sort-merge-runs-trace (requires sort-sorted-postcondition)
- Θ, best/average/worst → MOVE algo-basics/complexity-asym-theta-sandwich and algo-basics/complexity-cost-cases
- 'already sorted' input; 'depth log₂ n' → via log-halvings (ok)

## sort-merge-space
- 'run', two-pointer merge → MOVE algo-basics/sort-merge-runs-trace
- `std::inplace_merge` → DEFINE or drop

## sort-merge-stable-code
- extraneous machinery: `bool operator==(const Rec&) const = default;` (harness leak) → hide in harness or MOVE cpp-basics/class-compare-defaulted-shortcut
- `struct` with fields/member functions → REQUIRE cpp-essentials/class-struct-vs-class
- `std::array<T, N>` → MOVE cpp-basics/iter-array-fixed-size (requires cpp-essentials/iter-size-vs-capacity, cpp-basics/tmpl-class-member-type)
- `std::array<Rec,3>` by value, `out[k++] = cond ? A : B` → post-increment inside an index (`x[head++]`) → MOVE cpp-core/operators-postfix-increment; ternary DEFINE
- `std::size_t` → DEFINE: 'unsigned type used for sizes and indices'

## sort-pivot-choice
- expected cost vs worst case on an adversarial input → MOVE algo-basics/complexity-cost-cases
- median-of-three, median-of-medians, McIlroy 1999 → DEFINE each in a clause or drop (3+ new ideas)
- random pivot 'expected Θ(n log n)' → MOVE algo-basics/complexity-asym-theta-sandwich
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## sort-quick-worst
- quicksort itself never defined (lomuto only partitions) → MOVE algo-basics/sort-quick-idea; recursion with lo/hi → recursion / stack frames → MOVE algo-basics/technique-call-stack-trace (no requires), then algo-basics/technique-recursion-sum-code
- `std::vector<int>&` reference parameter → REQUIRE cpp-essentials/ptr-reference-vs-pointer
- hidden helper `lomuto(...)` that bumps `cmp` → DEFINE
- trace budget: three 7-element runs with recursion (limit is one run, ≤8 state changes)
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## sort-quickselect-trace
- quickselect, k-th smallest 0-based → DEFINE worked example first (NEW: basic Card for quickselect idea)
- 3 runs of lomuto on 7 elements hidden in `lomuto(...)`; trace budget exceeded
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## sort-std-sort-vs-stable
- introsort, in place, O(n log² n), libstdc++, ⌈n/2⌉ elements → DEFINE each (introsort: 'quicksort that falls back to heap sort when recursion gets too deep'; libstdc++: 'GCC's standard library')
- log² n → MOVE algo-basics/complexity-asym-log-rules

## graph-adjacency-list-vs-matrix
- graph, vertex, edge, V/E → MOVE algo-basics/graph-vertex-edge-sets (no requires)
- sparse / dense, deg(u), ≪ → DEFINE
- adjacency list / matrix defined only by the diagram → DEFINE one clause each
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## graph-bellman-ford-rounds
- relax, negative cycle → DEFINE: 'relax (u,v,w): if dist[u]+w < dist[v], lower dist[v]'; 'negative cycle: a cycle whose weights sum below 0'
- weighted shortest path → via graph-dijkstra-why-nonnegative (itself missing Dijkstra, see below)
- 3+ new ideas (relaxation, round-k invariant, negative edges)
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## graph-bfs-and-dfs
- graph, vertex, edge, V/E → MOVE algo-basics/graph-vertex-edge-sets (no requires)
- graph terms absent from the whole chain; root fix on graph-list-from-edges-chunk

## graph-bfs-distance-code
- `std::array<int,6> dist{-1,...}, queue{s};` named `queue`, rows padded with -1 (`v != -1`), `for (int head=0, tail=1; head<tail;)` → extraneous machinery; DEFINE padding convention
- `std::array<T, N>` → MOVE cpp-basics/iter-array-fixed-size (requires cpp-essentials/iter-size-vs-capacity, cpp-basics/tmpl-class-member-type)
- post-increment inside an index (`x[head++]`) → MOVE cpp-core/operators-postfix-increment
- `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- `const auto&` parameter → MOVE cpp-basics/tmpl-auto-param-cloze
- range-for `for (T x : c)` → REQUIRE cpp-essentials/iter-range-for-alias
- 3+ new ideas (array queue, -1 padding, distance recurrence)

## graph-bfs-mark-on-push
- post-increment inside an index (`x[head++]`) → MOVE cpp-core/operators-postfix-increment
- array queue `queue[tail++]`, `continue`, dense graph → DEFINE 'dense: E close to V²'
- inconsistent with graph-bfs-queue-chunk (std::queue vs array queue) → pick one
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## graph-bfs-queue-chunk
- `std::queue` (push/front/pop/empty; `front()` does not remove) → NEW: basic Card on the container adaptors std::queue/std::stack
- range-for `for (T x : c)` → REQUIRE cpp-essentials/iter-range-for-alias
- graph, vertex, edge, V/E → MOVE algo-basics/graph-vertex-edge-sets (no requires)
- `seen` array/vector<bool> and source `s` undefined → DEFINE
- `int u = q.front(); q.pop();` → DEFINE

## graph-components-code
- connected component → MOVE algo-basics/graph-path-cycle-component (requires graph-vertex-edge-sets)
- nested `std::array<std::array<int,2>,6>` with -1 padding, struct member function recursion in constexpr → `std::array<T, N>` → MOVE cpp-basics/iter-array-fixed-size (requires cpp-essentials/iter-size-vs-capacity, cpp-basics/tmpl-class-member-type); `struct` with fields/member functions → REQUIRE cpp-essentials/class-struct-vs-class; `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- range-for `for (T x : c)` → REQUIRE cpp-essentials/iter-range-for-alias
- DFS used as a function before DFS has a plain-code Card → fine only after graph-dfs-call-stack-trace

## graph-cycle-directed-grey
- directed graph, cycle → MOVE algo-basics/graph-directed-vs-undirected and algo-basics/graph-cycle-spot
- DFS colours white/grey/black → DEFINE (done in back; front uses 'DFS path')

## graph-dfs-call-stack-trace
- DFS algorithm itself never taught (bfs-and-dfs only contrasts stack/queue) → REQUIRE interview-essentials/graph-bfs-and-dfs
- recursion / stack frames → MOVE algo-basics/technique-call-stack-trace (no requires), then algo-basics/technique-recursion-sum-code
- `const std::vector<int> adj[5] = {{3,1},{0,2},...}` array of vectors with nested braces → `std::vector` → REQUIRE cpp-essentials/containers-default-to-vector; DEFINE
- `path += char('0' + u)`, `path.pop_back()`, probes inside empty `if (u == 4) {}` → extraneous machinery
- 3+ new ideas (recursion, string bookkeeping, array-of-vectors)

## graph-dfs-discovery-finish-trace
- discovery/finish time, directed edges → MOVE algo-basics/graph-directed-vs-undirected; recursion / stack frames → MOVE algo-basics/technique-call-stack-trace (no requires), then algo-basics/technique-recursion-sum-code
- trace budget: 10 stamps across two 5-element arrays (limit ≤8 state changes, ≤2 values per probe)
- 3+ new ideas (timestamps, nested intervals, outer restart loop)

## graph-dijkstra-popped-final
- Dijkstra's algorithm is argued about but never taught (tentative distance, pop-min, relax) → NEW: basic worked-example Card 'Dijkstra step by step on a 4-vertex graph' (REQUIRE heap-min-comparator and graph-bfs-why-shortest)
- weighted graph / edge weight → DEFINE; algo-basics/graph-spanning-tree-weight has a weight definition (requires graph-spanning-tree-def)
- 'priority queue' → MOVE algo-basics/heap-pq-adt-trace

## graph-dijkstra-why-nonnegative
- Dijkstra's algorithm never taught → same NEW worked-example Card
- weighted directed edge notation `s → u weight 1` → DEFINE

## graph-explain-visited-linear
- degree sum = 2E (handshake) → MOVE algo-basics/graph-degree-from-edge-list (requires graph-edge-ordered-pair)
- graph, vertex, edge, V/E → MOVE algo-basics/graph-vertex-edge-sets (no requires)
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## graph-kahn-trace
- `std::queue` (push/front/pop/empty; `front()` does not remove) → NEW: basic Card on the container adaptors std::queue/std::stack
- in-degree, topological order → via graph-topo-order (ok), which itself lacks directed/cycle terms
- `--indeg[v] == 0` pre-decrement inside a condition → DEFINE
- `std::to_string`, `order += ...` → DEFINE
- global state mutated by `step()` → extraneous machinery
- no worked example of Kahn's algorithm first → NEW: basic Card walking Kahn on a 3-vertex DAG
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## graph-list-from-edges-chunk
- edge list, adjacency list, vertices/edges (ROOT of the graph chain, no requires) → graph, vertex, edge, V/E → MOVE algo-basics/graph-vertex-edge-sets (no requires); MOVE algo-basics/graph-edge-ordered-pair
- `auto [u, v] : edges` structured binding → NEW: basic Card on structured bindings ('auto [a,b] = pair unpacks its two members')
- `std::vector<std::vector<int>> adj(n)` → `std::vector` → REQUIRE cpp-essentials/containers-default-to-vector; DEFINE: 'n empty vectors'
- `const auto& edges`, `constexpr auto` return → `const auto&` parameter → MOVE cpp-basics/tmpl-auto-param-cloze
- 3+ new ideas (edge list vs adjacency list, vector-of-vectors, structured bindings, undirected double push)

## graph-topo-order
- directed edge `a → b`, cycle, DAG → MOVE algo-basics/graph-edge-ordered-pair, algo-basics/graph-directed-vs-undirected, algo-basics/graph-cycle-spot
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## graph-union-find-forest
- union-find / disjoint sets / the problem it solves never stated → NEW: basic Card 'disjoint sets: merge two groups and ask if two items share a group'
- forest/tree/root → tree / node / child / root → REQUIRE interview-essentials/tree-terms
- `parent[r] == r` array-as-forest → covered once the NEW Card exists

## graph-union-find-path-compression
- `return parent[x] = find(parent[x]);` assignment as an expression + recursion → recursion / stack frames → MOVE algo-basics/technique-call-stack-trace (no requires), then algo-basics/technique-recursion-sum-code
- inverse Ackermann α(n) → DEFINE: 'grows so slowly it is below 5 for any real n' (or drop)
- union by rank mentioned before it is taught (graph-union-find-union-code is not required)
- `std::array<T, N>` → MOVE cpp-basics/iter-array-fixed-size (requires cpp-essentials/iter-size-vs-capacity, cpp-basics/tmpl-class-member-type)
- `struct` with fields/member functions → REQUIRE cpp-essentials/class-struct-vs-class
- `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## graph-union-find-union-code
- rank, tree height → tree / node / child / root → REQUIRE interview-essentials/tree-terms
- `struct` with fields/member functions → REQUIRE cpp-essentials/class-struct-vs-class
- `std::array<T, N>` → MOVE cpp-basics/iter-array-fixed-size (requires cpp-essentials/iter-size-vs-capacity, cpp-basics/tmpl-class-member-type)
- `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- swap via temporary `const int t = a; a = b; b = t;` → MOVE algo-basics/sort-swap-temp
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## technique-activity-selection
- half-open intervals `[start, end)` → DEFINE
- greedy never defined (only in the coin trace's prose) → REQUIRE via technique-greedy-coins-counterexample (ok)
- lambda `[](T a, T b){...}` → REQUIRE cpp-essentials/stdalgo-lambda-syntax
- `std::sort(t.begin(), t.end(), cmp)` → REQUIRE cpp-essentials/stdalgo-sort-by-length
- `template <std::size_t N>` → REQUIRE cpp-essentials/tmpl-function-syntax
- `std::array<T, N>` → MOVE cpp-basics/iter-array-fixed-size (requires cpp-essentials/iter-size-vs-capacity, cpp-basics/tmpl-class-member-type)
- range-for `for (T x : c)` → REQUIRE cpp-essentials/iter-range-for-alias
- `struct` with fields/member functions → REQUIRE cpp-essentials/class-struct-vs-class
- 4+ new ideas at once (template, std::array, sort with lambda, greedy loop)

## technique-backtracking-state-space
- subset sum problem never stated → DEFINE: 'choose a subset of the items whose sum equals a target'
- depth-first walk of a decision tree → via recursion-unwind (ok)

## technique-backtracking-undo
- permutation → DEFINE: 'an ordering of all the items'

## technique-coin-change-table
- `template <std::size_t N>` → REQUIRE cpp-essentials/tmpl-function-syntax
- `std::array<T, N>` → MOVE cpp-basics/iter-array-fixed-size (requires cpp-essentials/iter-size-vs-capacity, cpp-basics/tmpl-class-member-type)
- digit separator `1'000'000` → DEFINE
- `std::min` → DEFINE
- range-for `for (T x : c)` → REQUIRE cpp-essentials/iter-range-for-alias
- coin-change problem and `dp` table → DEFINE: 'dp[a]: fewest coins that pay a'
- `std::array<int,101> dp{}` zero-initialised → DEFINE

## technique-dp-overlapping-subproblems
- memo / memoisation / memo table never defined → DEFINE: 'a table that caches each call's answer by its arguments' or MOVE algo-basics/technique-dp-memo-calls (check its requires)
- fib(n) → DEFINE: 'fib(n) = fib(n−1)+fib(n−2)'
- exponential → DEFINE

## technique-dp-state
- dp table, recurrence, 'state' (no Card has introduced a table yet; memo-vs-table comes later) → DEFINE: 'dp[i] is a table cell holding the answer to subproblem i, filled in increasing i'
- `std::array<T, N>` → MOVE cpp-basics/iter-array-fixed-size (requires cpp-essentials/iter-size-vs-capacity, cpp-basics/tmpl-class-member-type)
- `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- 3+ new ideas (state, recurrence, base cases)

## technique-exchange-argument
- exchange argument proof (end(g) ≤ end(o) swap) → TOO ADVANCED: formal greedy-correctness proofs are post-sprint; technique-greedy-vs-dp already gives the recognition rule
- 3+ new ideas (optimal schedule o, greedy choice g, swap invariance)

## technique-fast-power
- `int& calls` output reference parameter (instrumentation leaks into real code) → REQUIRE cpp-essentials/ptr-reference-vs-pointer; drop the counter
- T(n) = T(n/2) + O(1) recurrence → MOVE algo-basics/complexity-cost-trace-shrink-recurrence
- `n % 2 ? a : b` → DEFINE
- recursion → recursion / stack frames → MOVE algo-basics/technique-call-stack-trace (no requires), then algo-basics/technique-recursion-sum-code
- `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer

## technique-greedy-coins-counterexample
- greedy / canonical coin systems → DEFINE: 'greedy: always take the locally best choice'
- `const int* coins` array passed as pointer → REQUIRE cpp-essentials/ptr-array-name-to-pointer
- two runs in one trace (limit one run)

## technique-knapsack-direction
- 0/1 knapsack problem (weights, values, capacity W) → DEFINE: 'pick items, each at most once, total weight ≤ W, maximising total value'
- `template <std::size_t N>` → REQUIRE cpp-essentials/tmpl-function-syntax
- `std::array<T, N>` → MOVE cpp-basics/iter-array-fixed-size (requires cpp-essentials/iter-size-vs-capacity, cpp-basics/tmpl-class-member-type)
- `struct` with fields/member functions → REQUIRE cpp-essentials/class-struct-vs-class
- range-for `for (T x : c)` → REQUIRE cpp-essentials/iter-range-for-alias
- `std::max` → DEFINE

## technique-lcs-match
- 2D array `int dp[16][16] = {}` → DEFINE: 'row i, column j; all zero'
- `std::string_view` → REQUIRE cpp-essentials/strings-string-view-parameter
- `std::size_t` → DEFINE: 'unsigned type used for sizes and indices'
- `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- ternary with the blank inside a chain → DEFINE
- 3+ new ideas (subsequence, 2D table, last-character case split)

## technique-max-invariant-code
- loop invariant, precondition → MOVE algo-basics/technique-loop-invariant-sum (no requires)
- half-open `a[0..i)` notation → DEFINE
- `std::span<const int>` → REQUIRE cpp-essentials/vocab-span-parameter
- `(int)a.size()` C-style cast → REQUIRE cpp-essentials/types-static-cast-value
- `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer

## technique-max-start-element-code
- `std::numeric_limits<int>::min()` → DEFINE: 'the smallest int, −2³¹'
- identity element → DEFINE (back does) 
- `std::max_element` returns `end()` → REQUIRE cpp-essentials/iter-end-one-past
- `std::span<const int>` → REQUIRE cpp-essentials/vocab-span-parameter
- range-for `for (T x : c)` → REQUIRE cpp-essentials/iter-range-for-alias

## technique-memo-vs-table
- memoised recursion vs bottom-up table → DEFINE: 'top-down caches on demand; bottom-up fills in order'
- `long f[91] = {0, 1};` partial array initialisation → DEFINE

## technique-recursion-depth
- pointer / `Node*` / `nullptr` → REQUIRE cpp-essentials/ptr-holds-an-address
- `-O0`, `ulimit -s`, stack overflow → DEFINE: '-O0: no optimisation; the crash is a stack overflow'

## technique-recursion-unwind
- recursion itself (this is the Deck's recursion root, requires nothing) → recursion / stack frames → MOVE algo-basics/technique-call-stack-trace (no requires), then algo-basics/technique-recursion-sum-code; a stack-frame worked example must precede this trace
- `out += char('0' + n)` → DEFINE: 'turns a digit into its character'
- global `out` and `calls` → extraneous machinery

## foundations-bits-lowest-set-bit
- binary numerals, bitwise `&` and `~`, 'set bit', two's complement `-x = ~x + 1` → NEW: basic Card 'binary numbers and the bitwise operators & | ~ << >>'
- unsigned negation wraps → REQUIRE cpp-essentials/types-overflow-rules

## foundations-bits-trace
- `0b0110'1000` binary literal and digit separator → DEFINE
- `std::uint32_t`, `<cstdint>`, `std::popcount`, `<bit>` → DEFINE
- `x &= x - 1` compound assignment → DEFINE
- 4 probes (limit 3) and probe @4 reuses mutated `x` → shrink
- bit primer → NEW: binary numbers and bitwise operators (same Card as above)

## foundations-cache-cost-model
- cache, cache miss, cache line, spatial locality, prefetching, pointer chasing → NEW: basic Card 'what a CPU cache is: small fast memory in front of RAM, loaded a line at a time'
- 3+ new ideas (cache line, locality, prefetch, pointer chasing)

## foundations-growth-below-two
- allocator block reuse, coalescing, golden ratio φ, fbvector → TOO ADVANCED: allocator behaviour is post-sprint; foundations-growth-factor already carries the interview point

## foundations-growth-factor
- Θ(n), n·g/(g−1), geometric series → MOVE algo-basics/complexity-cost-geometric-sum and algo-basics/complexity-asym-theta-sandwich
- dynamic array growth → REQUIRE interview-essentials/linear-dynamic-array-growth
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## foundations-latency-scale
- L1 cache, DRAM, cycles, ns, x86-64, 'random access', B-tree/red-black node/open addressing/chaining named in the back (ROOT, no requires, ~20 Cards lean on it) → NEW: basic Card 'memory hierarchy primer: registers, L1/L2/L3 cache, DRAM; one cycle ≈ 0.3 ns; what 'miss' means'

## seq-invalidation-rules
- iterator, pointer, reference to an element, invalidation → REQUIRE cpp-essentials/containers-stable-references and cpp-essentials/iter-growth-invalidates
- `std::map` erase → REQUIRE cpp-essentials/containers-map-vs-unordered-map
- 3 containers × 3 handle kinds in one cloze (3+ ideas)

## seq-ring-buffer-full-vs-empty
- ring buffer, head/tail → REQUIRE interview-essentials/linear-queue-ring
- 'masks them' (bit mask) used before seq-ring-buffer-mask teaches it → DEFINE: 'mask: i & (N−1) equals i % N when N is a power of two'
- free-running 64-bit counters / 584 years → DEFINE: 'the counters only ever increase'

## seq-ring-buffer-mask
- `x & (n − 1)` as modulo, power of two → NEW: basic Card 'binary numbers and the bitwise operators' (same as foundations-bits-lowest-set-bit)
- `std::has_single_bit`, `<bit>`, `static_assert`, `inline constexpr`, `static_cast<std::size_t>`, `std::uint64_t` → REQUIRE cpp-essentials/ub-static-assert-finds-ub and cpp-essentials/types-static-cast-value; `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- LMAX Disruptor, 'tens of cycles of integer division' → DEFINE or drop
- 3+ new ideas (bitmask wrap, power-of-two invariant, free-running sequence)

## seq-ring-waste-one-slot
- ring buffer, head, tail never defined → REQUIRE interview-essentials/linear-queue-ring
- `bool full() const` member function → REQUIRE cpp-essentials/class-const-object-call

## seq-vector-vs-deque
- vector reallocation moving elements → REQUIRE cpp-essentials/iter-explain-vector-growth and cpp-essentials/containers-stable-references
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## hash-chaining-vs-open-addressing
- `Node{K key; V val; Node* next;}` with unspecified K, V → DEFINE: 'K = key type, V = value type'
- pointer / `Node*` / `nullptr` → REQUIRE cpp-essentials/ptr-holds-an-address
- 'dependent load', allocator → DEFINE

## hash-unordered-map-is-chained
- rehash → DEFINE: 'rebuild with more buckets, moving elements'
- reference stability → REQUIRE cpp-essentials/containers-stable-references
- `book[42]` inserts → REQUIRE cpp-essentials/iter-map-subscript-inserts
- `absl::flat_hash_map`, `boost::unordered_flat_map`, bucket interface, 'conforming' → DEFINE or drop
- 3+ new ideas (standard's reference guarantee, node layout, rehash)

## db-lru-recency-bet
- cache (software) and hit rate → DEFINE: 'cache: a small store of recently used entries; hit = found there'
- temporal locality, database buffer pool, table scan → DEFINE or drop

## ll-hardware-numbers
- core, cache coherence, exclusive ownership of a line → NEW: basic Card 'multi-core caches: a line is writable by one core at a time (false-sharing primer)'
- `alignas` → REQUIRE cpp-essentials/layout-alignas-sizeof
- AArch64, Apple M-series → DEFINE or drop

## ll-false-sharing
- `std::atomic<T>` and threads → REQUIRE cpp-essentials/conc-thread-shares-memory and cpp-essentials/atomics-modification-order
- `std::hardware_destructive_interference_size`, ABI, adjacent-line prefetcher → DEFINE or drop
- `inline constexpr` → `constexpr` / why the code is `constexpr` (compile-time harness) → REQUIRE cpp-essentials/const-vs-constexpr-initializer
- threads/cores writing concurrently → REQUIRE cpp-essentials/conc-thread-shares-memory

## ll-memory-orders
- `mov`/`xchg`, TSO, store-load reordering, LDAR/STLR, `g++ -S`, ThreadSanitizer → TOO ADVANCED: x86/AArch64 codegen of memory orders is post-sprint; keep atomics-synchronizes-with as the interview content

## ll-shared-counter-scaling
- `std::atomic<T>` and threads → REQUIRE cpp-essentials/conc-thread-shares-memory and cpp-essentials/atomics-modification-order
- `fetch_add` → REQUIRE cpp-essentials/atomics-trace-relaxed-counter
- 'line moves between cores', cross-core transfer → NEW: multi-core caches primer (see ll-hardware-numbers)

## ll-spsc-orders
- acquire / release / relaxed, 'data race' → REQUIRE cpp-essentials/atomics-synchronizes-with and cpp-essentials/atomics-trace-relaxed-counter
- SPSC ring code never shown (no worked example) → NEW: basic Card walking a 4-line SPSC push/pop with the orders annotated
- 3+ new ideas (own-counter relaxed, acquire of the other index, two release/acquire pairs)

## ll-spsc-ring
- CAS, read-modify-write → REQUIRE cpp-essentials/atomics-compare-exchange-failure
- SPSC (single producer single consumer), 'writer' → DEFINE

## chunks-cache-padded-counter
- `std::atomic<T>` and threads → REQUIRE cpp-essentials/conc-thread-shares-memory and cpp-essentials/atomics-modification-order
- `std::atomic<unsigned long> value{0};` → ATOM above
- `struct alignas(64)` → via layout-alignas-sizeof (ok)

## trace-lru-order
- `std::list` → NEW: basic Card on std::list (doubly linked, O(1) insert at a held iterator, no indexing) plus the sequence-container menu
- `std::unordered_map<int, std::list<int>::iterator>`, `find`, `end()`, `erase`, `index[k] = ...`, `it->second` → MOVE algo-basics/hashing-set-map-ops-trace (no requires) and REQUIRE cpp-essentials/containers-map-vs-unordered-map
- `if (auto it = ...; cond)` if-with-initialiser → NEW: basic Card or DEFINE: 'declares it, then tests the condition'
- LRU cache design never taught before the trace (no worked example) → NEW: basic Card 'LRU = recency list + key→iterator map'
- iterators → REQUIRE cpp-essentials/iter-end-one-past
- 3+ new ideas (list, map of iterators, if-init, eviction order); trace budget exceeded
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## trace-lru-splice
- `std::list` → NEW: basic Card on std::list (doubly linked, O(1) insert at a held iterator, no indexing) plus the sequence-container menu
- `std::next`, `splice(pos, list, it)` → DEFINE: 'splice relinks node it before pos, no copy'
- iterator → REQUIRE cpp-essentials/iter-end-one-past
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)

## trap-linked-list-insertion
- `std::find_if` with `[&](int y){ return y > x; }` → REQUIRE cpp-essentials/stdalgo-find-if-not-found and cpp-essentials/stdalgo-lambda-syntax; capture `[&]` → REQUIRE cpp-essentials/lambda-capture-trace
- `std::list` → NEW: basic Card on std::list (doubly linked, O(1) insert at a held iterator, no indexing) plus the sequence-container menu
- 'vectorisable' (SIMD) → DEFINE or drop
- generic `c` standing for list or vector → DEFINE

## trap-random-access-is-free
- TLB, page walk → DEFINE: 'TLB: a cache of virtual→physical page translations; page walk: looking one up in memory'
- range-for `for (T x : c)` → REQUIRE cpp-essentials/iter-range-for-alias
- 256 MB vector / 'shuffled idx' setup → DEFINE

## trap-small-n
- `std::map` (tree of nodes), `std::pair`, `std::lower_bound` on a sorted vector → REQUIRE cpp-essentials/containers-map-vs-unordered-map and interview-essentials/search-lower-bound-meaning; DEFINE pair: 'two values stored together'
- O(...)/Θ/log notation → REQUIRE interview-essentials/complexity-big-o-scaling (after it gains the big-O root fix below)
## Summary

Recurring gaps, each with the one remedy that fixes the most Cards:

- **Big-O / log notation is never taught.** The Deck's root, `complexity-big-o-scaling`, requires nothing, and ~40 Cards with no `requires` use O(), Θ or log₂. Fix: `complexity-big-o-scaling` gains `MOVE algo-basics/complexity-asym-big-o-definition` (+ `complexity-asym-step-model`) and `algo-basics/complexity-asym-log-rules`; every other Card that uses O() then requires `complexity-big-o-scaling`.
- **Recursion and the call stack.** All the complexity-tree, tree, DFS, DP and fast-power Cards recurse. Fix: `MOVE algo-basics/technique-call-stack-trace` then `technique-recursion-sum-code`, required by `technique-recursion-unwind` and `complexity-recursion-tree-calls`.
- **Hashing has no vocabulary root.** `hashing-chaining` never says what a hash or bucket is. Fix: `MOVE algo-basics/hashing-direct-address`, `hashing-index-mod-trace`, `hashing-pigeonhole`.
- **Graph vocabulary and DFS/Dijkstra teaching.** `graph-list-from-edges-chunk` (graph root) defines no vertex, edge or directed graph. Fix: `MOVE algo-basics/graph-vertex-edge-sets`, `graph-edge-ordered-pair`, `graph-directed-vs-undirected`, `graph-cycle-spot`. `NEW` worked-example Cards for Dijkstra, Kahn and union-find (its problem statement).
- **Stack, queue and tree are used before they are defined.** Fix: `MOVE algo-basics/linear-stack-adt`, `linear-queue-adt`, `tree-recursive-def`, `heap-pq-adt-trace`; sorting needs `MOVE algo-basics/sort-quick-idea`, `sort-partition-regions`, `sort-merge-runs-trace`.
- **C++ syntax load.** Pointers, `->`, `std::vector`, `std::array`, `std::span`, range-for, templates, lambdas, `constexpr` and post-increment are leaned on without `requires`. Fix: one pass adding the `REQUIRE cpp-essentials/...` and `MOVE cpp-basics/...` lines listed. Missing everywhere: `NEW` Cards for std::queue/stack, std::list plus the container menu, structured bindings, if-with-initialiser.
- **Hardware and bits primers are missing.** `foundations-latency-scale` (root of about 20 Cards) assumes cache/DRAM; the bit Cards assume binary and bitwise operators; the `ll-*` Cards assume multi-core caches and atomics. Fix: three `NEW` primer Cards (memory hierarchy and cache, binary and bitwise operators, multi-core cache lines), plus `REQUIRE cpp-essentials/atomics-*` and `conc-thread-shares-memory`.
- **Code-Card machinery.** Index-encoded trees (`t.left[v]`), `-1`-padded adjacency arrays, hidden helpers and out-parameters add load unrelated to the lesson. Several traces (sort-quick-worst, graph-dfs-discovery-finish-trace, trace-lru-order) break the one-run / 8-change budget.

Audited 152 cards: 134 with gaps, 435 gaps total, 8 too advanced.
