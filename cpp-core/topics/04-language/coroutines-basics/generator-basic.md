---
id: coroutines-generator-basic
kind: basic
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-eager-vs-lazy-start
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
---

## In C++23's `std::generator<T>`, what happens to the coroutine's execution when the caller does not advance the range past the first `co_yield`?

---

Nothing past that first suspension point ever runs. A coroutine using
`co_yield` is **lazy**: the body executes only up to the next
`co_yield` (or `co_return`) each time the caller resumes it — by
incrementing the `generator`'s iterator, in practice. If the caller
stops iterating early, code after the last reached `co_yield` simply
never executes, and the coroutine's frame is destroyed (running any
pending destructors) when the `generator` itself is destroyed.

This is why a generator can lazily produce values from an unbounded
sequence — `co_yield`ing forever from `while (true)` — without ever
looping past whatever the caller actually consumed.
