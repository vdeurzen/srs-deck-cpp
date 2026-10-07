---
id: ordered-eytzinger-cost
kind: basic
version: 1
level: 5
tags: [binary-search, layout, databases]
requires:
  - ordered-eytzinger-layout
refs:
  - https://en.algorithmica.org/hpc/data-structures/binary-search/
  - https://arxiv.org/abs/1509.05053
---

## What do you give up by storing a lookup table in Eytzinger order instead of sorted order?

---

**Sortedness: no range scans, and any insert means rebuilding the array.**

So it suits static, read-only tables searched many times: a column-store
segment's index, an interpolation table. For arrays that fit in L2, a
plain branchless search is already close; measure before switching.
