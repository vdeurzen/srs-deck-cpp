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

**Nothing past that `co_yield` ever runs.** Each time the consumer
increments the iterator, the body runs only to the next `co_yield` or
`co_return`. Code never reached never executes, and destroying the
`generator` destroys the frame, running the destructors of its live
locals. Why it matters: `while (true) co_yield next();` is fine — an
unbounded sequence costs only what is consumed.
