---
id: sort-compare-properties
kind: cloze
version: 2
level: 2
tags: [sorting, memory]
requires:
  - sort-quick-worst
  - sort-counting-idea
refs:
  - https://en.wikipedia.org/wiki/Sorting_algorithm#Comparison_of_algorithms
  - https://en.wikipedia.org/wiki/Quicksort#Space_complexity
elaborate: Which of these extra-space costs would decide your choice on an embedded device with a few kilobytes of stack, and why?
---

Extra memory beyond the input array of n elements (a recursive call
holds one stack frame until it returns):

| sort | extra space |
| --- | --- |
| merge sort | Θ(n) |
| quicksort, smaller side recursed first | {{c1::O(log n)::the call stack}} |
| counting sort, keys in [0, k) | {{c2::O(n + k)::two arrays}} |

For 10⁶ ints, merge sort's buffer is 4 MB.

---

Quicksort recursing into the smaller side and looping on the larger
keeps the stack ≤ log₂ n deep, since each recursive call at least
halves the range; naive recursion can go n deep. Counting sort needs
the k counters plus an n-element output array.
