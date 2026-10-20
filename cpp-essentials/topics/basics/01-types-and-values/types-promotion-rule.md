---
id: types-promotion-rule
kind: basic
version: 1
level: 1
tags: [types, integers, promotion]
requires:
  - types-signed-unsigned-range
elaborate: Say why `char a = 100, b = 100; int s = a + b;` gives 200 even though 200 does not fit a signed `char`.
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Integral_promotion
  - https://eel.is/c++draft/conv.prom
---

## With a 32-bit `int`, a `char` and an `unsigned char` meet in `x + y`. Is the addition done in `char`, `unsigned char` or `int`?

---

**In `int`: operands narrower than `int` are promoted to `int` first.**
Arithmetic never happens in a type smaller than `int`, so the sum of two
`char`s cannot overflow a `char`; it can only be cut down later, when
stored back into a `char` variable.
