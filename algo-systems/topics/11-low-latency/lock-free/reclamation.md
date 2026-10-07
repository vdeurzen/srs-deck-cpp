---
id: ll-reclamation
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, memory, concurrency]
requires:
  - ll-aba-problem
elaborate: In a lock-free structure you know, what would happen if nodes were never freed but recycled from a fixed pool?
refs:
  - https://www.kernel.org/doc/html/latest/RCU/whatisRCU.html
  - https://en.cppreference.com/w/cpp/header/hazard_pointer
---

## A lock-free list unlinks a node with a successful CAS. Why is it still not safe to `delete` it right away?

---

**Another thread may have loaded the pointer before the unlink and be
about to dereference it.** Readers announce nothing, so the unlinker
cannot know. Safe reclamation means proving no such reader remains
(hazard pointers, epochs, RCU) — or never freeing: recycle nodes from a
pre-sized pool.
