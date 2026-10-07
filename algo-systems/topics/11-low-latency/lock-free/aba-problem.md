---
id: ll-aba-problem
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, concurrency, misconception]
elaborate: Where in a lock-free structure you have read (or written) does a CAS assume that an unchanged value means an unchanged world?
requires:
  - cpp-core/atomics-chunk-cas-loop
refs:
  - https://en.wikipedia.org/wiki/ABA_problem
  - https://www.cs.rochester.edu/~scott/papers/1996_PODC_queues.pdf
---

## A lock-free stack pops by CAS: if `head` still equals what was read, nothing changed. Thread 1 reads `head == A`, `A->next == B`, then stalls. Thread 2 pops A, pops B, pushes A. What does thread 1's `head.compare_exchange_strong(A, B)` do?

---

**It succeeds, and installs `B` — a node no longer on the stack, perhaps
freed.** `head` is A again, so the compare passes: the ABA problem. A CAS
compares a *word*, not a *state*; the `next` pointer it implicitly
trusted changed underneath it.
