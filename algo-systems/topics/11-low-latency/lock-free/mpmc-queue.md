---
id: ll-mpmc-queue
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, queues, concurrency]
requires:
  - ll-spsc-ring
refs:
  - https://www.1024cores.net/home/lock-free-algorithms/queues/bounded-mpmc-queue
  - https://www.cs.rochester.edu/~scott/papers/1996_PODC_queues.pdf
---

## An SPSC ring gains a second producer, and both still do "read `tail`, write the slot, store `tail + 1`". What goes wrong?

---

**Both can read the same `tail` and write the same slot: one element is
lost.** The SPSC proof rested on `tail` having one writer. Claiming
with a fetch-add fixes the collision but leaves a **hole**: a slot
claimed, not yet written, that a consumer following `tail` would read as
data.
