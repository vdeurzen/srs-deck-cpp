---
id: sort-stable-few-comparisons
kind: basic
version: 1
level: 2
tags: [foundations, sorting, stability, trade-offs]
requires:
  - interview-essentials/sort-stable-meaning
  - sort-bubble-invariant
  - sort-insertion-shift-count
refs:
  - https://algs4.cs.princeton.edu/21elementary/
  - https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
---

## Records must keep equal keys in input order. They are sorted except that the smallest record sits last. Selection, bubble or insertion sort: which is stable and makes the fewest comparisons?

---

**Insertion sort: about 2n comparisons, one per in-order key, then n − 1 to carry the smallest home.**

Selection sort's long-distance swap can jump one equal key over
another, so it is not stable. Bubble sort is stable but moves the
smallest record one slot per pass: n − 1 passes, about n²/2
comparisons.
