---
id: ll-tlb-reach
kind: cloze
version: 1
level: 4
tags: [low-latency, memory-hierarchy, os, cost-model]
requires:
  - ll-huge-page-ratio
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/paging/
  - https://www.kernel.org/doc/html/latest/admin-guide/mm/hugetlbpage.html
---

TLB reach is entries × page size. A Skylake core's second-level TLB
holds 1536 entries shared by 4 KiB and 2 MiB pages, so at 4 KiB it maps
only {{c1::6 MiB::compute it}} — a 200 MB index already misses on most
random probes. At 2 MiB pages the same entries map
{{c2::3 GiB::compute it}}.

---

1536 × 4 KiB = 6144 KiB; 1536 × 2 MiB = 3072 MiB. An 8 GiB table needs
2,097,152 entries at 4 KiB and 4096 at 2 MiB. Every miss beyond reach is
a page walk.
