---
id: db-slotted-pages
kind: basic
version: 1
level: 3
tags: [databases, storage, layout]
refs:
  - https://www.postgresql.org/docs/current/storage-page-layout.html
  - https://15445.courses.cs.cmu.edu/
elaborate: A column store abandons slotted pages for packed, encoded column chunks. What does it give up that a slotted page provides?
---

## How does a slotted page lay out variable-length rows?

---

**A slot array grows from the front, rows grow back from the end; the gap is free.**

```
| header | slot 0 | slot 1 | slot 2 | → free ←  | row 2 | row 1 | row 0 |
```

Each slot holds the row's offset and length, so a row id is
`(page, slot)` and finding slot 37 is arithmetic, not a walk. The page
is full when the two ends meet.
