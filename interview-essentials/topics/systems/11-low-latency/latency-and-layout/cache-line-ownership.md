---
id: foundations-cache-line-ownership
kind: basic
version: 1
level: 2
tags: [foundations, memory-hierarchy, cache-coherence, concurrency]
requires:
  - foundations-memory-hierarchy
  - cpp-essentials/conc-thread-shares-memory
refs:
  - https://www.kernel.org/pub/linux/kernel/people/paulmck/perfbook/perfbook.html
  - https://en.wikipedia.org/wiki/MESI_protocol
elaborate: Say in one sentence, as to an interviewer, why two threads that only read a shared table scale but two that write one counter do not.
---

## A core is one of the CPU's processors, each with its own cache. Thread A on core 0 has read the global `x`, so core 0 caches x's line. Thread B on core 1 now writes `x`. What happens to core 0's copy?

---

**It is invalidated: a core must hold a line exclusively to write it.**

Many cores may share a line for reading; a write takes it from all of
them (cache coherence). Core 0's next read of `x` misses and fetches the
line from core 1, far slower than a hit.
