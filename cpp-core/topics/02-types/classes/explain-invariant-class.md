---
id: class-explain-invariant-design
kind: explain
version: 2
level: 3
tags: [classes, invariants]
requires:
  - class-invariant-constructor
  - class-struct-default-access
  - cpp-essentials/class-explicit-constructor
elaborate: Should `Fraction`'s constructor from a single `int` be `explicit`? Say which call that choice allows or forbids.
refs:
  - https://en.cppreference.com/w/cpp/language/classes
  - https://en.cppreference.com/w/cpp/language/access
---
An interviewer asks you to design a `Fraction` class whose denominator can
never be zero. Explain to them how your design guarantees it.
---
- [ ] The constructor rejects a zero denominator, so every `Fraction` is valid from creation
- [ ] Without such a constructor, a default-built `Fraction` would start with `den_` at 0, already broken
- [ ] The data members are `private`, so only member functions can later break the invariant
- [ ] So only the member functions that change `den_` need to check it, never the callers
- [ ] It is a `class`, not a `struct`: by convention `class` marks members that guard an invariant
