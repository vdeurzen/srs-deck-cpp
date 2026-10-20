---
id: atomics-pick-publish-once
kind: basic
version: 1
level: 3
tags: [concurrency, atomics, mixed-recognition]
requires:
  - atomics-handoff-worked
  - conc-condition-variable-intro
  - conc-mutex-takes-turns
elaborate: Say in one sentence what would change in your choice if the struct were rewritten every second instead of once.
refs:
  - https://en.cppreference.com/w/cpp/atomic/memory_order#Release-Acquire_ordering
  - https://en.cppreference.com/w/cpp/thread/condition_variable
---

## A loader thread fills a large settings struct once at start-up. Reader threads check, without ever blocking, whether it is complete before reading it. What do they check?

---

**An `std::atomic<bool>` flag: stored with release after filling, loaded with acquire.**

The cue is "written once, readers must never block". A mutex would make
every check take a lock; a condition variable puts readers to sleep.
The acquire load that sees `true` makes the whole struct visible.
