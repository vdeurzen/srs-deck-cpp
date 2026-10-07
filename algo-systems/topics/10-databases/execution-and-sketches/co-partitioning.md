---
id: db-co-partitioning
kind: basic
version: 1
level: 4
tags: [databases, distributed, joins]
requires:
  - db-shuffle-and-broadcast
refs:
  - https://15445.courses.cs.cmu.edu/
  - https://spark.apache.org/docs/latest/sql-performance-tuning.html
---

## `orders` and `customers` are both hash-partitioned on `customer_id`, with the same hash function and partition count, across the same N nodes. What network traffic does joining them on `customer_id` need?

---

**None: matching rows already live on the same node, so each node joins locally.**

That is why a warehouse lets you declare a distribution key: tables
joined together often should share it.
