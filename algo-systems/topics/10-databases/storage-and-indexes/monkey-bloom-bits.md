---
id: db-monkey-bloom-bits
kind: basic
version: 1
level: 5
tags: [databases, storage, lsm, sketches]
requires:
  - db-lsm-read-path
  - db-lsm-space-amp
refs:
  - https://dl.acm.org/doi/10.1145/3035918.3064054
---

## A fixed memory budget buys Bloom filters for every LSM level. Why does Monkey give the small upper levels more bits per key than the bottom?

---

**A lookup pays the sum of every level's false-positive rate, and upper-level bits are cheap.**

The bottom level holds ~90 % of the keys, so one more bit per key there
costs about nine times what it costs on all the levels above together.
Spending those bits higher up lowers the sum more per byte of memory.
