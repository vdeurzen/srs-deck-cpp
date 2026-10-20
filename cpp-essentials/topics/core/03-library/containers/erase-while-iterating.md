---
id: containers-erase-while-iterating
kind: chunk
version: 2
level: 3
tags: [containers, idioms, lifetime]
expose_ms: 11000
compile: null
requires:
  - containers-erase-returns-next
  - containers-map-vs-unordered-map
  - ptr-arrow-member
elaborate: Say where else in your code an operation hands back the next valid position because the old one died.
refs:
  - https://en.cppreference.com/w/cpp/container/map/erase
  - https://en.cppreference.com/w/cpp/container/map/erase_if
---

```cpp
for (auto it = stock.begin(); it != stock.end();) {
  if (it->second == 0)
    it = stock.erase(it);
  else
    ++it;
}
```

---

Erase while iterating, here over a `std::map<int, int> stock`. `erase(it)`
invalidates `it` itself, so `++it` after it would be undefined behaviour;
`erase` returns the iterator to the next element instead, and the loop
header has no increment because each branch advances exactly once. The
same shape works for every standard container. When the body does nothing
but test and erase, C++20's `std::erase_if(stock, pred)` says it in one
call. The snippet is part of a function, so it is graded by text.
