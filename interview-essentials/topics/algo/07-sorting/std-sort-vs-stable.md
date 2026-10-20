---
id: sort-std-sort-vs-stable
kind: basic
version: 2
level: 3
tags: [sorting, stability, cpp]
requires:
  - sort-compare-properties
  - sort-stable-meaning
elaborate: When does code you own depend on equal keys staying in order without saying so?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/stable_sort
  - https://en.cppreference.com/w/cpp/algorithm/sort
  - https://gcc.gnu.org/git/?p=gcc.git;a=blob;f=libstdc%2B%2B-v3/include/bits/stl_algo.h
---

## `std::sort` is O(n log n) comparisons, in place (only O(log n) extra memory, for the call stack). What does `std::stable_sort` need to match that bound while keeping equal keys in order?

---

**A Θ(n) merge buffer.**

GCC's `stable_sort` requests ⌈n/2⌉ elements, 32 MB for 10⁶ 64-byte
records; without them it falls back to O(n·(log n)²) comparisons.
`std::sort` is introsort (quicksort, switching to heap sort when
recursion runs deep): no buffer, but unstable.
