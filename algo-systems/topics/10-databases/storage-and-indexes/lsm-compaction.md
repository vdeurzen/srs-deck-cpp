---
id: db-lsm-compaction
kind: basic
version: 2
level: 4
tags: [databases, storage, lsm]
requires:
  - db-lsm-write-path
refs:
  - https://github.com/facebook/rocksdb/wiki/Compaction
  - https://github.com/facebook/rocksdb/wiki/Universal-Compaction
elaborate: Compaction runs in the background. Why is it still the usual suspect behind p99 latency spikes in an LSM store?
---

## L1 of an LSM tree is full and L2 already holds data. What does levelled compaction do that tiered compaction does not?

---

**It rewrites L2's overlapping data together with L1's, so each level stays one sorted run.**

Tiered compaction merges L1's runs and adds the result to L2 as one more
run. So levelling reads at most one file per level but rewrites bytes
often; tiering writes less and reads more. RocksDB levels by default; its
"universal" style is tiered.
