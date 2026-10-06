---
id: class-explain-invariant-design
kind: explain
version: 1
level: 3
tags: [classes, invariants]
requires:
  - class-invariant-constructor
  - class-struct-default-access
  - class-explicit-constructor
  - class-const-member-function
  - class-rule-of-zero
refs:
  - https://en.cppreference.com/w/cpp/language/classes
  - https://en.cppreference.com/w/cpp/language/rule_of_three
---
Design a `Fraction` class aloud whose denominator can never be zero. Walk
through each choice and the bug it prevents.
---
- [ ] The constructor rejects a zero denominator, so no invalid `Fraction` ever exists
- [ ] The data members are `private`, so only member functions can break the invariant
- [ ] The single-argument constructor from `int` is a deliberate choice about implicit conversion (`explicit` unless `Fraction f = 3;` is wanted)
- [ ] Observers such as `num()` and `den()` are `const` members, so they work through `const Fraction&`
- [ ] Two `int`s need no resource management, so it declares no special members (Rule of Zero)
