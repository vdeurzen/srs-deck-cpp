---
id: db-join-skew
kind: basic
version: 1
level: 4
tags: [databases, distributed, joins]
requires:
  - db-shuffle-and-broadcast
refs:
  - https://spark.apache.org/docs/latest/sql-performance-tuning.html
elaborate: Salting appends a random suffix 0–9 to the hot key on one side. What must happen to the other side's rows for that key?
---

## In a shuffle join over 100 nodes, one key carries 10 % of the rows. Why does the job take about ten times longer than planned?

---

**All rows of one key hash to one node, which then does ten times its share.**

Each node should get 1 % of the work; the one holding the hot key gets
10 %, and the job finishes when its slowest node does. Splitting the hot
key, or broadcasting its matches, spreads that work.
