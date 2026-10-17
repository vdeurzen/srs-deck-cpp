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

Basic only promises intact invariants and no leaks; contents may change.
If `v.push_back(x)` throws while reallocating, `v` is unchanged (strong, for
copyable or nothrow-movable elements). If the third `push_back` in a loop
throws, the first two stay: the loop is only basic.
