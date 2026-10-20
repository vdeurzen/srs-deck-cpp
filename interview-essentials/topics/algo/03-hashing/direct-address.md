---
id: hashing-direct-address
kind: basic
version: 1
level: 1
tags: [foundations, direct-addressing]
requires:
  - complexity-big-o-scaling
elaborate: "Where in your own code is a plain array indexed by a small id already acting as a direct-address table?"
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §11.1
---

## Employee ids run from 0 to 999. An array `name[1000]` stores each employee's name at the index equal to their id. How long does finding employee 417's name take?

---

**O(1): the key itself is the index, so one address calculation reaches the slot.**

This is a *direct-address table*: one slot per possible key, so there
is nothing to search and no two keys share a slot. An empty slot means
"no such key".
