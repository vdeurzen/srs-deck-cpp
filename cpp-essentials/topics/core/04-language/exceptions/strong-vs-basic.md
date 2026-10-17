---
id: exceptions-strong-vs-basic
kind: basic
version: 1
level: 2
tags: [exceptions, exception-safety]
requires:
  - exceptions-unwinding-destroys-locals
  - move-semantics-moved-from-state
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions
---

## What does the **strong** exception guarantee promise that the **basic** one doesn't?

---

**If the operation throws, the state is exactly as it was before the call.**

Commit or roll back. The basic guarantee only promises that invariants hold
and nothing leaks; the contents may have changed. `std::vector::push_back`
gives the strong one for copyable or nothrow-movable elements.
