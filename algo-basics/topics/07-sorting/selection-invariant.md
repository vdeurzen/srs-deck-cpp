---
id: sort-selection-invariant
kind: basic
version: 1
level: 1
tags: [foundations, sorting, selection-sort, invariants]
requires:
  - sort-selection-idea
refs:
  - https://algs4.cs.princeton.edu/21elementary/
  - https://en.wikipedia.org/wiki/Selection_sort
---

## Selection sort has done two passes: `[1 3 | 9 7 5]`. Can any later pass move the 1 or the 3?

Each pass finds the smallest value right of the bar and swaps it to the
bar's position.

---

**No: the prefix holds the 2 smallest values, already in their final slots.**

Everything right of the bar is ≥ everything left of it, so no later
minimum can belong earlier. Contrast insertion sort, whose prefix is
sorted but not final: a later small value still slides into it.
