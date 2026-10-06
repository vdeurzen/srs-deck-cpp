---
id: types-usual-arithmetic-conversions
kind: basic
version: 1
level: 2
tags: [types, integers, conversions]
requires:
  - types-integral-promotion
refs:
  - https://en.cppreference.com/w/cpp/language/usual_arithmetic_conversions
  - https://eel.is/c++draft/expr.arith.conv
---

## Given `int i = -1; unsigned u = 1;`, which operand of `i < u` converts, and to what?

---

**`i` converts to `unsigned int`, so `-1` becomes `4294967295`** (with a
32-bit `int`) and `i < u` is false. The usual arithmetic conversions give
both operands one common type; when a signed and an unsigned type share a
rank, the unsigned one wins. GCC's
`-Wsign-compare` (in `-Wall`) flags exactly this.
