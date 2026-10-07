---
id: db-lsm-read-path
kind: basic
version: 1
level: 4
tags: [databases, storage, lsm, sketches]
requires:
  - db-lsm-write-path
  - db-bloom-filter
refs:
  - https://github.com/facebook/rocksdb/wiki/RocksDB-Bloom-Filter
  - https://github.com/facebook/rocksdb/wiki/Compaction
---

## An LSM point lookup may consult one sorted run per level. What keeps most of those from costing a disk read?

---

**A Bloom filter per file, held in memory: a "no" skips the file unread.**

At ~1 % false positives, a lookup for a present key reads about one data
block, the one holding it, plus the rare false positive. The file's index
block then finds that block without a scan.
