---
id: initialization-most-vexing-parse
kind: basic
version: 1
level: 2
tags: [initialization]
requires:
  - initialization-aggregate-braces
refs:
  - https://en.cppreference.com/w/cpp/language/direct_initialization
  - https://timsong-cpp.github.io/cppwp/n4950/dcl.ambig.res#1
---

## Why does `Widget w(Gadget());` declare a function instead of constructing a `Widget` from a default-constructed `Gadget`?

---

**`Gadget()` can parse as a parameter declaration, and a declaration
wins.** This "most vexing parse" makes `w` a function returning `Widget`,
taking a pointer to a function returning `Gadget`. Braces can never be a
parameter declaration, so `Widget w{Gadget{}};` constructs.
