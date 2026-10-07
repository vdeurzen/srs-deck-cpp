---
id: sort-heap-sort
kind: basic
version: 1
level: 2
tags: [sorting, heap-sort, complexity]
requires:
  - sort-selection-idea
  - heap-heapify-order-code
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.wikipedia.org/wiki/Heapsort
---

## Heap sort is selection sort with the unsorted part kept as a max-heap. Why does that give O(n log n) worst case with O(1) extra space?

---

**Each max costs an O(log n) sift, not an O(n) scan, in place.**

Build the heap in place, O(n). Then n − 1 times: swap the root to the
heap's end, sift the new root down ≤ log₂ n levels. The sorted suffix
grows as the heap shrinks. No buffer, unlike merge sort; no bad input,
unlike quicksort.
