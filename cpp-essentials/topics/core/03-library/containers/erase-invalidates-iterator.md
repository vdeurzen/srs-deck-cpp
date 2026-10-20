---
id: containers-erase-invalidates-iterator
kind: basic
version: 1
level: 2
tags: [containers, iterators, lifetime]
requires:
  - iter-iterator-basics
  - ub-definition
elaborate: Say where in your code a loop erases from the container it walks, and what would catch a stale iterator there.
refs:
  - https://en.cppreference.com/w/cpp/container/vector/erase
  - https://en.cppreference.com/w/cpp/container#Iterator_invalidation
---

`v.erase(it)` removes the element `it` points at.

```cpp
std::vector<int> v{3, 0, 7};
auto it = v.begin();
++it;
v.erase(it);
```

## After the last line, which is still allowed: `*it`, `++it`, or assigning `it` a new iterator?

---

**Only assigning it a new iterator: `erase` invalidated `it`.**

The element `it` named is gone, so reading through `it` or advancing it
is undefined behaviour, usually silent. An invalidated iterator may only
be assigned to or destroyed.
