---
id: types-promotion-rule
kind: basic
version: 1
level: 1
tags: [types, integers, promotion]
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Integral_promotion
  - https://eel.is/c++draft/conv.prom
---

## `char`, `short` and `unsigned char` values meet in `x + y`. In what type is the addition done?

---

**In `int`: operands narrower than `int` are promoted to `int` first.**
Arithmetic never happens in a type smaller than `int`, so the sum of two
`short`s cannot overflow a `short`; it can only be cut down later, when
stored back into a narrow variable.
