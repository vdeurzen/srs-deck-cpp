---
id: trap-big-o-decides
kind: basic
version: 1
level: 3
tags: [transfer, misconception, complexity, cost-model]
elaborate: Think of a time a lower-complexity algorithm lost in production. What was the hidden cost — allocation, misses, branches, or setup?
refs:
  - https://en.algorithmica.org/hpc/
  - https://en.wikipedia.org/wiki/Big_O_notation#Orders_of_common_functions
---

## True or false: between two algorithms, the one with the better asymptotic complexity is the one to ship.

---

**Only after you know n and the constants.** Big-O is a statement about
the limit as n → ∞, and production has a specific n, specific
hardware, and specific data.

Cases where the "worse" algorithm wins:

- **Insertion sort beats quicksort below ~16 elements** — which is why
  every production sort has that cutoff inside it.
- **Linear scan beats binary search** on a small array, because it has
  no mispredicted branches and the whole array is in one or two cache
  lines.
- **A quadratic loop over a contiguous array** can beat an O(n log n)
  algorithm over a pointer structure until n is in the thousands, at
  roughly two orders of magnitude between a cache hit and a miss.
- **Galactic algorithms** are the extreme: matrix multiplication has
  O(n^2.37) algorithms nobody runs, because the constants are
  astronomical.

And cases where the same complexity hides an order of magnitude: a
hash join whose table fits in cache and one whose table does not are
both O(|R| + |S|); an
AoS scan and an SoA scan are both O(n); `std::map` and
`absl::btree_map` are both O(log n).

What big-O *is* good for, and what to use it for: ruling out the
disasters (quadratic on a million rows is never acceptable),
understanding how a system behaves as data grows (the thing that
breaks at 10× traffic), and comparing algorithms in the same
implementation style.

The working method is the one the foundations Topic describes: use
asymptotics as a filter, then count cache misses, allocations and
branches per operation, then measure on representative data. Anyone
who quotes only the exponent has not looked at the workload — and
anyone who quotes only the benchmark has not thought about what
happens at 100×.
