---
id: db-shuffle-and-broadcast
kind: basic
version: 1
level: 5
tags: [databases, distributed, joins]
refs:
  - https://db.in.tum.de/~leis/papers/morsels.pdf
  - https://spark.apache.org/docs/latest/sql-performance-tuning.html
---

## To join two tables across N machines you can shuffle both or broadcast one. What decides it, and what is co-partitioning worth?

---

**Shuffle (repartition) join**: hash both sides on the join key and
send each row to the machine owning that key's partition, then join
locally. Network cost is `|R| + |S|`, and it works at any size. It is
also where distributed query engines spend most of their time —
serialisation, network, and the disk spill when a partition is bigger
than memory.

**Broadcast join**: send *all* of the small side to every machine and
keep the large side where it is. Network cost is `N·|R|` — better
whenever `N·|R| < |R| + |S|`, so roughly when the small side is under
`|S|/N`. No shuffle of the big table at all, no partition skew, and
the local join is a plain build/probe. This is the single most
important plan choice in a system like Spark, and it is why the
estimated size of the small side matters so much (adaptive execution
exists largely to fix this decision at run time, once the true size is
known).

**Co-partitioning** removes the choice: if both tables are already
partitioned by the join key — by design, or because a previous stage
produced them that way — the join is local everywhere and the network
cost is zero. That is why distributed stores let you declare a
distribution key and why picking the same key for tables that are
joined together is the highest-leverage schema decision in a warehouse.
The same idea appears one level down as **morsel-driven parallelism**
inside a single machine: partition work into constant-sized morsels (~100 K tuples — sized for
work-stealing overhead, not for cache),
schedule them NUMA-locally, and keep the hash table's partitions on the
socket that owns them.

Two failure modes to name. **Skew**: one key with 10 % of the rows puts
10 % of the work on one node, so the job's runtime is that node's; the
fixes are salting the hot key, splitting it into sub-partitions, or
handling heavy hitters with a broadcast path. And **small files /
tiny partitions**: over-partitioning turns the job into scheduling
overhead, which is the mirror-image mistake.
