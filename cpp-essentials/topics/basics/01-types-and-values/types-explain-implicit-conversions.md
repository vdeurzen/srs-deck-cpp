---
id: types-explain-implicit-conversions
kind: explain
version: 2
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

- [ ] Problem: C++ converts mixed arithmetic operands silently; the code compiles, at most with a warning
- [ ] Mechanism: operands narrower than `int` promote to `int`, then both convert to one common type
- [ ] Example: an `int` meeting an `unsigned` of its width converts, so `-5 < 10u` is false
- [ ] Cost: the wrong result shows up only at run time; GCC's `-Wall` sign-compare warning is the one clue
- [ ] Contrast: brace initialisation rejects a narrowing conversion that `=` performs silently
