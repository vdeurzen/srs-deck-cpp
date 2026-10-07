---
id: db-cardinality-errors
kind: basic
version: 1
level: 5
tags: [databases, optimisation, statistics]
requires:
  - db-join-ordering
  - db-index-nested-loop
refs:
  - https://www.vldb.org/pvldb/vol9/p204-leis.pdf
elaborate: Spark's adaptive execution re-plans after measuring a stage's real output. Which plan decision does that rescue best, and which can it not undo?
---

## A plan picked a nested-loop join that ran for an hour, though the join-order search was exhaustive. What most likely went wrong?

---

**Cardinality estimation: an intermediate result was underestimated by orders of magnitude.**

Estimates assume uniform values, independent predicates and contained
join keys, and their errors multiply with every join. Leis et al. found
errors of several orders of magnitude after a few joins. The search
faithfully optimised fictional numbers.
