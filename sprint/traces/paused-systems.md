# algo-systems, hft-interview, leetcode trace rebuild (2026-10-20)

Values verified with g++ 16.2 -std=c++23 (ASan/UBSan where noted). WE = new worked-example basic.

str-aho-corasick-failure-trace | WORKED FIRST | 4 patterns, 5-value probe → one link computation, 2 probes; new str-aho-corasick-failure-worked (v2)
compiler-liveness-trace | SHRINK | 4 probes → 3; set/lambda vocab edges added (v2)
compiler-ssa-renaming | SHRINK | 3 probes, next++ lambda, 12 changes → plain pushes/pops, 2 probes (v2)
compiler-parallel-copy-cycle | WORKED FIRST | ++moves counter, 3-value probe, 14 changes → pure swap, 2 probes; new compiler-parallel-copy-cycle-worked (v2)
graph-bfs-mark-on-push-trace | SHRINK | 4 vertices, queue[head++], 18 changes → 3 vertices, std::queue, 2 steps; WE already in closure (v2)
graph-tarjan-lowlink-trace | WORKED FIRST | 6-vertex recursion, 4-value probe → one dfs(2) from given state; new graph-tarjan-worked (v2)
heap-build-swap-count | CONVERT | trace, 15 elements, comma counters → basic: bottom-up swaps on 1..7 = 4, sum of heights (v2)
ll-trace-seqlock-retry | SHRINK | three attempts, 4-value probes → one attempt starting mid-write (odd counter) (v2)
ordered-skip-list-search-trace | WORKED FIRST | 6 keys, steps counter → 5 keys, `at` only; new ordered-skip-list-search-worked (v2)
db-trace-count-min | SHRINK | 5 adds, 4-value probe → 2 adds, one 2-value probe; no steps, no WE (v2)
db-clock-sweep | WORKED FIRST | two evictions, ~12 changes → one eviction, all bits set; new db-clock-sweep-worked (v2)
db-trace-redo-lsn | SHRINK | 3-value probes, `applied` counter → counter dropped, ≤ 2 values per probe (v2)
sort-trace-lsd-radix | WORKED FIRST | 6 elements, 3 runs, 3-value probes → 4 elements, one run; requires algo-basics/sort-radix-worked (v2)
trace-vector-growth | SHRINK | 4 probes, 3-value probe → 2 probes, 2 values (v3)
trace-heap-operations | SHRINK | 4 probes, 3-value probe → 3 probes, ≤ 2 values; sort_heap aside dropped (v3)
trace-ring-buffer-wrap | SHRINK | 4 probes × 4 values, slot[tail++] → given state, 2 probes, plain code (v3)
trace-tombstone-bug | SHRINK | 2 probes × 3 values → one probe, before/after (v3)
trace-monotonic-deque | WORKED FIRST | 3-value probe → 2 values; new heap-monotonic-deque-worked, requires dominance card (v3)
hash-trace-robin-hood | WORKED FIRST | 4 inserts, 4-value probe → one insert into 2 keys; new hash-robin-hood-worked (v2)
spsc-stale-cache-trace | SHRINK | fill loop, refreshes counter, 3-value probe → full ring given, 2 pushes (v2)
bucket-clock-step-trace | SHRINK | two buckets, 4 probes × 3 values → one bucket, 2 probes; card reference removed (v2)
book-matching-fills-trace | WORKED FIRST | three fills, card reference → one fill, fill code shown; new book-fill-worked (v2)
erasure-function-copy-trace | SHRINK | 4 probes × 3 counters → 3 probes ≤ 2 values; card reference removed (v2)
trivia-overload-puzzles | OK | 3 independent one-rule calls, 1 value each
sptr-weak-plus-one | OK | one run, 3 probes ≤ 2 values, 8 changes; elaborate added
vec-realloc-rollback | OK | one run, 2 probes of 2, ~7 changes; elaborate added
opt-emplace-destroys-first | OK | one run, 2 probes, 5 trail events; elaborate added
arr-prefix-hash-trace | WORKED FIRST | 4 turns, ~16 changes → one turn from given state; new arr-prefix-hash-worked (v2)
rq-segment-query-trace | WORKED FIRST | 2 levels, 3-value probes, t[l++] → one level, plain code; new rq-segment-query-worked (v2)
stl-pq-top-ref-trace | SHRINK | 4 pushes, two pops → 3 pushes, one pop, one probe (v2)
tree-kth-smallest-trace | SHRINK | 3 calls, 3-key stack probes → one call from given state, 2 values (v2)
dp-coin-ways-trace | WORKED FIRST | two passes, 6-number probes → one pass, dp[3]/dp[4]; new dp-coin-ways-worked (v2)
