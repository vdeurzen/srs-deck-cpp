---
id: sort-quick-idea
kind: basic
version: 1
level: 1
tags: [sorting, quicksort]
refs:
  - https://doi.org/10.1093/comjnl/5.1.10
  - https://en.wikipedia.org/wiki/Quicksort
---

## Quicksort partitions `[3 7 1 5 4]` around pivot 4, giving `[3 1 4 5 7]`. Why is no merge step needed after sorting the two sides?

---

**The pivot is already in its final slot, with every smaller key left of it and every larger key right.**

Sorting `[3 1]` and `[5 7]` independently finishes the array. Quicksort
does its work before recursing (partition); merge sort does it after
(merge).
