---
id: ptr-const-ref-read-only
kind: basic
version: 1
level: 1
tags: [references, const, parameters]
requires:
  - ptr-bump-by-reference
refs:
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f16-for-in-parameters-pass-cheaply-copied-types-by-value-and-others-by-reference-to-const
  - https://en.cppreference.com/w/cpp/language/reference
---

## `total` only reads its argument. Why declare it `int total(const std::vector<int>& v)` rather than `int total(std::vector<int> v)`?

---

**To read the caller's vector without copying every element.** By value,
each call copies the whole vector first. `const&` makes `v` another name
for the caller's vector, and the `const` makes any write through `v` a
compile error, so the caller's data stays safe. For small types such as
`int`, plain by-value is as cheap and simpler.
