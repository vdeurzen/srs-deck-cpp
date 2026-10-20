---
id: linkage-inline-meaning
kind: basic
version: 1
level: 2
tags: [linkage, inline, misconception]
requires:
  - linkage-odr-class-repeat
  - linkage-inline-header-fix
refs:
  - https://en.cppreference.com/w/cpp/language/inline
  - https://eel.is/c++draft/basic.def.odr
elaborate: Which functions in your own headers are `inline` only implicitly, because they are templates, `constexpr`, or defined inside a class?
---

Many expect `inline` on a function defined in a header to ask the
compiler to inline its calls (paste the function's body at each call
site).

## What does `inline` actually change?

---

**It lets every translation unit hold an identical definition without a
link error; the linker keeps one.** Without it, a header-defined function
is a duplicate definition in each `.cpp`. Inlining calls is the
compiler's own decision, keyword or not. Since C++17 the same applies
to `inline` variables.
