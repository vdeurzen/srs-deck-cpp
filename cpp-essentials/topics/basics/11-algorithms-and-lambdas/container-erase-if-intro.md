---
id: container-erase-if-intro
kind: basic
version: 1
level: 1
tags: [algorithms, containers, foundations]
requires:
  - stdalgo-remove-if-worked
elaborate: Say why a reviewer would rather see `std::erase_if` than `std::remove_if` when the intent is to delete.
refs:
  - https://en.cppreference.com/w/cpp/container/vector/erase2
---

```cpp
std::vector<int> v{3, -1, 8};
auto n = std::erase_if(v, [](int x) { return x < 0; });
```

## C++20's `std::erase_if` takes the vector itself and a test. What are `v.size()` and `n`?

---

**2 and 1: `erase_if` deletes the matches and returns how many it deleted.**

Given the container rather than two iterators, it can both pack the kept
elements (3, 8) to the front and shrink the size. `std::remove_if` sees
only positions, so it packs but cannot shrink.
