---
id: exceptions-explain-safety
kind: explain
version: 2
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

- [ ] At least the basic guarantee: after a throw, invariants still hold and nothing has leaked
- [ ] The strong guarantee adds that the state is exactly as before the call: commit or roll back
- [ ] Strong is usually got by doing the work on a copy, then committing with a swap
- [ ] That commit must never throw, which is why a container's `swap` is `noexcept`
- [ ] Unwinding runs each fully built local's destructor, so owning objects free their resources and nothing leaks
