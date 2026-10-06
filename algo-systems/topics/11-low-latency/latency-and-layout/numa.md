---
id: ll-numa
kind: basic
version: 1
level: 4
tags: [low-latency, numa, memory-hierarchy, os]
requires:
  - ll-hardware-numbers
refs:
  - https://www.kernel.org/doc/html/latest/admin-guide/mm/numa_memory_policy.html
  - https://man7.org/linux/man-pages/man8/numactl.8.html
elaborate: Where in a service you know is memory first written by a different thread from the one that uses it most?
---

## A startup thread on socket 0 pre-faults a 64 GB arena, then workers run on both sockets. Workers on socket 1 run measurably slower. Why?

---

**Linux places a page on the node of the CPU that first touches it, so
every page landed on socket 0.**

Placement happens at the page fault, not at `malloc`. Every socket-1
access is remote: slower, less bandwidth, until automatic NUMA
balancing (if enabled) migrates pages. Fix: pre-fault from the thread
that uses the memory, or bind it (`numactl --membind`).
