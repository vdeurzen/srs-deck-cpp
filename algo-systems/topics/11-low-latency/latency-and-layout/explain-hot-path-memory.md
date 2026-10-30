---
id: ll-explain-hot-path-memory
kind: explain
version: 1
level: 5
tags: [low-latency, hft, memory]
requires:
  - ll-arena-vs-pool
  - ll-numa
  - ll-thp-latency
refs:
  - https://google.github.io/tcmalloc/design.html
  - https://www.kernel.org/doc/html/latest/admin-guide/mm/hugetlbpage.html
elaborate: Which `std::pmr` resource would you hand a per-message parser, and which a book's orders?
---
An interviewer asks how you keep allocation and page faults out of a
microsecond hot path. Answer aloud.
---
- [ ] No allocator call on the path: its fast path takes tens of nanoseconds, but its slow path is unbounded
- [ ] Objects freed one by one come from a fixed-size pool; scratch whose lifetimes end together, from an arena
- [ ] The pool is pre-faulted at startup and `mlock`ed, since `mmap` only reserves addresses and pages fault on first touch
- [ ] A thread on the NUMA node that uses the memory does the pre-faulting, since first touch places each page
- [ ] Huge pages are reserved at boot, not taken from THP, whose compaction and `khugepaged` collapses stall threads unpredictably
