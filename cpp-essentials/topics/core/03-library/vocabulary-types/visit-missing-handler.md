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
refs:
  - https://en.cppreference.com/w/cpp/utility/variant/visit
---

`std::visit` refuses to compile until every alternative of `Shape` has a
handler. Supply the missing one.

```cpp
#include <variant>
struct Circle {};
struct Square {};
struct Triangle {};
using Shape = std::variant<Circle, Square, Triangle>;
struct Layer {                     // drawing layer per shape
    constexpr int operator()(Triangle) const { return 2; }
    constexpr int operator()(Circle) const { return 1; }
    constexpr int operator()({{c1::Square}}) const { return 5; }
};
constexpr int layer(Shape s) { return std::visit(Layer{}, s); }
```

---

`std::visit` calls the visitor with whichever alternative is active, so the
visitor must accept **every** alternative; the check happens at compile
time, for all of them at once. A second `Circle` or `Triangle` overload
redeclares an existing one and still leaves `Square` unhandled;
`const Circle&` beside `Circle` makes a `Circle` call ambiguous.
Overloads are chosen by ordinary resolution, so a catch-all such as
`operator()(auto)` would compile and quietly swallow any alternative
added later.
