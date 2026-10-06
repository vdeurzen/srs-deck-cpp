---
id: vocab-variant-closed-set
kind: basic
version: 1
level: 2
tags: [vocabulary-types, variant]
requires:
  - virtual-dispatch-dynamic-type
refs:
  - https://en.cppreference.com/w/cpp/utility/variant
  - https://en.cppreference.com/w/cpp/utility/variant/visit
---

## Why model "a circle, a square or a triangle" as `std::variant<Circle, Square, Triangle>` rather than a `Shape` base class with virtual functions?

---

**A closed set: every alternative is known at compile time.**

So the compiler can check that each one is handled, and adding a fourth
alternative breaks every `std::visit` that misses it. A base class is the
open set: anyone may add a derived type, and nothing lists them all.
