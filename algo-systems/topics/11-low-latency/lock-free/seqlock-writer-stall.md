---
id: ll-seqlock-writer-stall
kind: basic
version: 1
level: 5
tags: [low-latency, concurrency, seqlock]
requires:
  - ll-seqlock
  - ll-progress-ladder
refs:
  - https://www.kernel.org/doc/html/latest/locking/seqlock.html
---

## A seqlock writer is descheduled after making the counter odd and before making it even. What do the readers do?

---

**They retry until the writer runs again: seqlock readers are
blocking.** Readers take no lock, but they cannot finish without the
writer; a fast writer can also starve them. That is why the writer side
runs with preemption off in the kernel, and on an isolated core in user
space.
