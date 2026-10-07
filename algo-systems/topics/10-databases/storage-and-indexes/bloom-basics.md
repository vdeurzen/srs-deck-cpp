---
id: db-bloom-basics
kind: basic
version: 1
level: 2
requires:
  - algo-basics/hashing-map-set-purpose
tags: [databases, sketches, probabilistic]
refs:
  - https://dl.acm.org/doi/10.1145/362686.362692
  - https://github.com/facebook/rocksdb/wiki/RocksDB-Bloom-Filter
elaborate: Which expensive lookup in your system would you put behind such a filter, and what does a wrong "maybe" cost there?
---

## A Bloom filter of 16 bits uses 3 hash functions. `cat` was inserted, setting bits 2, 7 and 11. `dog` hashes to 2, 5 and 11. What does a query for `dog` answer?

---

**"Definitely absent": bit 5 is clear, and inserting `dog` would have set it.**

A query checks the `k` bits its key hashes to. Any clear bit is a
certain "no"; all set means only "maybe", because other keys may have
set them. That one-sided answer is what lets a reader skip work.
