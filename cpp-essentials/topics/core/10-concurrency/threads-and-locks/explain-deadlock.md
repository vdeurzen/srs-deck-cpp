---
id: threads-explain-deadlock
kind: explain
version: 1
level: 4
tags: [concurrency, threads, mutex, deadlock, interview]
requires:
  - conc-mutex-takes-turns
  - conc-deadlock-intro
  - threads-scoped-lock-two-mutexes
  - conc-lock-guard-intro
refs:
  - https://en.cppreference.com/w/cpp/thread/scoped_lock
  - https://en.cppreference.com/w/cpp/thread/lock
elaborate: Pick two mutexes your own code takes in different functions; say which fix fits there and why.
---
An interviewer asks how two threads can deadlock on mutexes in C++, and
how you prevent it. Answer them.
---
- [ ] Problem: each thread holds one mutex and waits for the other's, so neither ever continues
- [ ] Mechanism: `lock()` blocks until the holder unlocks, and a cycle of holders never unlocks
- [ ] Example: `transfer(a, b)` and `transfer(b, a)` each lock their first argument first
- [ ] Trade-off: `std::scoped_lock` locks both safely in one place; one fixed lock order also works across functions
- [ ] Pitfall: one `lock_guard` per mutex, in argument order, still deadlocks
