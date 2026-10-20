---
id: iter-iterator-basics
kind: basic
version: 1
level: 1
tags: [iterators, vector, foundations]
requires:
  - vector-basics
  - types-auto-deduces
elaborate: Say in one sentence what an iterator lets an algorithm do without knowing the container.
refs:
  - https://en.cppreference.com/w/cpp/iterator
  - https://en.cppreference.com/w/cpp/container/vector/begin
---

```cpp
std::vector<int> v{4, 5, 6};
auto it = v.begin();
++it;
```

## What is `*it`?

---

**5: `it` is an iterator, a position in `v`, and `++it` moved it on one.**

`v.begin()` is the position of the first element, `++it` steps to the
next, and `*it` reads the element there, as `*` reads through a pointer.
Standard algorithms take positions like these rather than the container.
