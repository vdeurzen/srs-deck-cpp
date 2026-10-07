---
id: heap-top-k-distributed
kind: basic
version: 1
level: 4
requires:
  - heap-top-k
tags: [heaps, selection, databases, distributed]
elaborate: Which of your own dashboards merge per-shard top-k lists, and are they ranking a maximum or a sum?
refs:
  - https://doi.org/10.1145/1011767.1011798
---

## Each shard reports its top 10 URLs by hit count; a coordinator merges them into a global top 10. Why can the answer be wrong?

---

**A URL spread thinly over many shards can win globally while topping no shard.**

The merge is exact for a per-item **maximum**: the global winner tops
its own shard. A **sum** is visible in no single shard's list. Fixes:
partition by key, or a threshold protocol such as TPUT (Cao & Wang) that
fetches more per shard.
