---
id: sort-lomuto-vs-hoare
kind: basic
version: 1
level: 3
tags: [sorting, quicksort, partition]
requires:
  - sort-lomuto-trace
  - sort-hoare-trace
elaborate: Which real-world columns are full of equal keys, and which partition would you want under them?
refs:
  - https://doi.org/10.1093/comjnl/5.1.10
  - https://en.wikipedia.org/wiki/Quicksort#Repeated_elements
---

## Two quicksorts get 10 000 equal keys. One partitions with Lomuto (`a[i] < pivot`), the other with Hoare. Which one stays Θ(n log n)?

---

**Hoare: both scans stop on equal keys, so the split lands in the middle.**

Lomuto's `<` is false for every element: `store` never moves, the pivot
lands at `lo`, and the sides are 0 and n − 1. That is n(n − 1)/2 ≈
5·10⁷ comparisons instead of about n log₂ n ≈ 1.3·10⁵.
