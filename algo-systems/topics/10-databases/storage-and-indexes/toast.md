---
id: db-toast
kind: basic
version: 1
level: 3
tags: [databases, storage, postgres]
requires:
  - db-slotted-pages
refs:
  - https://www.postgresql.org/docs/current/storage-toast.html
---

## A Postgres row carries a 1 MB `text` value, but pages are 8 KiB. Where are the value's bytes?

---

**Compressed and moved out of line into the table's TOAST table; the row keeps a pointer.**

Postgres (18) does this once a row exceeds about 2 kB
(`TOAST_TUPLE_THRESHOLD`). Rows stay small, so many fit per page, and a
scan that never reads the big column never touches its bytes.
