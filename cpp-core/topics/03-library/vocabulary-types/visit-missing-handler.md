---
id: vocab-visit-missing-handler
kind: code
version: 1
level: 2
tags: [vocabulary-types, variant]
input: chips
choices:
  c1: ["Square", "Circle", "Shape", "const Circle&"]
compile:
  harness: |
    static_assert(area(Square{2}) == 4);
    static_assert(area(Circle{1}) == 3);
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
struct Circle { int r; };
struct Square { int side; };
using Shape = std::variant<Circle, Square>;
struct Area {
    constexpr int operator()(Circle c) const { return 3 * c.r * c.r; }
    constexpr int operator()({{c1::Square}} s) const { return s.side * s.side; }
};
constexpr int area(Shape s) { return std::visit(Area{}, s); }
```

---

`std::visit` calls the visitor with whichever alternative is active, so the
visitor must accept **every** alternative; the check happens at compile
time, for all of them at once. A second `Circle` overload redeclares the
first and still leaves `Square` unhandled, and `Shape` has no `side`.
Overloads chosen by ordinary resolution also mean a handler can quietly
catch an alternative by conversion, so keep parameter types exact.
