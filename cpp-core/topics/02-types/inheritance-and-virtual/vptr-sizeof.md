---
id: virtual-vptr-sizeof
kind: code
version: 1
level: 2
tags: [inheritance, virtual, layout]
input: chips
choices:
  c1: ["sizeof(void*)", "1", "0", "2 * sizeof(void*)"]
compile:
  harness: |
    static_assert(std::is_polymorphic_v<Shape>);
    int main() {}
requires:
  - virtual-dispatch-dynamic-type
refs:
  - https://en.cppreference.com/w/cpp/types/is_polymorphic
  - https://itanium-cxx-abi.github.io/cxx-abi/abi.html#vtable
---

`Shape` declares no data members. State its size under GCC.

```cpp
#include <type_traits>
struct Shape {
    virtual ~Shape() = default;
    virtual double area() const { return 0; }
};
static_assert(sizeof(Shape) == {{c1::sizeof(void*)}});
```

---

Any `virtual` function makes the class **polymorphic**: each object gets
one hidden **vptr** to its class's **vtable**, a per-class array of function
pointers (two virtual functions still mean one vptr). A virtual call loads
the vptr, then the slot, then calls indirectly. The vptr is the whole of
`Shape`. An empty non-polymorphic class has size 1; nothing has size 0. The
vptr is the Itanium ABI (GCC, Clang); the standard specifies only behaviour.
