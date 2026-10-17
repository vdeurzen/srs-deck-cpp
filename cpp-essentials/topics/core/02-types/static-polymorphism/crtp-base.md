---
id: staticpoly-crtp-base
kind: code
version: 1
level: 3
tags: [polymorphism, templates, idioms]
requires:
  - staticpoly-static-vs-dynamic
input: chips
choices:
  c1: ["Shape<Square>", "Shape", "Shape<int>", "virtual Shape<Square>"]
compile:
  harness: |
    static_assert(Square{3}.area() == 9);
    int main() {}
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
    int side;
    constexpr explicit Square(int s) : side(s) {}
    constexpr int compute_area() const { return side * side; }
};
```

---

CRTP: the derived class passes **itself** as the base's template
argument, so the base knows the exact type to `static_cast` to.
`Shape<int>` casts to the wrong type. A `virtual` base forbids the
downward `static_cast` altogether (here it also stops the `constexpr`
constructor compiling first).
