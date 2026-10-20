---
id: exceptions-explain-safety
kind: explain
version: 1
level: 3
tags: [exceptions, exception-safety]
requires:
  - exceptions-unwinding-destroys-locals
  - exceptions-which-guarantee
  - exceptions-commit-by-swap
  - exceptions-strong-vs-basic
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions#Exception_safety
  - https://en.cppreference.com/w/cpp/language/throw#Stack_unwinding
elaborate: Pick a function of yours that changes a container in a loop; which guarantee does it give today, and what would the strong one cost?
---

An interviewer asks what it means for a function that modifies a container
to be exception-safe. Answer them.

---

- [ ] Problem: a throw halfway through an update can leave an object partly changed
- [ ] Mechanism: unwinding runs the destructor of every fully built local, in reverse order of construction
- [ ] Example: a loop of `push_back`s that throws keeps the earlier elements: the basic guarantee
- [ ] Cost: the strong guarantee pays for a full copy, and its allocation, on every call
- [ ] Contrast: basic keeps invariants and leaks nothing; strong leaves the state exactly as before the call
