---
id: initialization-explain-starting-value
kind: explain
version: 2
level: 3
tags: [initialization]
requires:
  - initialization-default-value-zero
  - initialization-aggregate-braces
  - initialization-user-ctor-no-zero
refs:
  - https://en.cppreference.com/w/cpp/language/default_initialization
  - https://en.cppreference.com/w/cpp/language/value_initialization
  - https://en.cppreference.com/w/cpp/language/aggregate_initialization
  - https://en.cppreference.com/w/cpp/language/data_members#Member_initialization
elaborate: Which of your declarations would hold garbage today, and what is the one-token fix?
---

An interviewer asks what value a freshly declared C++ local variable or
struct starts with. Answer them.

---

- [ ] A local `int` declared without an initialiser has an indeterminate value; reading it is undefined behaviour
- [ ] Empty braces value-initialise a scalar, so `int n{};` starts at zero
- [ ] Braces on a struct without constructors zero every member they give no value
- [ ] A default constructor with your own body stops empty braces zeroing its members
- [ ] A member with its own initialiser in the class, such as `int ticks = 0;`, starts at that value
