---
id: linkage-inline-meaning
kind: basic
version: 1
level: 2
tags: [linkage, inline, misconception]
requires:
  - linkage-odr-class-repeat
refs:
  - https://en.cppreference.com/w/cpp/language/inline
  - https://eel.is/c++draft/basic.def.odr
elaborate: Which functions in your own headers are `inline` only implicitly, because they are templates, `constexpr`, or defined inside a class?
---

## "Marking a function defined in a header `inline` asks the compiler to inline its calls." What does `inline` actually change?

---

**It lets every translation unit hold an identical definition without a
link error; the linker keeps one.** Without it, a header-defined function
is a duplicate definition in each `.cpp`. Inlining calls is the
optimiser's own decision, keyword or not. Since C++17 the same applies
to `inline` variables.
