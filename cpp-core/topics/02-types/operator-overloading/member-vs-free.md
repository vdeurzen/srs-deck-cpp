---
id: operators-member-vs-free
kind: basic
version: 1
level: 1
tags: [operators, conversions]
requires:
  - class-explicit-constructor
refs:
  - https://en.cppreference.com/w/cpp/language/operators
  - https://en.cppreference.com/w/cpp/language/overload_resolution
---

## `Rational` has a non-explicit `Rational(int)` and a **member** `Rational operator+(Rational) const`. Why does `r + 2` compile but `2 + r` not?

---

**A member operator's left operand must already be a `Rational`; it is never converted.**

`r + 2` is `r.operator+(2)`: the argument converts through `Rational(int)`.
For `2 + r`, member candidates are looked up in the left operand's type,
`int`, which has none. A non-member `operator+(Rational, Rational)` treats
both sides alike.
