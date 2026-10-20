---
id: vocab-visit-missing-handler
kind: code
version: 2
level: 2
tags: [vocabulary-types, variant]
input: chips
choices:
  c1: ["Circle, Square", "Circle, Square, Hexagon", "Circle, Hexagon"]
compile:
  harness: |
    static_assert(layer(Circle{}) == 1);
    static_assert(layer(Square{}) == 4);
    int main() {}
requires:
  - vocab-variant-closed-set
  - constexpr-fn-static-assert
elaborate: Where would a compile error for a missing case have caught a bug in your own code?
refs:
  - https://en.cppreference.com/w/cpp/utility/variant/visit
---

The program defines three shapes. Complete `layer`'s parameter type so
that `layer` compiles and accepts both a `Circle` and a `Square`. (A struct
with `operator()` overloads is called like a function, picking the
overload by argument type.)

```cpp
#include <variant>
struct Circle {}; struct Square {}; struct Hexagon {};
struct Layer {
    constexpr int operator()(Circle) { return 1; }
    constexpr int operator()(Square) { return 4; }
};
constexpr int layer(std::variant<{{c1::Circle, Square}}> s) {
    return std::visit(Layer{}, s);
}
```

---

**`std::visit` needs a handler for every alternative, checked at compile time.**
Listing `Hexagon` fails even though no call ever passes one: `Layer` has no
`operator()(Hexagon)`, and the check covers every type the variant could
hold, not the ones a caller happens to pass. `Circle, Hexagon` fails the
same way and cannot hold a `Square` either.
