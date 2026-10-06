---
id: ordered-binary-search-halving
kind: basic
version: 1
level: 1
tags: [binary-search, complexity]
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm
  - https://en.cppreference.com/w/cpp/algorithm/binary_search
---

## Binary search compares the key with the middle element and discards half the array. What makes discarding that half safe?

---

**The array is sorted: if `a[mid] < key`, everything left of `mid` is
also `< key`.** One comparison rules out half, so a million elements take
about 20 comparisons (log₂ 10⁶).

On unsorted data a comparison says nothing about the other elements,
and only a linear scan is correct.
