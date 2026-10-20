---
id: std-set-multiset
kind: basic
version: 1
level: 1
tags: [stl, set]
requires:
  - cpp-essentials/iter-iterator-basics
refs:
  - https://en.cppreference.com/w/cpp/container/set
  - https://en.cppreference.com/w/cpp/container/multiset
elaborate: Say in one sentence when you would keep a `std::set` instead of sorting a vector once.
---

```cpp
std::set<int> s{5, 2, 5, 9};
```

## Stepping an iterator with `++` from `s.begin()` to the last element, which values does it read, in order?

---

**2, 5, 9: a set keeps each key once, in sorted order.**

The second 5 is dropped, so `s.size()` is 3. A set is a balanced search
tree: insert, find and erase take about log₂ n steps.
`std::multiset<int>` keeps duplicates: the same list gives 2, 5, 5, 9.
