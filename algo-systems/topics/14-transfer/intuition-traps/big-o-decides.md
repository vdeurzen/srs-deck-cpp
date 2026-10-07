---
id: trap-big-o-decides
kind: basic
version: 1
level: 3
tags: [transfer, misconception, complexity, cost-model]
elaborate: Think of a time a lower-complexity algorithm lost in production. What was the hidden cost — allocation, misses, branches, or setup?
requires:
  - sort-introsort
refs:
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/stl_algo.h
  - https://en.wikipedia.org/wiki/Big_O_notation
---

## `std::sort` is O(n log n); insertion sort is O(n²). In libstdc++, what does `std::sort` run on a 12-element range?

---

**Insertion sort: at 16 or fewer elements its constant factor beats quicksort's.**

Big-O describes growth as n → ∞, not the cost at your n. On tiny
ranges, partitioning, recursion and mispredicted branches cost more
than insertion sort's tight, predictable loop.

```cpp
// libstdc++ bits/stl_algo.h (GCC 14–16)
enum { _S_threshold = 16 };
while (__last - __first > int(_S_threshold)) { /* introsort */ }
```
