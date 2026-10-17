---
id: rq-segment-vs-fenwick
kind: basic
version: 1
level: 3
tags: [segment-tree, fenwick-tree, range-queries, lc-307]
requires:
  - interview-essentials/rq-segment-signal
  - algo-systems/ordered-fenwick-tree
refs:
  - https://leetcode.com/problems/range-sum-query-mutable/
  - https://cp-algorithms.com/data_structures/segment_tree.html
  - https://doi.org/10.1002/spe.4380240306
elaborate: Which other operations have the same problem as min (max, gcd, bitwise OR), and which could still use a Fenwick tree (xor, product mod p)?
---

Range Sum Query - Mutable (LC 307) interleaves `update(i, val)` with
`sumRange(l, r)` on an array `nums`, and a
Fenwick tree does both in O(log n). The same problem with
`minRange(l, r)` instead:

## Why can the Fenwick tree no longer answer the range query?

---

**It sums prefixes, and `[l, r)` is `prefix(r) − prefix(l)`: min has no inverse.**

A segment tree covers `[l, r)` with O(log n) disjoint nodes and combines
them directly, so any associative operation works: min, max, gcd.
