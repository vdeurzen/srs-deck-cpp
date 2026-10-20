---
id: vocab-visit-missing-handler
kind: code
version: 1
level: 2
tags: [vocabulary-types, variant]
input: chips
choices:
  c1: ["Square", "Circle", "Triangle", "const Circle&"]
compile:
  harness: |
    static_assert(layer(Square{}) == 5);
    static_assert(layer(Triangle{}) == 2);
    static_assert(layer(Circle{}) == 1);
    int main() {}
requires:
  - vocab-variant-closed-set
  - constexpr-fn-static-assert
elaborate: Where would a compile error for a missing case have caught a bug in your own code, for example a Go type switch with a silent default?
refs:
  - https://en.cppreference.com/w/cpp/utility/variant/visit
---

Complete the third overload so `layer` compiles; the shape it handles
sits on layer 5. (A struct with `operator()` overloads is
called like a function, picking the overload by argument type.)

```cpp
#include <variant>
struct Circle {}; struct Square {}; struct Triangle {};
struct Layer {
    constexpr int operator()(Triangle) { return 2; }
    constexpr int operator()(Circle) { return 1; }
    constexpr int operator()({{c1::Square}}) { return 5; }
};
constexpr int layer(std::variant<Circle, Square, Triangle> s) {
    return std::visit(Layer{}, s);
}
```

---

`std::visit` calls the visitor with whichever alternative is active, so the
visitor must accept **every** alternative; the check happens at compile
time, for all of them at once. A second `Circle` or `Triangle` overload
redeclares an existing one and still leaves `Square` unhandled;
`const Circle&` beside `Circle` makes a `Circle` call ambiguous.
Overloads are chosen by ordinary resolution, so a catch-all overload
that accepts any type would compile and quietly swallow any alternative
added later.
