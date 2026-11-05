---
id: exceptions-explain-safety
kind: explain
version: 2
level: 3
tags: [exceptions, exception-safety]
requires:
  - exceptions-which-guarantee
  - exceptions-strong-vs-basic
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions#Exception_safety
  - https://en.cppreference.com/w/cpp/language/throw#Stack_unwinding
elaborate: Pick a function of yours that changes a container in a loop; which guarantee does it give today, and what would the strong one cost?
---

An interviewer asks what it means for a function that modifies a container
to be exception-safe. Answer them.

---

- [ ] The basic guarantee is the minimum: after a throw, invariants still hold and nothing has leaked
- [ ] A single `push_back` on a `std::vector<int>` is strong: if growing the buffer throws, the vector is unchanged
- [ ] The strong guarantee is that a throw leaves the state exactly as before the call: commit or roll back
- [ ] `push_back` in a loop is only basic: elements appended before a throw stay
- [ ] (empty: tick this)
