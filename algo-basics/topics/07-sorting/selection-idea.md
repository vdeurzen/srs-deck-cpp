---
id: sort-selection-idea
kind: basic
version: 1
level: 1
tags: [sorting, selection-sort, complexity]
requires:
  - complexity-arithmetic-series
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://en.wikipedia.org/wiki/Selection_sort
---

## Selection sort is given the already sorted `[1 2 3 4 5]`. How many comparisons does it make?

---

**10 = n(n − 1)/2: Θ(n²) in every case, sorted input included.**

Pass i scans the whole unsorted suffix for its minimum: 4 + 3 + 2 + 1.
Nothing tells it the minimum was already in place, so input order never
shortens a scan. Its one
strength: at most n − 1 swaps, useful when writes are costly.
