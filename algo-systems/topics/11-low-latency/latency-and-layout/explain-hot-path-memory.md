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
---
Explain how you keep allocation and page faults out of a microsecond hot
path.
---
- [ ] No allocator call on the path, because the allocator's slow path (central lock, `mmap`, page fault) has an unbounded worst case even though its fast path is tens of nanoseconds
- [ ] Objects freed one at a time come from a fixed-size free-list pool; objects whose lifetimes end together (one message's scratch) come from an arena reset all at once
- [ ] The pool's memory is pre-faulted at startup (touch each page or `MAP_POPULATE`) and `mlock`ed, because `mmap` only reserves address space and each page faults on first touch
- [ ] The pre-faulting is done by a thread on the NUMA node that will use the memory, because Linux places each page on the node of the CPU that first touches it
- [ ] Huge pages are reserved at boot rather than taken from THP, whose synchronous compaction and `khugepaged` collapses stall threads unpredictably
