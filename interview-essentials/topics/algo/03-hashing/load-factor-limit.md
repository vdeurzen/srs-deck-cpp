---
id: hashing-load-factor-limit
kind: basic
version: 1
level: 2
tags: [hashing, load-factor, open-addressing]
requires:
  - hashing-load-factor
  - hashing-open-addressing
refs:
  - Knuth, The Art of Computer Programming, vol. 3, 2nd ed., §6.4
  - https://abseil.io/about/design/swisstables
---

## A chained table can run at load factor 2.0. Why must an open-addressing table stay below 1.0?

---

**Its keys live in the slots themselves, so n can never exceed the number of slots m.**

A chained bucket holds any number of keys; an open-addressing slot holds
one. Long before α reaches 1, probe runs grow sharply, so such tables
typically grow at about 0.5–0.875 (Abseil's Swiss tables: 7/8).
