---
id: smf-point-no-arg
kind: basic
version: 1
level: 2
tags: [classes, special-members, constructors, misconception]
requires:
  - smf-price-cents-only
  - smf-pipe-six-lines
elaborate: Look at a class of yours that declares only a copy constructor; which places that build it with no arguments would stop compiling?
refs:
  - https://eel.is/c++draft/class.default.ctor#1
  - https://en.cppreference.com/w/cpp/language/default_constructor
---

Many expect the compiler to keep writing the no-argument constructor
while a class declares only a copy constructor, since that one builds from
an existing object, not from nothing.

```cpp
struct Point {
    int x = 0, y = 0;
    Point(const Point& o) : x(o.x), y(o.y) {}
};
Point p;
```

## What happens at `Point p;`: `p` is (0, 0), `p` holds leftover memory contents, or a compile error?

---

**A compile error: a copy constructor is a constructor, so no default constructor is written.**

The compiler writes the default constructor only when the class declares
no constructor of any kind. `Point() = default;` brings it back, using
the `= 0` initialisers. A declared move constructor removes it the same
way.
