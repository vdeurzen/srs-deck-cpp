---
id: conc-explain-shared-counter
kind: explain
version: 1
level: 2
tags: [concurrency, threads]
requires:
  - conc-data-race-one-writer
  - conc-lock-the-counter
  - conc-check-then-act
refs:
  - https://en.cppreference.com/w/cpp/language/memory_model
  - https://en.cppreference.com/w/cpp/thread/lock_guard
  - https://en.cppreference.com/w/cpp/atomic/atomic
---
Four threads each add 1 000 to a plain global `int` with `++`, and the
total `main` prints is sometimes below 4 000. Explain why, and the ways
to make it correct.
---
- [ ] `++` on a shared `int` is a load, an add and a store, so two threads can interleave them and lose an update
- [ ] Two threads writing the same plain `int` with nothing ordering them is a data race, which is undefined behaviour, not merely a wrong count
- [ ] Fix one: a shared `std::mutex` locked by a named `std::lock_guard` around the increment, released at the end of its scope
- [ ] Fix two, for a single counter: `std::atomic<int>`, whose `++` is one indivisible step
- [ ] An atomic does not make a test followed by a change one step: `if (n > 0) --n;` can still interleave
