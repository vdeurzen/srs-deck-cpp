---
id: ll-progress-guarantees
kind: basic
version: 1
level: 4
tags: [low-latency, lock-free, concurrency, misconception]
elaborate: Think of a lock in code you own. Is the problem it causes throughput, or the tail when its holder is descheduled?
requires:
  - ll-progress-ladder
refs:
  - https://dl.acm.org/doi/10.1145/114005.102808
  - https://doi.org/10.1109/ICDCS.2003.1203503
  - https://en.cppreference.com/w/cpp/atomic/atomic/is_lock_free
---

## A team replaces a `std::mutex`-guarded queue with a lock-free one "because lock-free is faster". What does lock-freedom actually buy them?

---

**A progress guarantee, not speed: a stalled thread cannot stop the
others.** An uncontended mutex is a couple of atomics, often cheaper than
CAS retries bouncing a line under contention. The gains are in the tail
and the failure modes: no convoy behind a preempted holder, no priority
inversion, usable where blocking is forbidden.
