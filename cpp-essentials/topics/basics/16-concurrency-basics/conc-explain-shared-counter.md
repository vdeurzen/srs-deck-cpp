---
id: conc-explain-shared-counter
kind: explain
version: 2
level: 2
tags: [concurrency, threads]
requires:
  - conc-lost-update-worked
  - conc-mutex-takes-turns
  - conc-lock-the-counter
  - conc-atomic-or-mutex
  - conc-data-race-one-writer
elaborate: Say where else in your own code a value is read, changed and written back by more than one thread, and which of these fixes fits it.
refs:
  - https://en.cppreference.com/w/cpp/language/memory_model
  - https://en.cppreference.com/w/cpp/thread/lock_guard
  - https://en.cppreference.com/w/cpp/atomic/atomic
---
Four threads each add 1 000 to a plain global `int` with `++`, and the
total `main` prints is sometimes below 4 000. Talk the teammate who
wrote it through this, aloud.
---
- [ ] `++` is a load, an add and a store, so two threads can interleave them and lose updates
- [ ] It is worse than lossy: unordered writes to a plain `int` are a data race, undefined behaviour
- [ ] A `std::mutex` lets one thread at a time past `lock()`, so those three steps cannot interleave
- [ ] A named `std::lock_guard` on one shared mutex around the `++` makes the total always 4 000
- [ ] For one counter, `std::atomic<int>` makes `++` one indivisible step, with no lock to wait on
