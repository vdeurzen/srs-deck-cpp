---
id: sort-introsort
kind: basic
version: 1
level: 3
tags: [sorting, complexity]
requires:
  - heap-vocabulary
elaborate: Quickselect has the same O(n²) worst case — what would the same escape look like for `std::nth_element`?
refs:
  - https://www.cs.rpi.edu/~musser/gp/introsort.ps
  - https://en.cppreference.com/w/cpp/algorithm/sort
---

## `std::sort` is required to be O(n log n) worst case, but quicksort is O(n²). How is the guarantee met?

---

**Introsort: past a recursion depth of ~2·log₂ n, that subrange switches to heapsort.**

Deep recursion means the pivots are going badly (adversarial input,
unlucky choices). Heapsort has no bad input, so the bound holds; on
ordinary data the limit is never reached and quicksort's speed is kept.
libstdc++ uses exactly `2 * __lg(n)`.
