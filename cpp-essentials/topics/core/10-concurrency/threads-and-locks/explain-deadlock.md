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
- [ ] Each thread holds one mutex and blocks on the other's; a cycle of holders never unlocks
- [ ] Two threads locking the same two mutexes in opposite orders can deadlock, even with `lock_guard`s
- [ ] `std::scoped_lock` locks both mutexes together, so lock order stops mattering
- [ ] One fixed lock order for every thread prevents it, even across separate functions
- [ ] (empty: tick this)
