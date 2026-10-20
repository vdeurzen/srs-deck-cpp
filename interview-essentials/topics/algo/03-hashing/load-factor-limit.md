---
id: hashing-load-factor-limit
kind: basic
version: 1
level: 2
tags: [hashing, load-factor, open-addressing]
requires:
  - hashing-load-factor
  - hashing-open-addressing
elaborate: "For a workload of your own, would you accept a chained table's extra allocations or an open-addressing table's crowding, and why?"
refs:
  - Knuth, The Art of Computer Programming, vol. 3, 2nd ed., §6.4
  - https://abseil.io/about/design/swisstables
---

## A chained table can run at load factor 2.0. Why must an open-addressing table stay below 1.0?

---

**Its keys live in the slots themselves, so n can never exceed the number of slots m.**

A chained bucket holds any number of keys; an open-addressing slot holds
one. Long before α reaches 1, probe runs grow sharply, so such tables
typically grow at a load factor of about 0.5 to 0.875.
