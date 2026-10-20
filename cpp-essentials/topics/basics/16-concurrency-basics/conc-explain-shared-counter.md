---
id: conc-explain-shared-counter
kind: explain
version: 1
level: 2
tags: [concurrency, threads]
requires:
  - conc-data-race-one-writer
  - conc-atomic-or-mutex
  - conc-check-then-act
  - conc-lock-the-counter
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
- [ ] Problem: `++` is a load, an add and a store, so two threads can interleave them and lose updates
- [ ] Mechanism: unordered writes to one plain `int` from two threads are a data race, so undefined behaviour
- [ ] Fix: a named `std::lock_guard` on one shared `std::mutex` lets one thread at a time increment
- [ ] Trade-off: for one counter, `std::atomic<int>` makes `++` one indivisible step, with no lock to block on
- [ ] Pitfall: an atomic does not turn a test followed by a change into one indivisible step
