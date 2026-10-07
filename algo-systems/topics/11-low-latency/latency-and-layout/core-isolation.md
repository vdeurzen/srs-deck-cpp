---
id: ll-core-isolation
kind: basic
version: 1
level: 5
tags: [low-latency, hft, os, linux]
requires:
  - ll-busy-polling
refs:
  - https://www.kernel.org/doc/html/latest/admin-guide/kernel-parameters.html
  - https://www.kernel.org/doc/html/latest/timers/no_hz.html
---

## A pinned spinning thread still shows 20–50 µs hiccups a few times a second. What has to be configured on its core?

---

**Isolate it: `isolcpus` (or cpusets), `nohz_full`, and IRQs steered
elsewhere.** The hiccups are other tasks scheduled there, the periodic
timer tick, and device interrupts. Isolation keeps the scheduler away,
`nohz_full` stops the tick while one task runs, `irqaffinity` moves
interrupts off.
