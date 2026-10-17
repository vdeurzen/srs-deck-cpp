---
id: storage-launder
kind: basic
version: 1
level: 5
tags: [raw-storage, lifetime, launder, c++17]
requires:
  - cpp-essentials/storage-construct-at
refs:
  - https://en.cppreference.com/w/cpp/utility/launder
  - https://timsong-cpp.github.io/cppwp/n4950/ptr.launder#1
  - https://timsong-cpp.github.io/cppwp/n4950/intro.object#2
---

## One read is undefined behaviour. Which one? Decide by the object each pointer points to.

```cpp
struct Order { int id; };
alignas(Order) std::byte buf[sizeof(Order)];
Order* made = std::construct_at(reinterpret_cast<Order*>(buf), 42);
int a = made->id;                               // (1)
int b = reinterpret_cast<Order*>(buf)->id;      // (2)
```

---

**(2): a pointer points to the object it was formed from, and `buf` gives a `std::byte`.**
The cast changes the type, not the object. Only the pointer
`construct_at` returned, or `std::launder(reinterpret_cast<Order*>(buf))`,
points to the new `Order`. Contrast: a vector's `T*` from `allocate`
needs no `launder`; it already points at an array element of type `T`.
