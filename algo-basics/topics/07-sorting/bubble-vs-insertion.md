---
id: sort-bubble-vs-insertion
kind: basic
version: 2
level: 2
tags: [sorting, insertion-sort, bubble-sort]
requires:
  - sort-insertion-cases
  - sort-bubble-invariant
elaborate: Both sorts are stable, Θ(n) best and Θ(n²) worst. Where would you still ever pick bubble sort?
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://en.wikipedia.org/wiki/Bubble_sort
---

## Bubble sort (stopping after a pass with no swap) and insertion sort both get `[2 3 4 5 6 1]`: sorted, except that the smallest value is last. Bubble sort makes 15 comparisons, insertion sort 9. Why does bubble sort pay more?

---

**Bubble sort moves the 1 only one slot left per pass.**

The 1 needs 5 passes to reach the front, each comparing across the
unsettled part: 5 + 4 + 3 + 2 + 1. Insertion sort carries the 1 home in
one insertion: 4 + 5. Both make 5 swaps.
