---
id: ll-memory-pools
kind: basic
version: 1
level: 4
tags: [low-latency, allocators, memory]
requires:
  - foundations-amortised-single-call
refs:
  - https://google.github.io/tcmalloc/design.html
  - https://en.cppreference.com/w/cpp/memory/memory_resource
---

## A modern allocator's fast path is a per-thread free-list pop of tens of nanoseconds. Why is `new` still banned on a hot path?

---

**Its worst case is unbounded: slow paths take a central lock, call
`mmap`, or page-fault.** A p99.9 budget in microseconds is about single
operations, not the average. Allocation also scatters objects across the
address space. So hot paths take memory from pools sized up front.
