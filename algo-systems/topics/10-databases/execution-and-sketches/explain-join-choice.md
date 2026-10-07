---
id: db-explain-join-choice
kind: explain
version: 1
level: 5
tags: [databases, joins, distributed, optimisation]
requires:
  - db-hash-join
  - db-join-skew
  - db-cardinality-errors
refs:
  - https://spark.apache.org/docs/latest/sql-performance-tuning.html
  - https://www.vldb.org/pvldb/vol9/p204-leis.pdf
  - https://www.vldb.org/pvldb/vol7/p85-balkesen.pdf
---
A 20-node warehouse joins `orders` (2 B rows, partitioned by `order_id`)
with `customers` (50 M rows) on `customer_id`, keeping customers from one
small country. Plan the join and say what could make the plan fail.
---
- [ ] Filter `customers` by country before the join, shrinking it to a small R′
- [ ] Broadcast R′ rather than shuffle: 20·|R′| bytes on the network is far below |R′| + |S| with S the 2 B orders
- [ ] Each node runs a hash join that builds on the broadcast R′, the smaller side, and streams its local orders as the probe
- [ ] Broadcasting also sidesteps skew: a shuffle on `customer_id` would send all of a hot customer's orders to one node, which then finishes last
- [ ] The risk is the estimate: if R′ is underestimated by orders of magnitude, every node must hold the whole broadcast table, and it overflows memory
