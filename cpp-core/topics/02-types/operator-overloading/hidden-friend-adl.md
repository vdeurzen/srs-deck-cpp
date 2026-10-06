---
id: operators-hidden-friend-adl
kind: basic
version: 1
level: 3
tags: [operators, friend, lookup]
requires:
  - operators-hidden-friend-symmetric
refs:
  - https://en.cppreference.com/w/cpp/language/adl
  - https://en.cppreference.com/w/cpp/language/friend
---

## A `friend` operator defined only inside `class Rational { ... };` (a "hidden friend") is never declared at namespace scope. How does `a + b` find it?

---

**Only by argument-dependent lookup, when an operand's type is `Rational`.**

Ordinary lookup cannot see it, so it is never a candidate for a `+` with
no `Rational` operand. Two other types that merely convert to `Rational`
therefore cannot be added through it by surprise.
