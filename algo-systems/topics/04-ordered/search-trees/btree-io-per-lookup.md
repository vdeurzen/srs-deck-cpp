---
id: ordered-btree-io-per-lookup
kind: basic
version: 1
level: 4
requires:
  - ordered-btree-fanout
  - ordered-bplus-fanout
tags: [trees, databases, external-memory]
refs:
  - https://dl.acm.org/doi/10.1145/356770.356776
  - https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-SHARED-BUFFERS
---

## A B⁺-tree index over a billion keys is 4 levels deep. How many disk reads does a point lookup typically cost?

---

**One or two: the levels above the leaves stay cached in the buffer pool.**

With 256 entries per page that is ~4 million leaf pages but only ~15 000
internal ones, and every lookup touches the
root and upper levels, so they stay hot. Only the leaf, and sometimes
its parent, comes from disk.
