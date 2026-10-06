---
id: coroutines-return-object-timing
kind: basic
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-promise-type-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Execution
---

## In what order does the compiler call `get_return_object()` and `initial_suspend()`?

---

**`get_return_object()` first; its result is set aside before
`initial_suspend()` is awaited.** The full order: allocate the frame
and copy the parameters, construct the promise, `get_return_object()`,
`co_await initial_suspend()`, then the body. Why it matters: the
promise already exists at step three, so `Handle::from_promise(*this)`
can capture a handle to a body that has not started.
