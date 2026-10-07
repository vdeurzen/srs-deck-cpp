---
id: chunks-crtp
kind: chunk
version: 1
level: 3
tags: [idioms, templates]
requires:
  - staticpoly-crtp-base
expose_ms: 9000
compile:
  harness: |
    struct Square : Shape<Square> {
      double side;
      constexpr double computeArea() const { return side * side; }
    };
    static_assert(Square{{}, 3.0}.area() == 9.0);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/crtp
  - https://wg21.link/p0847
---

```cpp
template <typename Derived>
struct Shape {
  constexpr double area() const {
    return static_cast<const Derived*>(this)->computeArea();
  }
};
```

---

The Curiously Recurring Template Pattern: a base class template
parameterised on its own derived class. Line by line: `Derived` names the
class that will inherit; `area()` is the shared interface; the
`static_cast` to `const Derived*` keeps `const` and is valid provided
`D` really derives from `Shape<D>`: `struct X : Shape<Y>` compiles and
makes the cast undefined behaviour. A private constructor plus
`friend Derived;` in `Shape` turns that slip into a compile error. The bug it prevents is the
virtual call: dispatch is resolved at compile time, so there is no vtable
and the call can inline. C++23's explicit object parameter (P0847) covers
most new uses; the pattern still fills older code and the standard
library.
