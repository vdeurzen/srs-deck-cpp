---
id: db-btree-vs-lsm
kind: basic
version: 2
level: 4
tags: [databases, storage, amplification]
requires:
  - db-amplification
  - db-lsm-write-path
refs:
  - https://www.cs.umb.edu/~poneil/lsmtree.pdf
  - https://arxiv.org/abs/1812.07527
elaborate: Postgres and InnoDB are B⁺-trees; RocksDB and Cassandra are LSM trees. What does each one's typical workload have in common?
---

## A workload ingests far more than it reads, on SSD. Why does an LSM tree beat a B⁺-tree for it?

---

**Writes are buffered in memory and leave as large sorted files, never as page updates.**

That is sequential I/O with no read-before-write, which SSDs and
compression both favour. It pays in reads instead: a lookup may consult
one run per level.
