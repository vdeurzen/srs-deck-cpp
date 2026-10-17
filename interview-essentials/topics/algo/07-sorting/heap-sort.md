---
id: sort-heap-sort
kind: basic
version: 1
level: 2
tags: [sorting, heap-sort, complexity]
requires:
  - heap-heapify-order-code
  - sort-elementary-compare
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.wikipedia.org/wiki/Heapsort
---

## Heap sort is selection sort with the unsorted part kept as a max-heap. Why is it O(n log n) even in the worst case?

---

**Each max costs an O(log n) sift-down, not an O(n) scan.**

Build the heap, O(n). Then n − 1 times: swap the root to the heap's
end, sift the new root down ≤ log₂ n levels, whatever the keys. The
sorted suffix grows as the heap shrinks. No bad input, unlike
quicksort.
