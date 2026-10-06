---
id: threads-cv-wait-needs-predicate
kind: basic
version: 1
level: 2
tags: [concurrency, threads, condition-variable]
requires:
  - threads-data-race-is-ub
refs:
  - https://en.cppreference.com/w/cpp/thread/condition_variable/wait
  - https://en.cppreference.com/w/cpp/thread/condition_variable
---

## Why is `cv.wait(lk)` on its own wrong, when `cv.wait(lk, pred)` is right?

---

**Because a wake-up is not the condition.**

`wait` may return *spuriously*, and a `notify` sent before the thread
waits is *lost*. The predicate overload is `while (!pred()) wait(lk);`:
it tests the shared state, under the mutex, before sleeping and after
every wake, so both failures are harmless.
