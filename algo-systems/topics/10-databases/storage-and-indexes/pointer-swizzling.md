---
id: db-pointer-swizzling
kind: basic
version: 1
level: 5
tags: [databases, caching, memory-hierarchy]
requires:
  - db-buffer-pool
refs:
  - https://db.in.tum.de/~leis/papers/leanstore.pdf
---

## LeanStore stores, in a resident parent page, a direct pointer to the child's frame instead of its page id. What does a hot traversal save?

---

**The page-id hash-table lookup, with its shared latch, at every level.**

A classic buffer pool translates each page id to a frame through one
shared table. Swizzled pointers make a cached descent as cheap as an
in-memory tree; on eviction the pointer is swapped back to the page id.
