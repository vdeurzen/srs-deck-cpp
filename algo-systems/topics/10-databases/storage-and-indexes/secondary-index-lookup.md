---
id: db-secondary-index-lookup
kind: basic
version: 1
level: 4
tags: [databases, indexes, storage, btree]
requires:
  - ordered-bplus-tree
  - db-slotted-pages
refs:
  - https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html
  - https://www.postgresql.org/docs/current/storage-hot.html
elaborate: Your InnoDB table's primary key is a 36-byte UUID string. What does that cost each of its five secondary indexes?
---

## In InnoDB, a lookup through a secondary index costs two B⁺-tree descents. Why two?

---

**Its entries hold the row's primary key, not its address, so the
clustered index is descended next.**

Rows live in the primary-key tree's leaves, where splits move them.
Postgres instead stores a physical `(page, slot)`: one descent plus a heap
fetch, but every new row version needs new index entries unless HOT
applies.
