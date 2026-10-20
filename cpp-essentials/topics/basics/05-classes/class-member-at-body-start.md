---
id: class-member-at-body-start
kind: basic
version: 1
level: 1
tags: [classes, constructors, initialization]
requires:
  - class-ctor-colon-part
elaborate: Pick a constructor of yours that sets members in its body; what did each member hold just before that line ran?
refs:
  - https://en.cppreference.com/w/cpp/language/constructor#Explanation
  - https://eel.is/c++draft/class.base.init#9
---

```cpp
struct Speed {
    int kmh;
    Speed() : kmh(50) {}
};
struct Car {
    Speed s;
    Car() { s.kmh = 90; }
};
```

## `Car c;` runs `Car()`. As its body starts, before `s.kmh = 90`, what is `c.s.kmh`?

---

**50: `s` was already built by `Speed()` before the body started.**

A constructor builds every member first, from its list entry or, with
none, by the member's own default construction. Only then does the body
run, so the body can only change members that already exist.
