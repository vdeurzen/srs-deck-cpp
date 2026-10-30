---
id: types-explain-implicit-conversions
kind: explain
version: 3
level: 3
tags: [types, integers, conversions, interview]
requires:
  - types-promotion-rule
  - types-usual-arithmetic-conversions
  - types-mixed-sign-compare
  - types-brace-checks-constant
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Integral_promotion
  - https://en.cppreference.com/w/cpp/language/usual_arithmetic_conversions
  - https://en.cppreference.com/w/cpp/language/list_initialization#Narrowing_conversions
elaborate: Where in your own code does an `int` meet an unsigned value such as a `size()`, and what would you change there?
---

A teammate is surprised that `if (balance < limit)` compiles with an
`int` `balance` and an `unsigned` `limit`. Explain to them what C++ does
when arithmetic types mix.

---

- [ ] It compiles silently; GCC's `-Wall` sign-compare warning is the only clue before a wrong run-time result
- [ ] Operands narrower than `int` are first promoted to `int`
- [ ] Then both operands convert to one common type; a signed and an unsigned of equal width become unsigned
- [ ] So a negative `balance` becomes a huge unsigned value: `-5 < 10u` is false
- [ ] The fix is giving both operands one signedness yourself, for example a `std::size_t` index
