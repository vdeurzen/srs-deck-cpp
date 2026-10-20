---
id: heap-build-swap-count
kind: basic
version: 2
level: 3
tags: [heaps, complexity]
requires:
  - heap-build-linear
  - heap-array-layout
refs:
  - https://doi.org/10.1145/355588.365103
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
elaborate: Say aloud why building a `std::priority_queue` from a whole range at once is cheaper than pushing its elements one by one.
---

## Build a max-heap from the array `1 2 3 4 5 6 7`. Pushing the keys one at a time makes 10 swaps, since each new key climbs to the root. How many swaps does the bottom-up build make, sifting down slots 2, 1 and 0 in turn?

---

**4: each internal node sinks its full height, 1 + 1 + 2.**

Slots 1 and 2 sit one level above the leaves, slot 0 two levels; the
four leaves cost nothing. Pushing pays each key's *depth*, largest where
most nodes are; sifting down pays *height*, smallest there. Grown, that
is about n log n against under n.
