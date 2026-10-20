---
id: virtual-vptr-sizeof
kind: code
version: 1
level: 2
tags: [inheritance, virtual, layout]
input: chips
choices:
  c1: ["sizeof(void*)", "2 * sizeof(void*)", "sizeof(void*) + 1", "1"]
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_polymorphic_v<Shape>);
    int main() {}
requires:
  - virtual-vptr-intro
  - types-size-minimums
  - constexpr-fn-static-assert
refs:
  - https://en.cppreference.com/w/cpp/types/is_polymorphic
  - https://itanium-cxx-abi.github.io/cxx-abi/abi.html#vtable
elaborate: Say aloud what a million small polymorphic objects cost in memory compared with the same objects without `virtual`.
---

`Shape` declares no data members but two virtual functions. State its
size under GCC (`void*` is a pointer to any object type).

```cpp
struct Shape {
    virtual double area() { return 0; }
    virtual int sides() { return 0; }
};
static_assert(sizeof(Shape) == {{c1::sizeof(void*)}});
```

---

**One vptr, whatever the number of virtual functions.** Each virtual
function adds a slot to the per-class vtable, not a pointer to every
object, so two functions still cost each `Shape` one pointer. With no
data members, that vptr is the whole object.
