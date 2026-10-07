---
id: db-slot-indirection
kind: basic
version: 1
level: 3
tags: [databases, storage, layout]
requires:
  - db-slotted-pages
elaborate: SQL Server and Oracle leave a forwarding pointer when a row outgrows its page. What does that keep valid, and what does every later read of the row pay?
refs:
  - https://www.postgresql.org/docs/current/storage-page-layout.html
  - https://15445.courses.cs.cmu.edu/
---

## Compacting a slotted page after a delete moves other rows' bytes. Why does no index entry change?

---

**Indexes name `(page, slot)`; only the slot's offset is rewritten.**

The slot is a level of indirection inside the page, so rows can move
freely within it, after a delete or a shrinking update.
