---
id: storage-placement-new-not-constexpr
kind: basic
version: 1
level: 3
tags: [raw-storage, constexpr, c++20]
requires:
  - storage-construct-at
refs:
  - https://en.cppreference.com/w/cpp/memory/construct_at
  - https://en.cppreference.com/w/cpp/language/new#Placement_new
  - https://wg21.link/P0784R7
  - https://wg21.link/P1004R2
  - https://wg21.link/P0980R1
  - https://wg21.link/P2747R2
---

## In C++23 this fails to compile; with `std::construct_at(p, 7)` it passes. What does `construct_at` give that placement new does not?

```cpp
constexpr int seven() {
    std::allocator<int> a;  int* p = a.allocate(1);
    ::new (p) int(7);
    int v = *p;  a.deallocate(p, 1);  return v;
}
static_assert(seven() == 7);
```

---

**Construction during constant evaluation, which placement new only gets in C++26.**
P0784 (C++20) allowed `new`, `delete` and `construct_at` in constant
expressions; P1004 and P0980 built constexpr `std::vector` and
`std::string` on them. Placement new needs C++26 (P2747); before that
the compiler rejects it.
