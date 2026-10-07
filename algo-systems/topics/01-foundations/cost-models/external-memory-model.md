---
id: foundations-external-memory-model
kind: basic
version: 1
level: 4
requires:
  - foundations-cache-cost-model
tags: [complexity, cost-model, databases]
elaborate: A hash join that touches pages at random and a sort-merge join that streams them can execute the same number of instructions. Which one does this model say wins, and by how much?
refs:
  - https://dl.acm.org/doi/10.1145/48529.48535
  - https://en.algorithmica.org/hpc/external-memory/model/
---

## The RAM model counts operations. What does the external-memory (I/O) model count instead?

---

**Block transfers of `B` words between a fast memory of `M` words and an unbounded slow one.**
Work inside fast memory is free. `B` is a page and `M` the buffer pool,
or `B` a cache line and `M` the cache: the same model at both scales,
which is why it predicts B-tree fanout and cache-friendly layouts alike.
