---
id: db-pages
kind: basic
version: 1
level: 2
tags: [databases, storage, layout]
refs:
  - https://www.postgresql.org/docs/current/storage-page-layout.html
  - https://www.postgresql.org/docs/current/ddl-system-columns.html
elaborate: Your index stores row locations. What has to change in it if rows could move between pages?
---

## A Postgres row's physical address, its `ctid`, is a pair like `(42, 7)`. Why a page number plus a position, rather than a byte offset into the table file?

---

**Disk and buffer pool move whole fixed-size pages (8 KiB); a row is reached through its page.**

Reading row `(42, 7)` means fetching page 42, which is at byte
`42 × 8192`, into memory and then finding item 7 inside it. Every read,
write and cache decision is made per page, never per row.
