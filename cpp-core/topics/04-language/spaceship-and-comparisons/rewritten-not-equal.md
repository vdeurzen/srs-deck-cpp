---
id: spaceship-rewritten-not-equal
kind: basic
version: 2
level: 2
tags: [comparisons]
requires:
  - spaceship-basics
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution#Call_to_an_overloaded_operator
  - https://eel.is/c++draft/over.match.oper
---

## `Point` declares only this hand-written `operator==`. In C++20, what does `a != b` do?

```cpp
struct Point {
    int x, y;
    bool operator==(const Point& o) const { return x == o.x && y == o.y; }
};
bool differ(Point a, Point b) { return a != b; }
```

---

**It compiles and evaluates `!(a == b)`: `!=` is a *rewritten
candidate*.**

Since C++20, when overload resolution for `a != b` finds no
`operator!=`, it also considers `!(a == b)` for any usable `operator==`,
hand-written or defaulted. So C++20 code declares `operator==` and never
`operator!=`: the rewrite supplies it, and the two cannot disagree.
