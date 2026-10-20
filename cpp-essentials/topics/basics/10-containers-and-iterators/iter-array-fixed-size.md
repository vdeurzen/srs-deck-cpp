---
id: iter-array-fixed-size
kind: basic
version: 1
level: 1
tags: [containers, array]
requires:
  - iter-size-vs-capacity
elaborate: When would you pick `std::array` over `std::vector` in a hot loop, and what does it save?
refs:
  - https://en.cppreference.com/w/cpp/container/array
---

```cpp
std::array<int, 3> a{1, 2, 3};
a.push_back(4);
```

## `std::array<int, 3>` holds three `int`s. Why does the second line fail to compile?

---

**A `std::array`'s length is part of its type, fixed at compile time.**
`std::array<int, 3>` always holds exactly three `int`s, stored inline with
no heap buffer, so it has no `push_back` or `capacity`. If the
sequence must grow, use `std::vector<int>`.
