---
id: search-on-answer-monotone
kind: basic
version: 2
level: 3
tags: [binary-search, search-on-answer]
requires:
  - search-first-true-predicate
  - cpp-essentials/fn-declaration-vs-definition
elaborate: "Name another problem where you could search over candidate answers this way, and say why its yes/no test flips only once."
refs:
  - https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
  - https://en.cppreference.com/w/cpp/algorithm/partition_point
  - https://en.wikipedia.org/wiki/Binary_search_algorithm
---

## Capacity To Ship Packages Within D Days (LC 1011): packages ship in their given order, and no day's load may exceed the capacity. Find the smallest capacity that ships them all within 5 days. A search tries capacity `mid`, and `fits(mid)` returns `false`. Why may it discard every capacity below `mid` untested?

```cpp
bool fits(int cap);   // true when every package ships within 5 days
```

---

**A smaller capacity can only need more days: if `mid` fails, every `c < mid` fails.**

So `fits` over 1, 2, 3, … reads `false … false true … true`, and the
answer is the first true: O(log range) calls to `fits`. Without that
one-way flip, a false at `mid` would say nothing about either side.
