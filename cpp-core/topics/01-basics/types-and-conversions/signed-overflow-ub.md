---
id: types-signed-overflow-ub
kind: basic
version: 1
level: 2
tags: [types, integers, undefined-behaviour]
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
  - https://eel.is/c++draft/expr.pre#4
---

## At `-O2`, GCC compiles `bool f(int x) { return x + 1 > x; }` to `return true;`, but keeps the comparison for `unsigned x`. Why?

---

**Signed overflow is undefined behaviour, so the optimiser may assume
`x + 1` never overflows.** Under that assumption `x + 1 > x` always
holds. Unsigned arithmetic is defined to wrap modulo 2ᴺ, so for
`UINT_MAX` the comparison really is false and must be computed.
