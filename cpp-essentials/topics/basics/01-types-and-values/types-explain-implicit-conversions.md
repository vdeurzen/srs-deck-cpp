---
id: types-explain-implicit-conversions
kind: explain
version: 1
level: 3
tags: [types, integers, conversions]
requires:
  - types-mixed-sign-compare
  - types-overflow-rules
  - types-brace-checks-constant
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Integral_promotion
  - https://en.cppreference.com/w/cpp/language/usual_arithmetic_conversions
  - https://en.cppreference.com/w/cpp/language/list_initialization#Narrowing_conversions
elaborate: Where in your own code does an `int` meet an unsigned value such as a `size()`, and what would you change there?
---

A Go teammate is surprised that C++ compiles `if (balance < limit)` with
an `int` `balance` and an `unsigned` `limit`, where Go refuses. Explain to
them what C++ does when arithmetic types mix.

---

- [ ] Problem: C++ converts mixed arithmetic types silently, where Go demands an explicit conversion
- [ ] Mechanism: both operands convert to one common type before the operation runs
- [ ] Example: with `unsigned limit = 10`, `-5 < limit` is false because `-5` becomes a huge unsigned value
- [ ] Trade-off: unsigned arithmetic wraps modulo 2ᴺ, whereas signed overflow is undefined behaviour
- [ ] Pitfall: `=` silently performs a narrowing conversion that braces would reject at compile time
