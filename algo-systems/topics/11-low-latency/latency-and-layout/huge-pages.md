---
id: ll-huge-pages
kind: basic
version: 1
level: 5
tags: [low-latency, memory-hierarchy, os]
refs:
  - https://www.kernel.org/doc/html/latest/admin-guide/mm/hugetlbpage.html
  - https://en.wikipedia.org/wiki/Translation_lookaside_buffer
---

## A hash table of 8 GB spends a surprising fraction of its time in address translation. Why, and what do huge pages change?

---

Every memory access needs a virtual-to-physical translation, cached in
the **TLB**. A typical core has a few hundred to ~1500 entries in its
L1+L2 data TLBs, covering — at 4 KiB per page — only a handful of
megabytes. An 8 GB table accessed randomly misses the TLB on nearly
every probe, and a miss costs a **page walk**: up to four dependent
memory accesses through the page tables, themselves possibly cache
misses. That cost is invisible in the source and in most profiles
unless you look at the right counters (`dTLB-load-misses`,
`page-walk-duration`).

**Huge pages** (2 MiB, and 1 GiB on x86-64) make each TLB entry cover
512× or 262144× more memory. The 8 GB table needs 4096 entries at
2 MiB instead of two million at 4 KiB — still more than the ~1500 the
TLB holds, so random probes still miss the TLB often. What changes is
the miss: the walk is one level shorter, and the leaf entries it reads
are 32 KB of page tables that stay cached, instead of 16 MB that
themselves miss to DRAM. At 1 GiB the table needs 8 entries and fits
outright. Secondary benefits: fewer page faults at startup, and
contiguous physical memory.

The two ways to get them, and their trade-offs:

- **Transparent huge pages (THP)**: the kernel promotes eligible
  regions automatically. Zero effort, but the promotion and the
  background defragmentation (`khugepaged`) cause **latency spikes**,
  which is why databases (MongoDB, Redis, Postgres advice) and
  latency-sensitive services routinely disable or set THP to
  `madvise`. Wasted memory from partly used 2 MiB pages is the other
  cost.
- **Explicit hugetlbfs / `MAP_HUGETLB`**, with pages reserved at boot:
  deterministic, no defragmentation stalls, no surprise. This is what
  DPDK and low-latency trading stacks do — reserve at startup,
  `mlock`, pre-fault, and never take a fault again.

The general lesson beyond the flag: **translation is part of the cost
model**. A data structure that is compact in bytes can still be
expensive in pages, so the same reasoning that favours flat arrays for
cache favours them again for the TLB — and it is one more argument for
arenas, since a million objects in one arena spans a handful of huge
pages, while a million individual allocations can span thousands of
small ones.
