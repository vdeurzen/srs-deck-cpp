---
id: ub-signed-overflow-no-wrap
kind: basic
version: 1
level: 1
tags: [undefined-behaviour, integers]
requires:
  - ub-passing-tests-prove-nothing
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
  - https://eel.is/c++draft/basic.fundamental
---

## Given `int a = INT_MAX;` and `unsigned u = UINT_MAX;`, which of `a + 1` and `u + 1` has a defined result?

---

**Only `u + 1`: unsigned arithmetic wraps around, giving 0.** Unsigned
types compute modulo 2ⁿ by definition. Signed overflow is undefined
behaviour, even though the hardware would wrap: the compiler may assume
it never happens.
