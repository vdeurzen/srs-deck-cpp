---
id: db-distributed-sort-merge
kind: basic
version: 1
level: 4
tags: [databases, distributed, joins, sorting]
requires:
  - db-sort-merge-join
  - db-shuffle-and-broadcast
refs:
  - https://github.com/apache/spark/blob/master/sql/catalyst/src/main/scala/org/apache/spark/sql/internal/SQLConf.scala
  - https://spark.apache.org/docs/latest/sql-performance-tuning.html
---

## When neither side is small enough to broadcast, Spark joins with sort-merge by default rather than a shuffled hash join. Why?

---

**A sort spills to disk in bounded memory; a hash table that outgrows memory fails.**

Both sides are large, so a partition's build side may not fit, and skew
makes some partitions far larger than planned. External sorting degrades
gracefully. Spark's `spark.sql.join.preferSortMergeJoin` defaults to
true (Spark 4.x).
