---
id: ptr-pointer-param-meaning
kind: basic
version: 1
level: 2
tags: [pointers, references, parameters]
requires:
  - ptr-reference-must-bind
  - ptr-null-pointer
elaborate: Find a pointer parameter in your own code. Is null ever a meaningful argument, or should it be a reference?
refs:
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#f60-prefer-t-over-t-when-no-argument-is-a-valid-option
  - https://en.cppreference.com/w/cpp/language/pointer#Null_pointers
---

## A function is declared `void draw(Shape* s);`. What does taking a pointer tell callers that `Shape& s` would not?

---

**That "no shape" is an accepted argument: the caller may pass
`nullptr`.** A reference parameter must be bound to a real object, so it
cannot say "absent". The cost moves into `draw`: it must test
`s != nullptr` before every use of `*s`. When absence is not
meaningful, take a reference and that check disappears.
