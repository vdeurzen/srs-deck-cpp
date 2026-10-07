---
id: ordered-bplus-bulk-load
kind: basic
version: 1
level: 4
requires:
  - ordered-bplus-tree
  - db-btree-split
tags: [trees, databases, storage]
refs:
  - https://doi.org/10.1007/BF00289075
  - https://www.postgresql.org/docs/current/sql-createindex.html
---

## `CREATE INDEX` on an existing table sorts the rows and builds the B⁺-tree bottom-up instead of inserting them one by one. What does that buy in space?

---

**Full pages: random-order inserts leave leaves only ~69 % (ln 2) full.**

Each split leaves two half-full pages, and under random inserts occupancy
settles near ln 2 (Yao). Sorted bottom-up building writes each leaf to a
chosen fill factor, sequentially, with no splits at all.
