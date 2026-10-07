---
id: db-grace-hash-join
kind: basic
version: 1
level: 4
tags: [databases, joins, external-memory]
requires:
  - db-hash-join
  - foundations-external-memory-model
refs:
  - https://15445.courses.cs.cmu.edu/
  - https://www.vldb.org/pvldb/vol7/p85-balkesen.pdf
elaborate: One customer accounts for 30 % of all orders. What happens to the partition holding that key, and what can the join do about it?
---

## A hash join's build side is four times larger than memory. What does a grace hash join do before building anything?

---

**It partitions both inputs by the same hash into files, so each build partition fits in memory.**

Matching keys land in partitions with the same number, so the join runs
pair by pair. Random probes into a table on disk become sequential
writes and reads: the external-memory transformation.
