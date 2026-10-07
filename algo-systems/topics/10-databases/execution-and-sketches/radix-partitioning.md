---
id: db-radix-partitioning
kind: basic
version: 1
level: 5
tags: [databases, joins, memory-hierarchy]
requires:
  - db-grace-hash-join
refs:
  - https://www.vldb.org/pvldb/vol7/p85-balkesen.pdf
elaborate: Radix joins split 2¹⁴ partitions into two passes of 2⁷ rather than one pass. Which hardware resource runs out when one pass writes to too many partitions at once?
---

## The build table fits in RAM but is twenty times the L2 cache. Why does a radix join first partition both inputs by a few hash bits?

---

**So each partition's hash table fits in cache, and its probes stop missing.**

It is grace hash join one level up the hierarchy. Partitioning costs a
histogram pass and a scatter pass, both streaming reads and writes, and is repaid in
cache misses avoided once the table outgrows the cache.
