---
id: db-bloom-blocked
kind: basic
version: 1
level: 4
tags: [databases, sketches, memory-hierarchy]
requires:
  - db-bloom-filter
refs:
  - https://github.com/facebook/rocksdb/wiki/RocksDB-Bloom-Filter
  - https://github.com/facebook/rocksdb/blob/main/include/rocksdb/filter_policy.h
elaborate: RocksDB's Ribbon filter is ~30 % smaller at the same rate but costs 3–4× the CPU, and `bloom_before_level` keeps plain Bloom on the upper levels. Why that split?
---

## A textbook Bloom filter with k = 7 can miss cache 7 times per query. What does RocksDB's Bloom filter (`format_version` ≥ 5) do instead?

---

**It puts all k bits of a key in one cache line, chosen by the hash: one miss.**

Keys spread unevenly over lines, so some lines fill up more, and the
false-positive rate is slightly worse at the same bits per key. A small
memory price for a large latency win.
