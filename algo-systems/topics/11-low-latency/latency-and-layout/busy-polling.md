---
id: ll-busy-polling
kind: basic
version: 1
level: 4
tags: [low-latency, hft, os, networking]
requires:
  - foundations-latency-scale
elaborate: Which thread in your system would you never let spin, and what would a spin-then-park hybrid cost it?
refs:
  - https://www.kernel.org/doc/html/latest/networking/napi.html
  - https://doc.dpdk.org/guides/prog_guide/overview.html
---

## Why does a latency-critical thread burn a whole core spinning instead of blocking until data arrives?

---

**Waking a blocked thread costs microseconds; a spinning one reacts in
hundreds of nanoseconds.** Blocking means a syscall, an interrupt, a
scheduler decision and a context switch, with a long tail, and the woken
thread starts cold. On a many-core box one dedicated core is the cheap
side of that trade.
