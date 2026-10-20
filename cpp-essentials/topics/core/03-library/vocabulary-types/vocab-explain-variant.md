---
id: vocab-explain-variant
kind: explain
version: 1
level: 3
tags: [vocabulary-types, variant]
requires:
  - vocab-variant-intro
  - vocab-variant-closed-set
  - vocab-visit-missing-handler
refs:
  - https://en.cppreference.com/w/cpp/utility/variant
  - https://en.cppreference.com/w/cpp/utility/variant/visit
elaborate: Name a set of message or event kinds in your own code; is it closed enough for a `std::variant`, or does it need to stay open?
---

An interviewer asks you to explain `std::variant`: what it is for and how
it works. Answer aloud in about a minute.

---

- [ ] Problem: a value must be exactly one of a fixed list of types, known when the code is written
- [ ] Mechanism: `std::variant<A, B, C>` stores one alternative in place and remembers which is active
- [ ] Example: assigning `"hi"` to a `variant<int, std::string>` holding 3 destroys the `int` and stores the string
- [ ] Trade-off: the set is closed, so a new alternative breaks every `std::visit` lacking its handler, at compile time
- [ ] Contrast: a virtual base class is open; anyone adds derived types, so nothing checks a handler covers all
