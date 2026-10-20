---
id: threads-pick-two-fields
kind: basic
version: 1
level: 3
tags: [concurrency, threads, mixed-recognition]
requires:
  - conc-atomic-or-mutex
  - conc-check-then-act
  - conc-condition-variable-intro
elaborate: Name a pair of values in your own code that must change together, and say what a reader would see if it read between the two updates.
refs:
  - https://en.cppreference.com/w/cpp/thread/mutex
  - https://en.cppreference.com/w/cpp/atomic/atomic
---

## Several threads update an account's `balance` and its `entries` count, which must always change together. Which standard primitive keeps the pair consistent?

---

**One `std::mutex`, held across both updates.**

The cue is "several values change as one". Making each field atomic
makes each update indivisible, but another thread can still read
between the two. A condition variable waits for a change; it does not
protect one.
