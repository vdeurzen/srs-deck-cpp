---
id: operators-explain-canonical
kind: explain
version: 1
level: 3
tags: [operators]
requires:
  - operators-chunk-arithmetic-pair
  - operators-hidden-friend-adl
  - operators-postfix-increment
refs:
  - https://en.cppreference.com/w/cpp/language/operators#Canonical_implementations
---
You are adding arithmetic and increment to a `Rational` value type. Explain
the canonical shape of each operator and why it has that shape.
---
- [ ] `+=` is a member that modifies `*this` and returns `Rational&`, so chaining behaves like built-in types
- [ ] `+` takes its left operand by value and returns `l += r`, so the arithmetic is written once, in `+=`
- [ ] `+` is a non-member, so both operands get the same implicit conversions (`2 + r` as well as `r + 2`)
- [ ] Defined in the class as a hidden friend, `+` is found only by ADL, keeping unrelated overload sets clean
- [ ] Postfix `++(int)` copies `*this`, calls prefix `++`, and returns the old copy by value
