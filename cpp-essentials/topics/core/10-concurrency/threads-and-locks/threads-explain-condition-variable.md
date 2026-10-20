---
id: threads-explain-condition-variable
kind: explain
version: 1
level: 3
tags: [concurrency, threads, condition-variable]
requires:
  - conc-condition-variable-intro
  - threads-chunk-cv-wait
  - threads-cv-wait-lock-type
  - threads-cv-wait-needs-predicate
refs:
  - https://en.cppreference.com/w/cpp/thread/condition_variable
  - https://en.cppreference.com/w/cpp/thread/condition_variable/wait
elaborate: Say what this wait still guarantees if two consumer threads share the queue and one job wakes both of them.
---

A teammate's consumer thread loops, re-reading a shared queue until a
producer adds work. Explain to them how it should wait instead.

---

- [ ] Problem: a consumer should sleep until the shared state changes, not loop re-checking it
- [ ] Mechanism: `cv.wait` unlocks the mutex and sleeps; each wake-up relocks it and rechecks the predicate
- [ ] Example: wait for "queue not empty", then pop while still holding the lock
- [ ] Trade-off: `wait` needs a `std::unique_lock`, not a `lock_guard`, because it must release and retake the lock
- [ ] Pitfall: a wait with no predicate can return on a spurious wake-up, queue still empty
