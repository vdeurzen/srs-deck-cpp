---
id: threads-cv-wait-needs-predicate
kind: basic
version: 1
level: 2
tags: [concurrency, threads, condition-variable]
requires:
  - conc-condition-variable-intro
refs:
  - https://en.cppreference.com/w/cpp/thread/condition_variable/wait
  - https://en.cppreference.com/w/cpp/thread/condition_variable
elaborate: Say in one sentence, as to an interviewer, why "it worked in every test" says nothing about a wait with no predicate.
---

`cv.notify_one()` wakes one thread blocked in `cv.wait(lk)`. A producer
adds a job with `++jobs` under `m`, then calls `cv.notify_one()`.

```cpp
std::unique_lock<std::mutex> lk(m);
cv.wait(lk);                 // unlocks m, sleeps, relocks m on wake
--jobs;
```

## Why is this consumer wrong?

---

**`wait` can return with `jobs` still 0, or sleep forever after a missed notify.**

A wake-up may be *spurious*, and a notify sent before the consumer waits
is *lost*. Test the shared state under the mutex before sleeping and
after every wake:

```cpp
while (jobs == 0) cv.wait(lk);
```
