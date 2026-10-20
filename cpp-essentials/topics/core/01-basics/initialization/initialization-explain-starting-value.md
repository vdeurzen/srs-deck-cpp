---
id: initialization-explain-starting-value
kind: explain
version: 1
level: 3
tags: [initialization]
requires:
  - initialization-default-value-zero
  - initialization-aggregate-braces
  - initialization-brace-prefers-initializer-list
  - initialization-user-ctor-no-zero
refs:
  - https://en.cppreference.com/w/cpp/language/default_initialization
  - https://en.cppreference.com/w/cpp/language/value_initialization
  - https://en.cppreference.com/w/cpp/language/aggregate_initialization
elaborate: Go zeroes every variable for you. Say which of your C++ declarations would hold garbage today, and the one-token fix.
---

An interviewer asks what value a freshly declared C++ local variable or
struct starts with. Answer them.

---

- [ ] Problem: reading an uninitialised local `int` is undefined behaviour
- [ ] Mechanism: empty braces value-initialise a scalar, so it starts at zero
- [ ] Example: braces on a struct without constructors fill members in declaration order
- [ ] Trade-off: braces prefer an `initializer_list` constructor, so a vector given two numbers holds both
- [ ] Pitfall: a default constructor with your own body stops empty braces zeroing its members
