---
id: db-bloom-semi-join
kind: basic
version: 1
level: 4
tags: [databases, joins, sketches]
requires:
  - db-hash-join
  - db-bloom-filter
refs:
  - https://15445.courses.cs.cmu.edu/
  - https://dl.acm.org/doi/10.1145/362686.362692
---

## A hash join builds a Bloom filter on its build keys and hands it to the probe side's scan. What does that save?

---

**Probe rows that cannot match are dropped in the scan, before they reach the join.**

A false positive only reaches the join and finds nothing there, so the
result is unchanged. When few probe rows match, most are never decoded,
shipped or hashed: "sideways information passing".
