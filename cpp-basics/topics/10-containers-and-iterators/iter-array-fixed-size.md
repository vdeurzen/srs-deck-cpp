---
id: iter-array-fixed-size
kind: basic
version: 1
level: 1
tags: [containers, array]
requires:
  - iter-size-vs-capacity
  - tmpl-class-member-type
refs:
  - https://en.cppreference.com/w/cpp/container/array
---

## Why does this fail to compile?

```cpp
std::array<int, 3> a{1, 2, 3};
a.push_back(4);
```

---

**A `std::array`'s length is part of its type, fixed at compile time.**
`std::array<int, 3>` always holds exactly three `int`s, stored inline with
no heap buffer, so it has no `push_back`, `reserve` or `capacity`. If the
sequence must grow, use `std::vector<int>`.
