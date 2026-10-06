---
id: db-slotted-pages
kind: basic
version: 1
level: 4
tags: [databases, storage, layout]
refs:
  - https://15445.courses.cs.cmu.edu/
  - https://www.postgresql.org/docs/current/storage-page-layout.html
---

## How does a slotted page store variable-length rows, and why is the indirection worth a whole extra lookup?

---

A page has a **header at the front**, a **slot array growing forward**,
and **tuple data growing backwards from the end**; free space is the
gap in the middle, and the page is full when they meet. Each slot holds
an offset and a length; a row id is `(page id, slot number)`.

The indirection is the point. Because references name a *slot*, not a
byte offset:

- A row can be **moved within the page** — after a delete, or when an
  update makes it shorter — by rewriting one slot entry, with no index
  or foreign reference needing an update. That is what makes
  compaction of a page cheap.
- A row that grows beyond the free space can become a **forwarding
  pointer** to another page, keeping its original row id valid (at the
  cost of a second page read; a periodic reorganisation fixes it).
- **Variable-length data needs no per-row scanning**: the slot array is
  a directory, so accessing slot 37 is arithmetic, not a walk.

Within a tuple the layout matters too. Some engines (SQL Server, DB2)
store a null bitmap, then fixed-length columns, then a
variable-length offset array, so a fixed column is at a constant
offset. Postgres keeps declared order with no per-column offsets: a
column's position is cacheable only up to the first variable-length
or NULL value, after which access walks past each preceding value.
Column order is therefore not cosmetic there; putting fixed-width
columns first helps access, and ordering them by alignment removes
padding (Postgres users rediscover the latter as "column tetris").

Large values do not live in the page at all: they are **TOASTed** or
stored as overflow/BLOB pages, with a pointer inline — otherwise one
big value would destroy the page's row density.

The same considerations reappear one level up in analytics, with a
different answer: a column store abandons slotted pages for tightly
packed, encoded column chunks precisely because it does not need to
update individual rows in place. Slotted pages are the right structure
when rows change; column chunks are right when they do not.
