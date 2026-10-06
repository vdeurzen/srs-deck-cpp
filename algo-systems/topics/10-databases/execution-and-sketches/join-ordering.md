---
id: db-join-ordering
kind: basic
version: 1
level: 5
tags: [databases, optimisation, dynamic-programming]
requires:
  - db-sort-merge-join
  - foundations-dp-optimal-substructure
refs:
  - https://dl.acm.org/doi/10.1145/582095.582099
  - https://www.vldb.org/pvldb/vol9/p204-leis.pdf
---

## Why is join ordering a dynamic program, and why do good optimisers still produce bad plans?

---

The number of orderings is exponential — Catalan-many shapes for n
relations — but the problem has **optimal substructure**: the best plan
for a set `S` of relations is built from the best plans for a partition
of `S` into two subsets (given the same interesting order). So the
System R algorithm enumerates subsets in increasing size, keeping the
cheapest plan per (subset, interesting order), in O(3ⁿ) for arbitrary
shapes — practical to about 12–15 relations. Beyond that, optimisers
fall back to greedy heuristics, genetic algorithms (Postgres's GEQO),
or randomised search.

Note the classic restriction: System R considered only **left-deep**
trees (each join's right input is a base relation), which reduces the
space and suits index-nested-loop pipelines. Bushy trees can be much
better for analytics, and modern DP enumerators (DPccp and friends)
handle them by enumerating connected subgraphs of the join graph.

**The reason plans are still bad is cardinality estimation, not
search.** Cost depends on the estimated size of each intermediate
result, and those estimates:

- assume **uniformity** within a column, **independence** between
  predicates, and **containment** of join keys — all routinely false;
- compound multiplicatively, so errors grow exponentially with the
  number of joins. Leis et al. measured errors of several orders of
  magnitude on real data after a few joins.

Since the cost model then faithfully optimises fictional numbers, the
famous result is that a plan search over bad estimates is worse than a
mediocre search over good ones.

The mitigations in production systems are all about getting better
numbers or needing fewer: multi-column statistics and sketches,
**sampling** at plan time, **adaptive execution** (start executing,
measure the actual cardinality, re-plan the rest — Spark AQE, SQL
Server's adaptive joins), and **robust plans** that do not fall off a
cliff when an estimate is wrong. When you see a query plan pick a
nested loop over 10 M rows, the estimate said 10.
