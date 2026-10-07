---
id: ordered-skip-list-memtable
kind: basic
version: 1
level: 4
requires:
  - ordered-skip-list
tags: [trees, randomised, databases, concurrency]
elaborate: A skip list has poor locality. Why does that cost little in a memtable but a lot in an on-disk index?
refs:
  - https://github.com/facebook/rocksdb/wiki/MemTable
  - https://dl.acm.org/doi/10.1145/78973.78977
---

## RocksDB picks a skip list for its default memtable because it allows concurrent inserts from many writers. What about a skip-list insert makes that tractable?

---

**It only splices forward pointers, one level at a time; nothing is rotated or split.**

Each level is a linked-list insert, done with compare-and-swap, and no
other node changes shape. RocksDB's skip list is
the only memtable that supports concurrent inserts; ordered iteration
for the flush to an SSTable comes free.
