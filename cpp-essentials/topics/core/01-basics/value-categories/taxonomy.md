---
id: value-categories-taxonomy
kind: basic
version: 1
level: 1
tags: [value-categories]
requires:
  - value-categories-third-category
elaborate: Say in one sentence, as to an interviewer, why the language needs a category that is both a glvalue and an rvalue.
refs:
  - https://en.cppreference.com/w/cpp/language/value_category
  - https://timsong-cpp.github.io/cppwp/n4950/basic.lval#1
---

## Every C++ expression is an lvalue, an xvalue or a prvalue. How do the composite categories *glvalue* and *rvalue* divide up those three?

---

**glvalue = lvalue or xvalue; rvalue = xvalue or prvalue.** A glvalue
has *identity* (it denotes an object you could refer to again); an rvalue
may be *moved from*. The xvalue is in both: an object with identity that
you have marked as safe to move from.
