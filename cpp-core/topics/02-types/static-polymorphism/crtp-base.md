---
id: staticpoly-crtp-base
kind: code
version: 1
level: 3
tags: [polymorphism, templates, idioms]
requires:
  - cpp-essentials/staticpoly-static-vs-dynamic
input: chips
choices:
  c1: ["Shape<Square>", "Shape", "Shape<int>", "virtual Shape<Square>"]
compile:
  harness: |
    static_assert(Square{}.area() == 9);
    int main() {}
elaborate: When would you choose a virtual function over this pattern, despite the run-time dispatch?
refs:
  - https://en.cppreference.com/w/cpp/language/crtp
---

Complete `Square`'s base so the inherited `area()` calls
`Square::compute_area` with no virtual call.

```cpp
template<class Derived>
struct Shape {
    constexpr int area() const {
        return static_cast<const Derived*>(this)->compute_area();
    }
};
struct Square : {{c1::Shape<Square>}} {
    int side = 3;
    constexpr int compute_area() const { return side * side; }
};
```

---

CRTP: the derived class passes **itself** as the base's template
argument, so the base knows the exact type to `static_cast` to.
`Shape<int>` casts to the wrong type. A `virtual` base forbids the
downward `static_cast` altogether. What it buys: the base calls
`compute_area` directly, with no run-time dispatch, so the call can inline.
