---
id: std-multiset-keeps-dupes
kind: basic
version: 1
level: 1
tags: [stl, set]
requires:
  - std-set-multiset
refs:
  - https://en.cppreference.com/w/cpp/container/multiset
elaborate: Say aloud which problem of yours needs every copy of a value kept in sorted order, such as the prices currently in a sliding window.
---

```cpp
std::multiset<int> m{5, 2, 5, 9};
```

## Stepping an iterator with `++` from `m.begin()` to the last element, which values does it read, in order?

---

**2, 5, 5, 9: a multiset keeps every copy of a key.**

It is the same sorted search tree as `std::set`, with the same
log₂ n insert, find and erase; only the one-copy rule is gone, so
`m.size()` is 4 and `m.count(5)` is 2.
