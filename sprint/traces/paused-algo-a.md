# algo-basics 01–04: trace budget review (2026-10-20)

Scope: every `trace` Card in algo-basics/topics/01-complexity … 04-searching (39).
Every expected value re-verified by one instrumented program and one count program,
GCC 16.2.0 `g++ -std=c++23 -Wall -Wextra` (/tmp/tr-paused-algo-a/t.cpp, v.cpp).
Budget notes give: runs / input / iterations / state changes (SC) / values held (VH) / probes·values.

## 01-complexity (all multi-run counters: formula lessons → CONVERT)
complexity-cost-trace-single-loop | CONVERT | 3 runs to 1000 → basic: scan(500,1500) vs scan(0,1000), cost = hi − lo; v1 → v2
complexity-cost-trace-stride | CONVERT | 3 runs to 3334 → basic: 34 steps at n=100, how many at 10 000; v2
complexity-cost-trace-doubling | CONVERT | 3 runs, two factors → basic: ×3 loop, 7 at 1000, 13 at 10⁶; v2
complexity-cost-trace-shrink-recurrence | CONVERT | 1001-call recursion + by_half → basic: by_half(1000) calls; v2
complexity-cost-trace-triangular | CONVERT | 2 runs (45, 190) → basic: given 45 for n=10, steps for 20; v2
complexity-cost-trace-early-exit | CONVERT | 3 runs × 8 elements, 28 comparisons → basic: pick costliest of three 4-element inputs; v2
complexity-best-worst-linear-search | CONVERT | 3 runs × 8 elements, counter → basic: which keys force all 5 comparisons; v2
complexity-cost-trace-dependent-halving | CONVERT | 2 runs (197, 1994) → basic: shrink(16) = 31 < 2n; v2
complexity-cost-trace-harmonic | CONVERT | total(16) = 16 summed passes → basic: growth of total(n), n·H(n); v2
complexity-cost-trace-merge-recurrence | CONVERT | 2 runs (64, 384) → basic: split(16) work by levels; v2
complexity-cost-trace-sequential-vs-nested | CONVERT | 440 increments → basic: given a = 40, what is b; v2
complexity-asym-crossover-trace | CONVERT | 3 lambdas × 1000 n, pow → basic: 10·n·log n vs n², which wins; v2
complexity-doubling-copies | CONVERT | 9 pushes, cap/copies → basic: total copies after 16 pushes; v2
complexity-cost-trace-binary-counter | CONVERT | 16 increments, 8 bits → basic: bits written 0000 → 1000; v2
complexity-sqrt-loop | CONVERT | 2 runs (99, 999) → basic: 99 tries at 10 007, how many at 1 000 003; v2

## 02-linear
linear-deque-ends-trace | OK | 1 run, 7 ops = 7 SC, VH ≤ 3, 3 probes × 2
linear-growth-trace | CONVERT | 9 pushes → basic: total copies after 9 pushes, < 2n; v2
linear-ring-full-empty-trace | SHRINK | 8 ops, 12 SC → 3-slot ring holding 2, push + 3 pops: 5 SC, VH 3, 2×2; v2
linear-stack-queue-order-trace | SHRINK | 3 values, range-for, VH 6 → 2 values each: 6 SC, VH 4, 2×2; v2
linear-list-insert-order-trace | SHRINK | 1 probe × 3 values → × 2; added neutral "Many expect" premise; v2
linear-stack-brackets-trace | WORKED FIRST + SHRINK | 6 feeds, `st[top++]` → 4 feeds "(()]", 6 SC, VH 4, 2×2; new linear-stack-brackets-worked ("([)]"); v2
linear-variable-window-trace | WORKED FIRST + SHRINK | 8 elements, 8 extends, `a[lo++]` → 4 elements, 2 extends from given state, 5 SC, VH 3, 2×2; new linear-variable-window-worked; v2
linear-two-pointers-trace | WORKED FIRST + SHRINK | 6 elements, 3 values/probe → 5 elements, 4 steps, 4 SC, VH 3, 2+2+1; new linear-two-pointers-worked; v2

## 03-hashing
hashing-map-count-trace | SHRINK | 6-word range-for loop → 3 statements, 2 lookups: 4 SC, 2×2; v2
hashing-map-overwrite-trace | OK | 3 writes, 1 probe × 2
hashing-reserve-trace | CONVERT | 200 simulated inserts, 2 runs → basic: what reserve changes (latency, not total); v2
hashing-chain-length-trace | CONVERT | 2 runs × 12 keys → basic: fixed 4 buckets, 12 → 12 000 keys, lookup cost; v2
hashing-chaining-trace | SHRINK | 5 inserts + global counter, 9 SC → 3 inserts, counting function: 5 SC, VH 4, 2+1; v2
hashing-modulus-pattern-trace | CONVERT | 2 runs × 5 ids with used[] → basic: which of 10, 15, 7 spreads best; v2
hashing-set-first-duplicate-trace | SHRINK | 3 values, `checks` counter, insert in condition → ids {7,3,7,9}, 6 SC, VH 4, 1×2; v2
hashing-set-erase-trace | OK | 2 erases, 2 probes × 2
hashing-rehash-trace | SHRINK | 3 values/probe → keys 3 and 11 only: 2×2; v2
hashing-cluster-worst-trace | CONVERT | 4 inserts, 10 cumulative probes → basic: slots looked at by the 4th colliding insert; v2
hashing-set-map-ops-trace | OK | 3 inserts, 1 probe × 2

## 04-searching
search-isqrt-trace | SHRINK + WORKED FIRST | n = 40, 6 steps → n = 10, 4 steps, 8 SC (lo/hi + mid), VH 3, 3×2; requires existing interview-essentials/search-half-open-worked; v2
search-bounds-trace | SHRINK | 6 elements, helper lambdas → 5 elements, direct calls, 6 SC, 3×2; v2
search-binary-search-trace | SHRINK + WORKED FIRST | 8 elements → 5, 3 steps, 6 SC, VH 3, 3×2; requires search-half-open-worked instead of the chunk; v2
search-iteration-count-trace | CONVERT | 2 runs (7, 8) with counter → basic: 3 loops for 7, how many for 8; v2
search-unsorted-input-trace | OK | 5 elements, 3 steps, 6 SC, VH 3, 3×2; requires now search-half-open-worked + halving (was the chunk), elaborate added; v1 kept
