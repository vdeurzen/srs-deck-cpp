---
id: storage-allocator-traits
kind: basic
version: 1
level: 3
tags: [raw-storage, allocator, c++20]
requires:
  - cpp-essentials/storage-allocate-vs-construct
refs:
  - https://en.cppreference.com/w/cpp/memory/allocator_traits/construct
  - https://en.cppreference.com/w/cpp/memory/polymorphic_allocator/construct
  - https://en.cppreference.com/w/cpp/memory/uses_allocator
  - https://timsong-cpp.github.io/cppwp/n4950/allocator.traits.members#6
---

## `Arena` has only what an allocator must have. Which call must a container that is generic over its allocator use?

```cpp
struct Order { int id; };
template <class T> struct Arena {
    using value_type = T;
    T* allocate(std::size_t n);
    void deallocate(T* p, std::size_t n);
};
Arena<Order> a;  Order* p = a.allocate(1);
a.construct(p, 7);                                         // (1)
std::allocator_traits<Arena<Order>>::construct(a, p, 7);   // (2)
```

---

**(2): the traits use the allocator's own `construct` if it has one, else construct in place.**
`(1)` doesn't compile for `Arena`. Going through the traits keeps
allocator-aware construction: `std::pmr::polymorphic_allocator` and
`std::scoped_allocator_adaptor` define `construct` to pass themselves
to elements that take an allocator.
