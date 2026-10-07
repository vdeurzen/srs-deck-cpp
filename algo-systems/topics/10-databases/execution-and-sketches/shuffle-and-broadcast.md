---
id: db-shuffle-and-broadcast
kind: basic
version: 1
level: 4
tags: [databases, distributed, joins]
requires:
  - db-hash-join
refs:
  - https://spark.apache.org/docs/latest/sql-performance-tuning.html
  - https://15445.courses.cs.cmu.edu/
elaborate: Spark broadcasts a side estimated under `spark.sql.autoBroadcastJoinThreshold` (10 MB by default, Spark 4.x), and AQE can switch to broadcast at run time. Why does that decision rest so heavily on an estimate?
---

## A small table R joins a large table S across N machines. When is broadcasting R cheaper than shuffling both?

---

**When N·|R| < |R| + |S|: roughly, when R is smaller than |S|/N.**

A broadcast copies R to every machine and leaves S where it is. A
shuffle sends every row of both tables to the machine owning its key's
hash.
