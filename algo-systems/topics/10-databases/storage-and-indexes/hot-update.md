---
id: db-hot-update
kind: basic
version: 1
level: 4
tags: [databases, indexes, postgres]
requires:
  - db-mvcc
  - db-secondary-index-lookup
refs:
  - https://www.postgresql.org/docs/current/storage-hot.html
elaborate: Why would you set a table's `fillfactor` below 100 on a frequently updated table?
---

## Every Postgres `UPDATE` writes a new row version. Which ones add no new entries to its B⁺-tree indexes?

---

**Those changing no indexed column, whose new version fits on the same heap page.**

This is a HOT (heap-only tuple) update: the old version points to the
new one within the page, so existing index entries still reach it.
Since Postgres 16, changing a column covered only by summarizing (BRIN)
indexes still qualifies; those indexes alone are updated.
