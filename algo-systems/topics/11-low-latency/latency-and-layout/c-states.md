---
id: ll-c-states
kind: basic
version: 1
level: 4
tags: [low-latency, os, power]
requires:
  - ll-busy-polling
refs:
  - https://www.kernel.org/doc/html/latest/admin-guide/pm/intel_idle.html
  - https://github.com/torvalds/linux/blob/master/drivers/idle/intel_idle.c
---

## A blocking thread's first event after a quiet second takes ~100 µs longer than the rest. The code path is identical. What did the core do while idle?

---

**It dropped into a deep C-state, and waking from C6 takes ~85–130 µs.**
Those are the exit latencies `intel_idle` lists for Skylake client and
server C6. Latency-critical machines cap C-states (`intel_idle.max_cstate`,
`/dev/cpu_dma_latency`) and fix the frequency; a spinning core never idles.
