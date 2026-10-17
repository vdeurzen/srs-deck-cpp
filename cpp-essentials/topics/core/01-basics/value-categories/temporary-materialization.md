---
id: value-categories-temporary-materialization
kind: basic
version: 1
level: 3
tags: [value-categories]
requires:
  - value-categories-taxonomy
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Temporary_materialization
  - https://timsong-cpp.github.io/cppwp/n4950/conv.rval#1
---

## Since C++17, a prvalue such as `Widget{}` is not yet an object. When does a temporary `Widget` actually come into existence?

---

**When the prvalue is used where a glvalue is needed**, e.g. binding
`const Widget&` to it or calling `Widget{}.size()`. There the *temporary
materialization conversion* creates the object and turns the expression
into an xvalue denoting it. A prvalue that initializes an object of its
own type never materializes.
