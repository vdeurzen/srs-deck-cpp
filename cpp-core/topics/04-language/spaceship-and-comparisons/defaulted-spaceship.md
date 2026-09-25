---
id: spaceship-defaulted
kind: code
version: 1
level: 2
tags: [comparisons]
input: chips
choices:
  c1: ["= default", "= delete", "{ return x <=> x; }", "const"]
compile:
  harness: |
    static_assert(Point{1,2} < Point{1,3});
    static_assert(Point{1,2} == Point{1,2});
    static_assert(Point{2,0} > Point{1,9});
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/default_comparisons
---

Get lexicographic `<`, `<=`, `>`, `>=`, `==` and `!=` for `Point` with one
line.

```cpp
#include <compare>
struct Point {
    int x;
    int y;
    auto operator<=>(const Point&) const {{c1::= default}};
};
```

---

`= default` asks the compiler to synthesize member-wise three-way
comparison, in declaration order: `x` first, `y` only breaking a tie on
`x`. It also implicitly defaults `operator==` unless one is declared
separately. The synthesized comparison category is whatever the members'
own `<=>` results combine to — here `int <=> int` is `strong_ordering`,
so `Point` gets a total order for free.
