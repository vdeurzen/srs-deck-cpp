---
id: seq-ring-buffer-full-vs-empty
kind: basic
version: 2
level: 3
tags: [ring-buffer, low-latency, queues]
elaborate: Where else does a counter that never wraps make a test simpler than an index that does?
requires:
  - seq-ring-waste-one-slot
refs:
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.wikipedia.org/wiki/Circular_buffer
---

## A ring buffer of N slots (N a power of two) keeps `head` and `tail` as 64-bit counters that only ever increase, and turns one into a slot only when indexing (a cheap bit mask wraps it into `[0, N)`). What does that buy over storing indices already wrapped into `[0, N)`?

---

**Empty and full become distinguishable: `tail − head` is the size, 0 or `N`.**
Wrapped indices are equal in both states, forcing a wasted slot or a
shared count. Here all `N` slots are usable, each counter has one
writer, and 2⁶⁴ messages at 10⁹/s take ~584 years to wrap.
