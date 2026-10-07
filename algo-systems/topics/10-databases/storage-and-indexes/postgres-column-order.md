---
id: db-postgres-column-order
kind: basic
version: 1
level: 4
tags: [databases, storage, layout, postgres]
requires:
  - db-slotted-pages
  - cpp-core/layout-padding-sizeof
refs:
  - https://www.postgresql.org/docs/current/storage-page-layout.html
  - https://www.postgresql.org/docs/current/catalog-pg-type.html
elaborate: Postgres also cannot cache a column's offset past the first variable-length or NULL value. Where in the column list would you put `text` columns?
---

## In Postgres, columns `(bool, bigint, bool, bigint)` take 32 bytes of row data; `(bigint, bigint, bool, bool)` take 18. Why?

---

**Columns are stored in declared order, each aligned: every `bigint` starts on 8 bytes.**

A 1-byte `bool` before a `bigint` costs 7 bytes of padding, twice. As with
a C++ struct, nothing reorders them for you: declaring the widest first
("column tetris") shrinks every row on disk and in cache.
