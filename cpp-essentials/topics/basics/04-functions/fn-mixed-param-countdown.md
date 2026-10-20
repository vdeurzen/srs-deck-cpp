---
id: fn-mixed-param-countdown
kind: basic
version: 1
level: 3
tags: [functions, parameters, recognition]
requires:
  - fn-param-change-intro
  - fn-ref-param-intro
  - const-ref-names-caller
elaborate: Where in your code is a small value taken by `const&` when a plain copy would be simpler?
refs:
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f16-for-in-parameters-pass-cheaply-copied-types-by-value-and-others-by-reference-to-const
---

## A function counts down from the caller's `int` start value to 0, decrementing as it goes, and the caller's variable must not change. What parameter type does it take?

---

**`int`, by value: the function wants its own copy to change.**

Copying an `int` costs nothing, and writes to the copy never reach the
caller. `int&` would change the caller's variable; `const int&` would
forbid the decrement.
