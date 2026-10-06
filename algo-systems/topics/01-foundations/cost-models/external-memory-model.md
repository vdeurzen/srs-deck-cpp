---
id: foundations-external-memory-model
kind: basic
version: 1
level: 4
requires:
  - foundations-cache-cost-model
tags: [complexity, cost-model, databases]
refs:
  - https://dl.acm.org/doi/10.1145/48529.48535
  - https://en.wikipedia.org/wiki/External_memory_algorithm
---

## What does the external-memory (I/O) model count, and what are the three bounds every database engineer knows in it?

---

It counts **block transfers**, not operations. The machine has `M` words
of fast memory and unbounded slow memory, and data moves between them in
blocks of `B` words; CPU work inside fast memory is free. `B` is a disk
page or a cache line, `M` is the buffer pool or the cache — the model is
the same shape at both scales, which is why it predicts B-tree fanout and
cache-friendly layouts with the same formula.

Three bounds:

- **Scan**: reading `N` items costs `Θ(N/B)` I/Os, not `Θ(N)`. Sequential
  access spreads each transfer over `B` items, which is why "just scan it" beats
  a clever index far more often than the RAM model suggests.
- **Sort**: `Θ((N/B)·log_(M/B)(N/B))` — the external merge sort bound.
  The logarithm is base `M/B`, the number of runs you can merge at once,
  so with a 1 GiB sort buffer and 4 KiB pages the fan-in is
  `M/B` ≈ 260 000 and essentially any real dataset sorts in **two passes**.
- **Search**: `Θ(log_B N)` for a B-tree — the reason the fanout, not the
  balance scheme, is the whole design. A red-black tree does `Θ(log N)`
  block transfers for the same data.

The lesson the model teaches, and the RAM model hides, is that `N/B` and
`N` are different worlds: a hash join that touches pages randomly and a
sort-merge join that streams them can have identical instruction counts
and differ by two orders of magnitude in time. Partitioning algorithms —
grace hash join, radix partitioning, LSM compaction — exist to turn
random access into sequential access at a known block size.
