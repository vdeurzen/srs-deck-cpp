---
id: ll-thp-latency
kind: basic
version: 1
level: 5
tags: [low-latency, memory-hierarchy, os, linux]
requires:
  - ll-huge-pages
refs:
  - https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html
  - https://www.kernel.org/doc/html/latest/admin-guide/mm/hugetlbpage.html
---

## Transparent huge pages give 2 MiB pages with no code change. Why do latency-sensitive services set THP to `madvise` or `never` and reserve hugetlbfs pages at boot instead?

---

**THP's promotion and compaction stall threads at unpredictable
moments.** A fault may compact memory synchronously to find 2 MiB, and
`khugepaged` collapses pages in the background. A pool reserved at boot
(`hugepages=` or `vm.nr_hugepages`), mapped with `MAP_HUGETLB` and
pre-faulted, never compacts on the hot path.
