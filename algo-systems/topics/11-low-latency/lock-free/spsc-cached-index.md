---
id: ll-spsc-cached-index
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, queues, memory-hierarchy]
requires:
  - ll-spsc-ring
  - ll-false-sharing
refs:
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.algorithmica.org/hpc/cpu-cache/sharing/
---

## An SPSC producer keeps a private `cached_head` and re-reads the shared `head` only when the ring looks full. What does that save?

---

**A coherence miss per item: the consumer's line is read once per batch,
not per push.** Every consumer store to `head` invalidates the
producer's copy, so reading it each push is a cross-core transfer each
time. With `head` and `tail` already on separate lines, this is the
remaining shared-line traffic.
