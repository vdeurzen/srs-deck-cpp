---
id: search-needs-random-access
kind: basic
version: 1
level: 2
tags: [binary-search, linked-lists, complexity]
requires:
  - search-binary-search-halving
  - linear-array-index-contiguity
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
---

## A sorted `std::list` of a million elements is binary searched with `std::lower_bound`. It makes only about 20 comparisons. Why is it still no faster than a linear scan?

---

**Reaching each middle element means walking the list: n/2 + n/4 + … ≈ n steps.**

Halving needs O(1) access to `a[mid]`, which only contiguous storage
gives. On a list the comparisons stay O(log n) but the iterator moves
are O(n), which is what `lower_bound` documents for non-random-access
iterators.
