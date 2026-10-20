---
id: virtual-final
kind: code
version: 1
level: 3
tags: [inheritance, virtual, performance]
input: chips
choices:
  c1: ["final", "override", "sealed", "virtual"]
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_final_v<Circle>);
    int main() {}
requires:
  - virtual-override-mismatch
  - staticpoly-static-vs-dynamic
refs:
  - https://en.cppreference.com/w/cpp/language/final
elaborate: Say aloud which class in your own code you would mark `final`, and what a later maintainer would lose.
---

No class may derive from `Circle`. Complete its declaration.

```cpp
struct Shape {
    virtual int area() { return 0; }
};
struct Circle {{c1::final}} : Shape {
    int area() override { return 3; }
};
```

---

`final` after the class name forbids deriving from `Circle` (on a virtual
function, it forbids further overriding). Since nothing can override
`Circle::area`, a call through a `Circle&` or `Circle*` has exactly one
possible target, so the compiler may **devirtualise** it: call it
directly, and inline it. `override` belongs on functions, not classes; `sealed` is C#/MSVC.
