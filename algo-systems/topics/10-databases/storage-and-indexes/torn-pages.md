---
id: db-torn-pages
kind: basic
version: 1
level: 4
tags: [databases, durability, recovery, postgres]
requires:
  - db-page-lsn
refs:
  - https://www.postgresql.org/docs/current/runtime-config-wal.html
  - https://dev.mysql.com/doc/refman/8.4/en/innodb-doublewrite-buffer.html
elaborate: InnoDB writes pages twice instead, through its doublewrite buffer. Which cost does that move compared with Postgres's approach?
---

## Power fails halfway through writing an 8 KiB page, leaving it half old and half new. How does Postgres make that page recoverable?

---

**Full-page writes: the first change to a page after a checkpoint logs its whole image.**

A torn page's LSN cannot be trusted, and row-level records cannot rebuild
it. Redo restores the image, then replays. The price is a burst of WAL
volume after every checkpoint, eased by spacing checkpoints further apart.
