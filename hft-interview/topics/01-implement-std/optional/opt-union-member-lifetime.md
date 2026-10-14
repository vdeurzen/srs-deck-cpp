---
id: opt-union-member-lifetime
kind: basic
version: 1
level: 3
tags: [optional, lifetime, unions, implement-std]
elaborate: In a hand-written optional or variant, which member function is the only place that may end the member's lifetime?
requires:
  - cpp-core/storage-construct-at
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/class.base.init#9.2
  - https://timsong-cpp.github.io/cppwp/n4950/class.dtor#13
  - https://en.cppreference.com/w/cpp/language/union#Union-like_classes
---

## How many `std::string` constructor and destructor calls does `{ Box b; }` make?

```cpp
struct Box {
    union { std::string s; };
    Box() {}
    ~Box() {}
};
```

---

**None: a variant member is never constructed or destroyed implicitly.**
`Box()` performs no initialization of `s`, and `~Box()` destroys only
non-variant members. `Box` itself must start `s`'s lifetime
(`construct_at(&s, …)`) and end it (`destroy_at(&s)`), and so must
track whether it is alive.
