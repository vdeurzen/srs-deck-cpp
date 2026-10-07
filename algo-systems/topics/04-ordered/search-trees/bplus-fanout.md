---
id: ordered-bplus-fanout
kind: basic
version: 1
level: 4
requires:
  - ordered-bplus-tree
tags: [trees, databases, storage]
refs:
  - https://dl.acm.org/doi/10.1145/356770.356776
---

## Same page size, same keys: why is a B⁺-tree shallower than a B-tree that stores records in its internal nodes?

---

**Internal pages carry no payload, so many more separators fit per page.**

Higher fanout means fewer levels, and the internal levels become small
enough to stay resident in the buffer pool: a lookup then costs about one
leaf read.
