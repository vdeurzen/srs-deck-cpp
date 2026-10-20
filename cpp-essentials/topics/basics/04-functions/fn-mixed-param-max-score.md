---
id: fn-mixed-param-max-score
kind: basic
version: 1
level: 3
tags: [functions, parameters, recognition]
requires:
  - fn-param-change-intro
  - fn-ref-param-intro
  - const-ref-names-caller
elaborate: Say in one sentence, as to an interviewer, what a `const&` parameter promises the caller.
refs:
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f16-for-in-parameters-pass-cheaply-copied-types-by-value-and-others-by-reference-to-const
---

## A function returns the largest of 50 000 scores held in the caller's `std::vector<int>`, changing nothing. What parameter type does it take?

---

**`const std::vector<int>&`: it only reads a large object.**

The `&` avoids copying 50 000 elements on every call, and the `const`
lets the compiler reject any write. A plain `std::vector<int>&` would
also avoid the copy, but would let the function change the scores.
