---
id: db-morsel-driven
kind: basic
version: 1
level: 5
tags: [databases, parallelism, numa]
requires:
  - db-vectorised-batch
refs:
  - https://db.in.tum.de/~leis/papers/morsels.pdf
---

## Morsel-driven parallelism (HyPer) hands threads morsels of about 100 000 tuples. Why that size, and not one cache-sized vector?

---

**Big enough to amortise scheduling, small enough that idle threads can steal the remainder.**

A morsel is a unit of load balancing, not of cache residency: that is the
vector's job inside it. Threads take morsels from their own NUMA socket
first, so a skewed range evens out without one thread finishing last.
