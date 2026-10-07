---
id: sort-stable-sort-cost
kind: basic
version: 1
level: 3
tags: [sorting, memory]
requires:
  - algo-basics/sort-stable-meaning
elaborate: In a latency-critical path that must not allocate, which stable algorithm would you accept, and at what cost?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/stable_sort
  - https://gcc.gnu.org/git/?p=gcc.git;a=blob;f=libstdc%2B%2B-v3/include/bits/stl_algo.h
---

## What does libstdc++'s `std::stable_sort` need that `std::sort` does not?

---

**A temporary buffer of ⌈n/2⌉ elements, for a merge sort.**

It sorts the two halves and merges through the buffer, O(n log n). If
the allocation fails it falls back to an in-place merge sort, O(n log² n)
comparisons. (`_TmpBuf __buf(first, (last - first + 1) / 2)`,
checked in GCC 15 and 16.)
