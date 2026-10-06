---
id: staticpoly-deducing-this
kind: code
version: 1
level: 3
tags: [polymorphism, templates, c++23]
requires:
  - staticpoly-crtp-base
input: chips
choices:
  c1: ["this const auto& self", "const auto& self", "const Shape& self", "this Shape self"]
compile:
  harness: |
    static_assert(Square{3}.area() == 9);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/member_functions#Explicit_object_member_functions
  - https://wg21.link/p0847
---

Same mixin in C++23, with no template parameter on `Shape`: complete
`area`'s parameter so `self` is the object it was called on, as its most
derived type.

```cpp
struct Shape {
    constexpr int area({{c1::this const auto& self}}) {
        return self.compute_area();
    }
};
struct Square : Shape {
    int side;
    constexpr explicit Square(int s) : side(s) {}
    constexpr int compute_area() const { return side * side; }
};
```

---

An **explicit object parameter** (deducing `this`) is deduced from the
object expression: `Square{3}.area()` makes `self` a `const Square&`.
Without `this`, the parameter is an ordinary argument the call doesn't
pass; `this Shape self` deduces nothing and slices to `Shape`.
