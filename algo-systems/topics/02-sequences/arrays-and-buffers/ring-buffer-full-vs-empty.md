---
id: seq-ring-buffer-full-vs-empty
kind: basic
version: 1
level: 3
tags: [ring-buffer, low-latency, queues]
requires:
  - cpp-core/ptr-element-count
refs:
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.wikipedia.org/wiki/Circular_buffer
---

## In a ring buffer, `head == tail` means both empty and full. What are the three standard ways out, and which one do low-latency queues pick?

---

With two indices already wrapped into `[0, capacity)`, the empty and full
states are genuinely indistinguishable — both leave the indices equal.

1. **Waste one slot.** Full is `next(tail) == head`, so capacity is
   `N − 1`. Cheapest to reason about, and the usual choice for a
   fixed-size buffer where one slot costs nothing.
2. **Keep a separate count or flag.** Exact capacity, but the count is a
   *third* mutable word — which in a concurrent queue means a third thing
   two cores must agree on, on a cache line someone writes. It turns a
   clean single-producer/single-consumer design into a contended one.
3. **Keep free-running (unwrapped) 64-bit sequence numbers** and mask
   only when indexing. `tail − head` is the size, `== 0` is empty,
   `== capacity` is full, and the two counters are each written by
   exactly one side.

Low-latency queues take option 3. It gives full capacity, needs no shared
extra state, and gives the producer and consumer *monotonic* numbers to
reason with — a slot's sequence tells you which generation of data is in
it, which is what lets the Disruptor publish with a single release store
and no CAS. 64 bits do not wrap in practice: a billion messages a second
takes ~584 years.

Two details make it work. Compare with subtraction (`tail − head`), never
with `<` on the wrapped indices; and pad `head` and `tail` onto separate
cache lines, because the producer writes one and the consumer writes the
other and sharing the line would cost more than everything else here put
together.
