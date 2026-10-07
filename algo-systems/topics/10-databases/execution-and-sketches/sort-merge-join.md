---
id: db-sort-merge-join
kind: basic
version: 1
level: 4
tags: [databases, joins, sorting]
requires:
  - db-hash-join
  - sort-external-merge
refs:
  - https://dl.acm.org/doi/10.1145/582095.582099
  - https://15445.courses.cs.cmu.edu/
elaborate: One join key holds 40 % of both inputs. Why does a merge join's memory stay bounded where a hash join's partition may not?
---

## When does a planner choose sort-merge join over hash join for an equi-join?

---

**When the sort is already paid for: inputs arrive sorted, or the plan needs that order next.**

Sorted input comes from a clustered index or an earlier merge; a later
`ORDER BY` or merge join wants the order anyway. Then the join is one
sequential merge, with no hash table and no random access.
