---
id: db-lru-k
kind: basic
version: 1
level: 4
tags: [databases, caching]
requires:
  - db-lru-recency-bet
refs:
  - https://www.cs.cmu.edu/~christos/courses/721-resources/p297-o_neil.pdf
elaborate: Postgres instead gives a large sequential scan its own small ring of buffers, reused for the whole scan. What does that protect, and what does the scan give up?
---

## A nightly report scans a 200 GB table once through the buffer pool. How does LRU-2 keep it from evicting the hot index pages?

---

**It ranks pages by their second-to-last access; a page touched once ranks oldest.**

Scan pages never earn a second reference, so they are evicted first,
ahead of index pages that every query touches. Plain LRU ranks them by
the last access, the most recent there is, and flushes the working set.
