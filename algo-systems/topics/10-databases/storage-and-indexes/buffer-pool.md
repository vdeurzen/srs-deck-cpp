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

**Only the engine knows which pages are pinned, dirty, or blocked by the WAL.**

A dirty page may be written only after its log records are durable,
and a pinned page is in use by an operator. The kernel evicts by its
own policy, so `mmap` gives up both guarantees and adds unpredictable
page-fault stalls.
