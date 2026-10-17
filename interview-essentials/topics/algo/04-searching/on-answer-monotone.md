---
id: search-on-answer-monotone
kind: basic
version: 1
level: 3
tags: [binary-search, search-on-answer]
requires:
  - search-first-true-predicate
refs:
  - https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
  - https://en.cppreference.com/w/cpp/algorithm/partition_point
  - https://en.wikipedia.org/wiki/Binary_search_algorithm
---

## Capacity To Ship Packages Within D Days (LC 1011): packages with given weights ship in their given order, and each day's load must not exceed the capacity. Find the smallest capacity that ships them all within 5 days. There is no array to search. What property lets you binary search over capacities anyway?

```cpp
bool fits(int cap);   // true when every package ships within 5 days
```

---

**Monotonicity: if capacity c fits, every c' > c fits too.**

So `fits` over 1, 2, 3, … reads `false … false true … true`, and the
answer is the first true: O(log range) calls to `fits`. Without
monotonicity, a false at `mid` would say nothing about either side.
