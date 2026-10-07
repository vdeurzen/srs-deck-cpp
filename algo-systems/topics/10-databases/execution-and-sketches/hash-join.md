---
id: db-hash-join
kind: basic
version: 2
level: 3
tags: [databases, joins, memory-hierarchy]
requires:
  - hash-chaining-vs-open-addressing
  - foundations-cache-cost-model
refs:
  - https://www.vldb.org/pvldb/vol7/p85-balkesen.pdf
  - https://15445.courses.cs.cmu.edu/
---

## An in-memory hash join builds a table on one input and probes it with the other. Which input should it build on?

---

**The smaller one: its table must fit in memory, ideally in cache, while the larger streams past.**

Each side is read once, O(|R| + |S|). The table's cost is random access:
once it outgrows the cache, every probe is a cache miss, and the join
slows by several times.
