---
id: sort-std-sort-vs-stable
kind: basic
version: 1
level: 3
tags: [sorting, stability, cpp]
requires:
  - sort-compare-properties
  - sort-merge-stable-code
elaborate: When does code you own depend on equal keys staying in order without saying so?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/stable_sort
  - https://en.cppreference.com/w/cpp/algorithm/sort
  - https://gcc.gnu.org/git/?p=gcc.git;a=blob;f=libstdc%2B%2B-v3/include/bits/stl_algo.h
---

## `std::sort` and `std::stable_sort` both promise O(n log n) comparisons. What does `std::stable_sort` pay for keeping equal keys in order?

---

**A merge-sort buffer; if it can't get one, O(n log² n) comparisons instead.**

`std::sort` is introsort: quicksort that falls back to heap sort when
recursion gets too deep, so in place, O(n log n) worst case, unstable.
libstdc++'s `stable_sort` requests ⌈n/2⌉ elements: 32 MB for 10⁶
64-byte records.
