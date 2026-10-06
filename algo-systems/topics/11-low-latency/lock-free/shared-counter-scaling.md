---
id: ll-shared-counter-scaling
kind: basic
version: 1
level: 3
tags: [concurrency, cache-coherence, scaling]
requires:
  - foundations-latency-scale
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic/fetch_add
  - https://www.kernel.org/pub/linux/kernel/people/paulmck/perfbook/perfbook.html
---

## Sixteen threads each run `hits.fetch_add(1)` on one `std::atomic<long>`. Why is the total rate lower than one thread's?

---

**Every increment needs the cache line exclusively, so the line moves
between cores on every write.** Only one core can write at a time, and
each handoff costs a cross-core transfer (tens of ns) instead of an L1
hit.

The fix is to stop sharing: a per-thread counter, padded to its own
line, summed when someone reads the total.
