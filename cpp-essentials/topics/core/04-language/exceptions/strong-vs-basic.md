---
id: exceptions-strong-vs-basic
kind: basic
version: 1
level: 2
tags: [exceptions, exception-safety]
requires:
  - exceptions-unwinding-destroys-locals
  - iter-size-vs-capacity
  - class-invariant-who-checks
elaborate: Pick a function in your code that changes two members; say aloud which guarantee it gives if the second change throws.
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions
---

## What does the **strong** exception guarantee promise that the **basic** one doesn't?

---

**If the operation throws, the state is exactly as it was before the call.**

Basic only promises intact invariants and no leaks; contents may change.
`v.push_back(x)` on a `std::vector<int>` is strong: if growing the
buffer throws, `v` is unchanged. If the third `push_back` in a loop
throws, the first two stay: the loop is only basic.
