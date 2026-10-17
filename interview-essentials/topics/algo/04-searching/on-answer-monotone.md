---
id: search-on-answer-monotone
kind: basic
version: 1
level: 3
tags: [binary-search, search-on-answer]
requires:
  - search-first-true-predicate
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partition_point
  - https://en.wikipedia.org/wiki/Binary_search_algorithm
---

## Packages must ship in order within 5 days; find the smallest truck capacity that does it. There is no array to search. What property lets you binary search over capacities anyway?

```cpp
bool fits(int cap);   // true when every package ships within 5 days
```

---

**Monotonicity: if capacity c fits, every c' > c fits too.**

So `fits` over 1, 2, 3, … reads `false … false true … true`, and the
answer is the first true: O(log range) calls to `fits`. Without
monotonicity, a false at `mid` would say nothing about either side.
