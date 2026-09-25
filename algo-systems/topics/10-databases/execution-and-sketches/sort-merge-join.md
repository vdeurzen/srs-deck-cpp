---
id: db-sort-merge-join
kind: basic
version: 1
level: 4
tags: [databases, joins, sorting]
refs:
  - https://dl.acm.org/doi/10.1145/582095.582099
  - https://en.wikipedia.org/wiki/Sort-merge_join
---

## When does a planner choose sort-merge over hash join, and what is an "interesting order"?

---

Sort both inputs on the join key, then walk them in lockstep. Cost is
the two sorts plus a linear merge; if both inputs are **already
sorted** — read from a clustered index, produced by an earlier merge
join, or emitted in order by a previous sort — the sorts vanish and
the join is a single sequential pass over both sides with no hash table
and no random access at all.

That is the case where it wins outright. Others:

- **The output must be sorted anyway** (an `ORDER BY`, a subsequent
  merge join, a `GROUP BY` that can then be done by streaming): the
  sort is not an extra cost, it is a cost the plan already owed.
- **Non-equi joins on an inequality** (`r.ts BETWEEN s.a AND s.b`):
  hash join cannot do these at all; merge-based band joins can.
- **Memory pressure and skew**: merge join's memory is the sort's
  buffer, which is bounded and spills gracefully; a hash join with a
  badly skewed key can blow up a partition.

**Interesting orders** are the planner-level concept that makes this
work. During cost-based enumeration, a plan is not characterised by
cost alone but by cost *and the ordering it produces*, and a
more-expensive plan that produces a useful order is kept alongside the
cheapest one — because that order may save a later sort. System R
introduced this, and every serious optimiser since keeps the same
"cheapest plan per interesting physical property" set (extended in
Volcano/Cascades to physical properties generally: ordering,
partitioning, distribution).

The modern balance: on a single node with plenty of memory, hash join
usually wins on raw speed for equi-joins, and much of the classic
sort-merge advantage has been eroded by cache-conscious hash joins.
Sort-merge stays essential for large distributed joins (sorted runs
shuffle and merge well), for inequality joins, and wherever ordering is
part of the contract.
