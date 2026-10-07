---
id: db-interesting-order
kind: basic
version: 1
level: 5
tags: [databases, optimisation, sorting]
requires:
  - db-sort-merge-join
  - db-join-ordering
refs:
  - https://dl.acm.org/doi/10.1145/582095.582099
---

## A System R optimiser keeps a costlier plan for joining {A, B} alongside the cheapest one. When is that worth it?

---

**When it produces rows in an "interesting order" that can save a sort later.**

A plan is judged by cost and by the order of its output: a merge join or
`ORDER BY` above may use that order. Cascades-style optimisers generalise
it to any physical property, such as partitioning.
