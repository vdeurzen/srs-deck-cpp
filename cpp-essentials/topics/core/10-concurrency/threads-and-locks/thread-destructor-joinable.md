---
id: threads-thread-destructor-joinable
kind: basic
version: 2
level: 1
tags: [concurrency, threads, lifetimes]
requires:
  - conc-waiting-destructor
refs:
  - https://en.cppreference.com/w/cpp/thread/thread/~thread
  - https://en.cppreference.com/w/cpp/thread/jthread
elaborate: Say in one sentence, as to an interviewer, why `std::jthread` can safely pick join where `std::thread` refused to pick.
---

`t.detach()` lets the thread run on alone, with no `std::thread`
object attached to it.

## Destroying a still-joinable `std::thread` calls `std::terminate`. Why doesn't its destructor just `join()` or `detach()` instead?

---

**Either default hides a bug: an implicit join can hang, an implicit detach outlives locals.**

A silent `join` can block the destructor forever on a thread that
never ends; a silent `detach` leaves the thread reading locals that
were just destroyed. So `std::thread` refuses to choose. `std::jthread`
picks `join`, and also asks the thread to stop first.
