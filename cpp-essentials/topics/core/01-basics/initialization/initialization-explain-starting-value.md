---
id: initialization-explain-starting-value
kind: explain
version: 1
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
elaborate: Which of your declarations would hold garbage today, and what is the one-token fix?
---

An interviewer asks what value a freshly declared C++ local variable or
struct starts with. Answer them.

---

- [ ] Problem: a local `int` declared without an initialiser has no defined value; reading it is undefined behaviour
- [ ] Mechanism: empty braces value-initialise a scalar, so it starts at zero
- [ ] Example: braces on a struct without constructors zero every member they give no value
- [ ] Cost: zeroing costs a store, so skip the braces only where the next line assigns
- [ ] Pitfall: a default constructor with your own body stops empty braces zeroing its members
