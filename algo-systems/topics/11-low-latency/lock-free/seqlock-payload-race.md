---
id: ll-seqlock-payload-race
kind: basic
version: 1
level: 5
tags: [low-latency, concurrency, seqlock, undefined-behaviour]
requires:
  - ll-seqlock
  - cpp-core/threads-data-race-is-ub
refs:
  - https://dl.acm.org/doi/10.1145/2247684.2247688
  - https://en.cppreference.com/w/cpp/atomic/atomic_ref
---

## A seqlock reader `memcpy`s a plain `struct Quote` and throws the copy away if the counter changed. Why is that undefined behaviour in C++ even though torn copies are never used?

---

**A torn copy is a non-atomic read concurrent with a write: a data race,
and the race itself is the UB.** Discarding the value afterwards does
not help. Read the payload words with relaxed atomics (`std::atomic_ref`
over the fields); most code `memcpy`s anyway and ThreadSanitizer
reports it.
