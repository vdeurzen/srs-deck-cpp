---
id: sort-quick-worst
kind: basic
version: 2
level: 2
tags: [sorting, quicksort, complexity]
requires:
  - sort-lomuto-worked
  - technique-call-stack-worked
  - complexity-asym-theta-sandwich
refs:
  - https://en.wikipedia.org/wiki/Quicksort#Worst-case_analysis
  - https://doi.org/10.1093/comjnl/5.1.10
elaborate: Which real inputs, such as logs, IDs or timestamps, arrive already sorted, and what would this pivot rule do to them?
---

## Quicksort with Lomuto partition (pivot = the last element) gets an already-sorted array of n elements. How many comparisons does it make?

---

**n(n − 1)/2, Θ(n²): each pivot is the maximum, so each partition
peels off one element.**

For `1 2 3 4`: pivot 4 costs 3 comparisons and leaves `1 2 3`, so
3 + 2 + 1 = 6, recursion n deep. A median pivot halves the rest: the
n log n shape. (Counted under GCC 16.2.)
