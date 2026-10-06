---
id: sort-networks
kind: basic
version: 1
level: 5
tags: [sorting, branchless, simd, low-latency]
requires:
  - foundations-branch-misprediction
refs:
  - https://dl.acm.org/doi/10.1145/1468075.1468121
  - https://en.wikipedia.org/wiki/Sorting_network
  - https://en.algorithmica.org/hpc/algorithms/sorting/
---

## What is a sorting network, and why does a sort that does *more* comparisons win for small n?

---

A sorting network is a **fixed** sequence of compare-exchange pairs —
`(i, j)`: if `a[i] > a[j]`, swap — that sorts any input of that exact
size. Nothing about the sequence depends on the data, so it is fully
branchless and the order is known at compile time.

That is precisely why it wins for n ≤ 32 or so:

- **No branches to mispredict.** A comparison sort's inner loop branches
  on data; a network's compare-exchange compiles to `min`/`max` (or a
  `cmov` pair) with no control flow at all.
- **Instruction-level parallelism.** Independent compare-exchanges in
  the same "layer" execute simultaneously — a network's *depth* matters
  more than its size, and an optimal 8-element network has depth 6 while
  doing 19 comparisons.
- **SIMD.** With vector min/max you can compare-exchange whole rows at
  once, sorting 16 columns of 16 elements in parallel — the basis of
  fast in-register sorting kernels (AVX-512 bitonic sorts, and the small-case
  kernels inside modern library sorts).

The classic constructions are Batcher's **bitonic** and
**odd-even merge** networks, both O(n log² n) comparators, plus
hand-optimised networks for each small n (proven size-optimal up to
n = 12, depth-optimal up to n = 17). The AKS network reaches O(log n)
depth (O(n log n) comparators) and is famous for being entirely
impractical.

Where they appear: the base case of a larger sort (replacing insertion
sort below the cutoff), median filters in signal and image processing,
fixed-size key sorting in GPU kernels, and any hot path that sorts
exactly 4, 8 or 16 things — a few order book levels, a handful of
candidate routes, the top-k buffer of a scan.

The limits are inherent: the size must be a compile-time constant (or
you dispatch to one of several networks), they do no better on
already-sorted input than on random input, and stability requires
care — a compare-exchange network is stable only if you break ties by
index explicitly.
