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

## `cv.notify_one()` wakes one thread blocked in `cv.wait(lk)`. A producer pushes a job under `m`, then calls `cv.notify_one()`. Why is this consumer wrong?

```cpp
std::unique_lock lk(m);
cv.wait(lk);                 // unlocks m, sleeps, relocks m on wake
use(queue.front());
```

---

**Because a wake-up is not the condition.**

`wait` may return *spuriously* with `queue` empty, and a notify sent
before the consumer waits is *lost*, so it sleeps forever.
`cv.wait(lk, [&] { return !queue.empty(); })` loops `while (!pred())
wait(lk);`, testing the shared state under the mutex before sleeping and
after every wake.
