---
id: sort-compare-properties
kind: cloze
version: 1
level: 2
tags: [sorting, stability, memory]
requires:
  - sort-heap-sort
  - sort-counting-code
  - sort-bubble-vs-insertion
refs:
  - https://en.wikipedia.org/wiki/Sorting_algorithm#Comparison_of_algorithms
  - https://en.wikipedia.org/wiki/Quicksort#Space_complexity
---

Stability and extra space for an array of n elements:

| sort | stable | extra space |
| --- | --- | --- |
| insertion | yes | O(1) |
| merge | yes | Θ(n) |
| quicksort, smaller side recursed first | no | {{c1::O(log n)::the call stack}} |
| heap sort | {{c2::no}} | O(1) |
| counting, keys in [0, k) | yes | {{c3::O(n + k)::two arrays}} |

For 10⁶ ints: merge sort's buffer is 4 MB, quicksort's stack about 20
frames.

---

Quicksort recursing into the smaller side and looping on the larger
keeps the stack ≤ log₂ n deep, since each recursive call at least
halves the range; naive recursion can go n deep. Heap sort's
long-distance swaps reorder equal keys. Counting sort needs the k
counters plus an n-element output array.
