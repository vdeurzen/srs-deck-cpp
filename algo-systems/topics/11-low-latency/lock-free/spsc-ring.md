---
id: ll-spsc-ring
kind: basic
version: 2
level: 4
tags: [low-latency, lock-free, queues, concurrency]
requires:
  - ll-memory-orders
  - seq-ring-buffer-full-vs-empty
refs:
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.cppreference.com/w/cpp/atomic/memory_order
---

## An SPSC ring has `tail` (next slot to write) and `head` (next slot to read). Why does neither the producer nor the consumer need a CAS?

---

**Each counter has exactly one writer.** Only the producer stores
`tail`, only the consumer stores `head`; each merely *reads* the other's.
A read-modify-write exists to arbitrate between writers, and there are
none to arbitrate, so plain atomic loads and stores suffice.
