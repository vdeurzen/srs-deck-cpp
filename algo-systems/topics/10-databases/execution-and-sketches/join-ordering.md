---
id: db-join-ordering
kind: basic
version: 1
level: 4
tags: [databases, optimisation, dynamic-programming]
requires:
  - foundations-dp-optimal-substructure
refs:
  - https://dl.acm.org/doi/10.1145/582095.582099
  - https://www.postgresql.org/docs/current/runtime-config-query.html
elaborate: System R considered only left-deep trees. What does that rule out, and which workloads would miss it?
---

## Why can a join-order optimiser use dynamic programming instead of trying every join tree?

---

**Optimal substructure: the best plan for a set of relations joins best plans for two subsets.**

So System R builds plans for subsets in increasing size, keeping the
cheapest per subset: about 3ⁿ steps. For 10 relations that is 59 049,
against 17.6 billion bushy join trees (`(2n−2)!/(n−1)!`). Postgres switches to its genetic
optimiser at 12 `FROM` items (`geqo_threshold`).
