---
id: initialization-most-vexing-parse
kind: basic
version: 1
level: 2
tags: [initialization]
requires:
  - class-constructor-intro
  - fn-declaration-vs-definition
refs:
  - https://en.cppreference.com/w/cpp/language/direct_initialization
  - https://timsong-cpp.github.io/cppwp/n4950/dcl.ambig.res#1
elaborate: Say aloud why you might now default to braces when constructing an object from a freshly built argument.
---

## Why does `Widget w(Gadget());` declare a function instead of constructing a `Widget` from a default-constructed `Gadget`?

---

**`Gadget()` can parse as a parameter declaration, and a declaration
wins.** This "most vexing parse" makes `w` a function returning `Widget`
whose one parameter is itself a function (taking nothing, returning
`Gadget`). Braces can never be a parameter declaration, so
`Widget w{Gadget{}};` constructs.
