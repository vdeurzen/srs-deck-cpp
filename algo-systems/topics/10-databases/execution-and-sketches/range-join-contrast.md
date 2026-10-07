---
id: db-range-join-contrast
kind: basic
version: 1
level: 4
tags: [databases, joins, hashing, sorting]
requires:
  - db-sort-merge-join
refs:
  - https://15445.courses.cs.cmu.edu/
  - https://dl.acm.org/doi/10.1145/582095.582099
---

## `JOIN s ON r.ts BETWEEN s.start AND s.end`: why can a sort-merge join evaluate this, when a hash join cannot?

---

**Hashing keeps only equality; sorting keeps order, so a range stays contiguous.**

Nearby timestamps hash to unrelated buckets, so no probe can find "all
keys in [start, end]". On sorted inputs the matches for each `s` row are
one consecutive stretch of `r`, found by advancing cursors.
