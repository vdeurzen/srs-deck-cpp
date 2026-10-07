---
id: ll-page-walk-depth
kind: cloze
version: 1
level: 3
tags: [low-latency, memory-hierarchy, os]
requires:
  - foundations-latency-scale
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/paging/
  - https://www.kernel.org/doc/html/latest/arch/x86/x86_64/mm.html
---

On x86-64 with 4 KiB pages and the usual (non-LA57) paging, a TLB miss
costs a page walk of up to {{c1::four::a small count}} dependent memory
reads before the access itself can start.

---

PGD → PUD → PMD → PTE: one read per level, each needing the previous
one's result, and each possibly a cache miss. 5-level paging (LA57) adds
one more.
