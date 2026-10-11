---
id: ptr-pointer-param-meaning
kind: basic
version: 1
level: 2
tags: [pointers, references, parameters]
requires:
  - ptr-arrow-null-check
  - ptr-reference-must-bind
refs:
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f60-prefer-t-over-t-when-no-argument-is-a-valid-option
  - https://en.cppreference.com/w/cpp/language/pointer#Null_pointers
---

## A header declares `void draw(const Shape* s);` (`s` points to a single object). What does the pointer tell a caller that `const Shape& s` would not?

---

**That "no shape" is an accepted argument: the caller may pass
`nullptr`.** A reference parameter must be bound to a real object, so it
cannot say "absent". The cost moves into `draw`: it must test
`s != nullptr` before every `*s` or `s->`. When absence is not
meaningful, take a reference and that check disappears.
