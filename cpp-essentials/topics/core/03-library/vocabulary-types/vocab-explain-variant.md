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

- [ ] A `std::variant` value is exactly one of a fixed list of types, known when the code is written
- [ ] `std::variant<A, B, C>` stores one alternative in place and remembers which is active
- [ ] Assigning a string to a `variant<int, std::string>` holding 3 destroys the `int` and stores the string
- [ ] A fixed list lets the compiler check handlers: a new alternative breaks every `std::visit` lacking one
- [ ] (empty: tick this)
