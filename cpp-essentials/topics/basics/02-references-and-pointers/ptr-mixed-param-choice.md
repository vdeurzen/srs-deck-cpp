---
id: ptr-mixed-param-choice
kind: basic
version: 1
level: 3
tags: [pointers, references, parameters, mixed-recognition]
requires:
  - fn-ref-param-intro
  - ptr-pointer-param-meaning
  - const-ref-names-caller
elaborate: Say which of the other three forms a reviewer would expect if the function also had to accept "no counter at all".
refs:
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f17-for-in-out-parameters-pass-by-reference-to-non-const
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f60-prefer-t-over-t-when-no-argument-is-a-valid-option
---

## `reset_counter` must set its caller's `int` to 0, and every caller always has one to pass. Which parameter type: `int`, `int&`, `const int&` or `int*`?

---

**`int&`: the function must write the caller's object, which is never absent.**

`int` writes only a copy, and `const int&` forbids the write. `int*`
works, but says "may be null" and forces a null test that can never fire.
