---
id: linear-range-query-signal
kind: basic
version: 1
level: 1
tags: [arrays, recognition]
refs:
  - https://en.wikipedia.org/wiki/Prefix_sum
  - https://leetcode.com/problems/range-sum-query-immutable/
---

## A fixed array of 10⁵ ints gets 10⁵ queries, each asking for the sum of the elements from index l to index r. A loop per query can cost 10¹⁰ additions. What do you compute once, before any query?

---

**A prefix-sum array: `p[i]` = a[0] + … + a[i − 1], built in one pass.**

Any range sum is then the difference of two entries of `p`, so each
query is one subtraction: about 2 · 10⁵ steps in all instead of 10¹⁰.
It relies on the array not changing between queries.
