---
id: ll-prefault
kind: basic
version: 1
level: 4
tags: [low-latency, memory, os, linux]
requires:
  - ll-memory-pools
refs:
  - https://man7.org/linux/man-pages/man2/mmap.2.html
  - https://man7.org/linux/man-pages/man2/mlock.2.html
---

## A pool `mmap`s 1 GiB at startup. During trading, the first use of each 4 KiB page still costs about a microsecond. Why?

---

**`mmap` only reserved address space; each page is faulted in on first
touch.** The kernel allocates and zeroes the physical page then. Pre-fault
at startup — write one byte per page, or `MAP_POPULATE` — and `mlock`
so the pages are never swapped or reclaimed.
