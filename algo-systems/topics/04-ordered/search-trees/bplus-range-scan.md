---
id: ordered-bplus-range-scan
kind: basic
version: 1
level: 4
requires:
  - ordered-bplus-tree
tags: [trees, databases, storage]
refs:
  - https://dl.acm.org/doi/10.1145/356770.356776
  - https://www.postgresql.org/docs/current/btree.html
---

## `WHERE ts BETWEEN a AND b` over a B⁺-tree index: how many times does the scan descend from the root?

---

**Once: it finds the first leaf, then follows sibling links sideways.**

Leaves are chained, so the rest of the range is a sequential walk that
never touches an internal node. In a B-tree with records at every level,
the same scan is an in-order traversal that climbs and descends
repeatedly.
