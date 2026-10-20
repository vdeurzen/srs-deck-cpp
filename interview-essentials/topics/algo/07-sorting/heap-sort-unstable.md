---
id: sort-heap-sort-unstable
kind: basic
version: 1
level: 2
tags: [sorting, stability]
requires:
  - sort-heap-sort
  - sort-stable-meaning
refs:
  - https://en.wikipedia.org/wiki/Heapsort
  - https://en.cppreference.com/w/cpp/algorithm/sort_heap
elaborate: You need a heap-based sort that keeps equal keys in input order. What could you add to each record to get it, and what does it cost?
---

## Heap sort, keyed by the number only, turns `(1,a) (1,b) (2,c) (1,d)` into `(1,b) (1,a) (1,d) (2,c)`. What in heap sort lets `b` overtake `a`?

---

**Its swaps move records far past equal keys: heap sort is not stable.**

Building the heap swaps (1,a) at the root with (2,c), straight from
slot 0 to slot 2, past (1,b). A heap orders parents over children only,
so nothing remembers which equal key came first.
