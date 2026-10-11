---
id: db-buffer-pool
kind: basic
version: 1
level: 4
tags: [databases, caching, memory-hierarchy]
requires:
  - foundations-external-memory-model
refs:
  - https://db.cs.cmu.edu/papers/2022/cidr2022-p13-crotty.pdf
  - https://15445.courses.cs.cmu.edu/
elaborate: 'Using `mmap` for the data file is a known trap for storage engines. Which two of the engine''s needs does the kernel then decide for it?'
---

## Why does a database implement its own page cache instead of relying on the OS page cache?

---

**Only the engine knows which pages are pinned or dirty, and when each may leave memory.**

A pinned page is in use and must stay; a dirty page may
be written back only when the engine's recovery rules allow it. The kernel evicts by its
own policy, so `mmap` gives up both guarantees and adds unpredictable
page-fault stalls.
