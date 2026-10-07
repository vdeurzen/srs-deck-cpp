---
id: db-lsm-write-path
kind: cloze
version: 1
level: 3
tags: [databases, storage, lsm]
refs:
  - https://www.cs.umb.edu/~poneil/lsmtree.pdf
  - https://github.com/facebook/rocksdb/wiki/RocksDB-Overview
---

An LSM-tree write is appended to the {{c1::WAL::a sequential file, for
durability}} and inserted into the {{c2::memtable::sorted, in memory}}.
When that fills, it is frozen and flushed as an immutable sorted file
at level 0, and {{c3::compaction::a background process}} later merges
such files into larger sorted runs on the levels below.
