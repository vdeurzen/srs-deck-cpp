---
id: storage-allocate-vs-construct
kind: basic
version: 1
level: 2
tags: [raw-storage, allocator, lifetime]
refs:
  - https://en.cppreference.com/w/cpp/memory/allocator/allocate
  - https://timsong-cpp.github.io/cppwp/n4950/allocator.members#5
---

## After the last line, how many `Order` objects exist?

```cpp
struct Order {
    int id;
    explicit Order(int i) : id(i) {}
};
std::allocator<Order> alloc;
Order* p = alloc.allocate(4);
```

---

**None: `p` points to storage sized and aligned for four `Order`s.**
`allocate` gets raw memory from `::operator new` and starts the lifetime
of the array, but of none of its elements, so no constructor runs.
Using `p[0]` as an `Order` before constructing one there is undefined
behaviour. Construction is a separate, later step.
