---
id: sort-heap-sort
kind: basic
version: 1
level: 2
tags: [sorting, heap-sort, complexity]
requires:
  - sort-heap-sort-worked
  - heap-op-costs
  - sort-selection-meet
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.wikipedia.org/wiki/Heapsort
elaborate: Say in one sentence, as to an interviewer, why heap sort needs no buffer beyond the array it sorts.
---

## Heap sort is selection sort with the unsorted part kept as a max-heap. Why is it O(n log n) even in the worst case?

---

**Each max costs one O(log n) walk down the heap, not an O(n) scan.**

Building the heap costs at most n pushes. Then n − 1 times: swap the
root to the heap's end, sift the new root down ≤ log₂ n levels, whatever
the keys. No input is a bad one.
