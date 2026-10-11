---
id: sort-fewest-writes
kind: basic
version: 1
level: 2
tags: [foundations, sorting, trade-offs]
requires:
  - sort-selection-invariant
  - sort-insertion-shift-count
refs:
  - https://algs4.cs.princeton.edu/21elementary/
  - https://en.wikipedia.org/wiki/Selection_sort#Comparison_to_other_sorting_algorithms
---

## 1000 records live in flash memory, where every write wears the chip. Selection, bubble or insertion sort: which writes least on reversed input?

---

**Selection sort: at most n − 1 = 999 swaps.**

Each pass writes only once, the swap that puts the minimum in place.
Bubble and insertion fix one inversion per swap or shift, and reversed
input has n(n − 1)/2 = 499 500 inversions. Selection pays in
comparisons instead, which cost no writes.
