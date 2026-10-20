---
id: virtual-name-hiding-intro
kind: basic
version: 1
level: 2
tags: [inheritance, lookup]
requires:
  - fn-overload-ranking
  - virtual-is-a
elaborate: Say aloud what would happen to existing calls `d.scale(3)` if someone later added a `scale(double)` to a derived class.
refs:
  - https://en.cppreference.com/w/cpp/language/unqualified_lookup#Class_definition
  - https://eel.is/c++draft/class.member.lookup
---

```cpp
struct Base {
    int scale(int) { return 1; }
};
struct Derived : Base {
    int scale(double) { return 2; }
};
int r = Derived{}.scale(3);
```

## `Base::scale(int)` is an exact match for `3`, yet `r` is 2. Why does overload resolution never weigh it?

---

**Lookup finds `scale` in `Derived` and stops there: `Base::scale` is hidden.**

The compiler first looks the name up, starting in the object's class and
moving out to its bases, and stops at the first class that declares it.
Overload resolution then ranks only what lookup found, `scale(double)`, so
`3` converts to `double`.
