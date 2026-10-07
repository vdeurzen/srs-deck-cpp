---
id: db-lsm-space-amp
kind: basic
version: 1
level: 4
tags: [databases, storage, lsm, amplification]
requires:
  - db-lsm-compaction
refs:
  - https://github.com/facebook/rocksdb/wiki/Compaction
  - https://arxiv.org/abs/1812.07527
---

## Under levelled compaction with size ratio 10, a key can have stale versions on every level. Why is space amplification still only about 1.1×?

---

**The bottom level holds ~90 % of the bytes, so all levels above add only ~11 %.**

Level sizes grow geometrically: 1 + 1/10 + 1/100 + … ≈ 1.11 times the
bottom. Even if every byte above it were obsolete, the waste is bounded
by that. Tiering keeps several overlapping runs per level, so stale
versions survive longer.
