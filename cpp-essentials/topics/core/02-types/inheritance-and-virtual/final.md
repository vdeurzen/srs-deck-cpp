---
id: virtual-final
kind: code
version: 1
level: 3
tags: [inheritance, virtual, performance]
input: chips
choices:
  c1: ["final", "override", "sealed", "explicit"]
compile:
  harness: |
    static_assert(std::is_final_v<Circle>);
    static_assert(Circle{}.area() == 3);
    int main() {}
requires:
  - virtual-vptr-sizeof
refs:
  - https://en.cppreference.com/w/cpp/language/final
---

No class may derive from `Circle`. That also tells the optimiser what
`c.area()` on a `Circle&` will call.

```cpp
#include <type_traits>
struct Shape {
    constexpr virtual ~Shape() = default;
    constexpr virtual int area() const { return 0; }
};
struct Circle {{c1::final}} : Shape {
    constexpr int area() const override { return 3; }
};
```

---

`final` after the class name forbids deriving from `Circle` (on a virtual
function, it forbids further overriding). Since nothing can override
`Circle::area`, a call through a `Circle&` or `Circle*` has exactly one
possible target, so the compiler may **devirtualise** it: call directly, and
inline. `override` belongs on functions, not classes; `sealed` is C#/MSVC.
