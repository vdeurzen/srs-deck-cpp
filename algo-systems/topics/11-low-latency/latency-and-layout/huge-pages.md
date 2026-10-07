---
id: ll-huge-pages
kind: basic
version: 2
level: 5
tags: [low-latency, memory-hierarchy, os]
requires:
  - ll-tlb-reach
  - ll-page-walk-depth
elaborate: Your structure is compact in bytes. How many pages does it span, and would an arena change that?
refs:
  - https://www.kernel.org/doc/html/latest/admin-guide/mm/hugetlbpage.html
  - https://en.algorithmica.org/hpc/cpu-cache/paging/
---

## An 8 GiB hash table, probed randomly, moves to 2 MiB pages: 4096 entries, still more than the ~1536 the TLB holds. Why does it get faster anyway?

---

**Each TLB miss gets cheap: a shorter walk over page tables that now
stay cached.** At 2 MiB the walk skips the last level, and the leaf
entries are 32 KiB of page table instead of 16 MiB, so the walk hits
cache rather than DRAM. At 1 GiB pages, 8 entries cover it outright.
