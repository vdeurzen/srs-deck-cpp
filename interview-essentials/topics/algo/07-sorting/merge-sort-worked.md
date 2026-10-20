---
id: sort-merge-sort-worked
kind: basic
version: 1
level: 1
tags: [sorting, merge-sort, worked-example]
requires:
  - sort-merge-worked
refs:
  - https://algs4.cs.princeton.edu/22mergesort/
  - https://en.wikipedia.org/wiki/Merge_sort
---

## Merge sort on `4 1 3 2`: split the array in half, sort each half the same way, then merge the two sorted halves.

```
step               runs
split              4 1 | 3 2
split again        4 | 1 | 3 | 2
merge pairs        1 4 | 2 3
merge the halves   1 2 3 4
```

Why does the splitting stop at single elements?

---

**A one-element run is already sorted, so merging can start there.**

A merge needs two sorted runs as input. Nothing smaller than one element
needs sorting, so each half bottoms out there, and every merge hands a
sorted run twice as long back up a level.
