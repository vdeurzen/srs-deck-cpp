---
id: fn-mixed-param-sorting
kind: basic
version: 1
level: 3
tags: [functions, parameters, recognition]
requires:
  - fn-param-change-intro
  - fn-ref-param-intro
  - const-ref-names-caller
elaborate: Name a function in your code that changes its caller's container; does its parameter type say so?
refs:
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f17-for-in-out-parameters-pass-by-reference-to-non-const
---

## A function puts the caller's `std::vector<int>` into ascending order, in place. What parameter type does it take?

---

**`std::vector<int>&`: the function must change the caller's own vector.**

By value it would sort a copy the caller never sees; `const std::vector<int>&`
refers to the caller's vector but forbids the writes that sorting needs.
