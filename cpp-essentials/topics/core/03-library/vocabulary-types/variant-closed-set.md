---
id: vocab-variant-closed-set
kind: basic
version: 1
level: 2
tags: [vocabulary-types, variant]
requires:
  - virtual-function-intro
  - vocab-variant-intro
elaborate: When would you still choose a base class with virtual functions over a variant, given who is expected to add new types?
refs:
  - https://en.cppreference.com/w/cpp/utility/variant
  - https://en.cppreference.com/w/cpp/utility/variant/visit
---

## `Shape` is `std::variant<Circle, Square, Triangle>`, and functions such as `area` and `draw` each `std::visit` it with one handler per alternative (`std::visit(h, s)` calls the handler of `h` that matches the alternative `s` holds). You add `Hexagon` to the variant. What does the compiler do with those functions?

---

**It rejects every `std::visit` whose visitor has no `Hexagon` handler.**

The alternatives are listed in the variant's type, a closed set, so each
visitor is checked against all of them. A `Shape` base class is the open
set: anyone can add a derived type in any file, so no list exists to
check a function against.
