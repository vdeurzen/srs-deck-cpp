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
elaborate: If both tables were 2 B rows, which join would you pick instead, and what would it move over the network?
---
A 20-node warehouse joins `orders` (2 B rows, partitioned by `order_id`)
with `customers` (50 M rows) on `customer_id`, keeping customers from one
small country. An interviewer asks which join plan you would choose, and
why. Answer aloud.
---
- [ ] Filter `customers` by country first, shrinking it to a small R′ before any data moves
- [ ] Broadcast R′ rather than shuffle: 20 copies of a small R′ move far less than reshuffling 2 B orders
- [ ] Each node builds a hash table on R′, the smaller side, and probes it by streaming its local orders
- [ ] Broadcasting also avoids skew: a shuffle on `customer_id` sends a hot customer's orders to one node
- [ ] The plan rests on R′'s estimate: underestimated by orders of magnitude, the broadcast table overflows every node's memory
