---
id: db-index-nested-loop
kind: basic
version: 1
level: 4
tags: [databases, joins, indexes, optimisation]
requires:
  - db-hash-join
  - ordered-bplus-tree
refs:
  - https://dl.acm.org/doi/10.1145/582095.582099
  - https://www.vldb.org/pvldb/vol9/p204-leis.pdf
elaborate: The planner estimated 50 outer rows; there were 50 000. Which of the two joins degrades more, and why?
---

## The outer input has 50 rows; the 10 M-row inner has a B⁺-tree on the join key. Why is an index-nested-loop join cheaper here than a hash join?

---

**It does 50 index descents; any hash join must still read all 10 M
inner rows, to build or to probe.**

With no build phase, the first row appears at once and the outer's
order is kept: right under `ORDER BY … LIMIT`. The risk: cost is linear
in the outer estimate, so an underestimate is paid in full.
