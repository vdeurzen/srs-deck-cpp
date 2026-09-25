---
id: ordered-branchless-search
kind: basic
version: 1
level: 5
tags: [binary-search, branchless, memory-hierarchy, low-latency]
refs:
  - https://en.algorithmica.org/hpc/data-structures/binary-search/
  - https://en.algorithmica.org/hpc/data-structures/s-tree/
---

## Textbook binary search is optimal in comparisons and slow in practice. What are the three fixes, and what does each attack?

---

Two separate problems. Every iteration ends in a **data-dependent
branch** the predictor cannot learn, and every iteration's address
depends on the previous comparison, so the misses **serialise** — the
CPU cannot prefetch the next cache line because it does not know it yet.

- **Branchless**: replace the `if` with a conditional move.
  `base += (a[base + half] < key) * half` keeps a running base and a
  halving length, compiles to a `cmov`, and removes the misprediction
  entirely. Now the loop is a fixed number of iterations with no
  control-flow surprises — typically 2–3× faster on large arrays even
  though it does the same comparisons.
- **Prefetching**: with a branchless loop, *both* candidate addresses
  for the next step are computable now, so you can issue
  `__builtin_prefetch` for them. The misses start overlapping instead of
  queueing — this is the step that turns a latency-bound loop into a
  throughput-bound one.
- **Layout**: the real problem is that a sorted array's binary search
  touches indices n/2, n/4, 3n/4 … — far apart, one cache line each,
  and the first few levels of the implicit tree are the only ones that
  stay cached. The **Eytzinger layout** stores the implicit binary
  search tree in breadth-first order (root at index 1, children at 2k
  and 2k+1), so the hot top levels are contiguous and each step is
  `k = 2k + (a[k] < key)` — no branches, no arithmetic on ranges, and
  prefetching four levels ahead is one instruction. Going further, a
  **B-tree layout** (a 16-way static "S-tree" with SIMD comparisons per
  node) fits each node in a cache line and beats Eytzinger again.

The costs are the usual ones: the Eytzinger array must be built (an
in-order walk writing into BFS positions) and is not sorted any more, so
range scans and insertion are gone — these are structures for a
**static, read-only, repeatedly searched** array. That is exactly the
shape of a column-store index segment, an interpolation table or a
price-level lookup, which is where they show up.
