---
id: hash-double-hashing-cost
kind: basic
version: 1
level: 4
requires:
  - hash-quadratic-probing
  - hash-swiss-table-metadata
tags: [hashing, open-addressing, memory-hierarchy]
refs:
  - https://abseil.io/about/design/swisstables
  - https://github.com/facebook/folly/blob/main/folly/container/detail/F14Table.h
---

## Double hashing (`h1(k) + i·h2(k)`) comes closest to uniform hashing. Why don't fast tables probe slot by slot that way?

---

**Every probe lands on a different cache line.**

Modern tables probe linearly *inside* a group of 8–16 slots that share a
line, testing it with one SIMD compare, and jump between groups only when
one is full: quadratically in Swiss tables, by a key-derived stride in
F14.
