---
id: db-hash-aggregation
kind: basic
version: 1
level: 4
tags: [databases, aggregation, hashing, execution]
requires:
  - db-hash-join
refs:
  - https://db.in.tum.de/~leis/papers/morsels.pdf
  - https://15445.courses.cs.cmu.edu/
elaborate: Two threads each computed a partial `AVG(price)` per group. What must each partial carry so the final merge is exact?
---

## A hash join's build table stores rows. What does a `GROUP BY` hash table store per key instead?

---

**A small accumulator per group (running `SUM`, `COUNT`, …), updated in
place for each input row.**

So its memory grows with the number of distinct groups, not with the
input: a billion rows into 50 groups is a 50-entry table. It spills only
when the *groups* outgrow memory, and then partitions exactly as a grace
hash join does.
