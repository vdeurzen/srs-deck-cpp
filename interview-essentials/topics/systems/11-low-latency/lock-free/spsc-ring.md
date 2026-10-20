---
id: ll-spsc-ring
kind: basic
version: 2
level: 4
tags: [low-latency, lock-free, queues, concurrency]
requires:
  - cpp-essentials/atomics-compare-exchange-failure
  - seq-ring-buffer-full-vs-empty
  - cpp-essentials/atomics-memory-order-intro
elaborate: What would break if a second producer thread were added, and what would `tail` then need?
refs:
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.cppreference.com/w/cpp/atomic/memory_order
---

## An SPSC ring has exactly one producer thread pushing and one consumer thread popping; `tail` is the next slot to write, `head` the next to read. Why does neither thread need `compare_exchange`?

---

**Each counter has exactly one writer.** Only the producer stores
`tail`, only the consumer `head`; each just *reads* the other's. A
read-modify-write arbitrates between writers, and there are none, so a
release store paired with the other thread's acquire load suffices.
