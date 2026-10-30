---
id: operators-explain-canonical
kind: explain
version: 1
level: 3
tags: [operators]
requires:
  - cpp-essentials/operators-chunk-arithmetic-pair
  - operators-hidden-friend-adl
  - operators-postfix-increment
elaborate: Which other operator pairs in a value type of your own would you write in this shape, and what bug does it prevent?
refs:
  - https://en.cppreference.com/w/cpp/language/operators#Canonical_implementations
---
A reviewer asks why your `Rational` value type's `+=`, `+` and postfix `++`
are written the way they are. Explain it to them.
---
- [ ] `+=` is a member that modifies `*this` and returns `Rational&`, so chaining behaves like built-in types
- [ ] `+` takes its left operand by value and returns `l += r`, so the arithmetic lives only in `+=`
- [ ] `+` is a non-member, so both operands convert alike: `2 + r` works as well as `r + 2`
- [ ] Defined in the class as a hidden friend, `+` is found only by ADL, keeping unrelated overload sets clean
- [ ] Postfix `++(int)` copies `*this`, calls prefix `++`, and returns the old copy by value
