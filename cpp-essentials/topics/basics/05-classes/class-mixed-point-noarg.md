---
id: class-mixed-point-noarg
kind: basic
version: 1
level: 3
tags: [classes, constructors, recognition]
requires:
  - class-default-delete-where
  - class-explicit-blocks-conversion
  - class-default-member-init-intro
elaborate: When would you write the no-argument constructor's body yourself rather than ask for the compiler's?
refs:
  - https://en.cppreference.com/w/cpp/language/default_constructor
---

```cpp
struct Point {
    int x = 0, y = 0;
    Point(int a, int b) : x(a), y(b) {}
};
```

## Declaring `Point(int, int)` removed the compiler-written no-argument constructor, so `Point p;` fails. Leaving `Point(int, int)` unchanged and writing no body, what line restores it?

---

**`Point() = default;`: it asks for the compiler-written constructor back.**

That constructor uses the default member initialisers, so `p` is 0, 0.
`= delete` would forbid `Point p;` on purpose, and `explicit` changes only
which conversions are allowed.
