---
id: ll-rdtsc-ordering
kind: basic
version: 1
level: 5
tags: [low-latency, measurement, x86]
requires:
  - ll-measurement
refs:
  - https://www.felixcloutier.com/x86/rdtsc
  - https://www.felixcloutier.com/x86/rdtscp
---

## Two `rdtsc` reads bracket a short region. Why can the measured interval miss part of the region's work?

---

**`rdtsc` is not serialising: out-of-order execution moves work across
it.** Fence both ends: `lfence; rdtsc` so the start waits for earlier
instructions, and `rdtscp; lfence` at the end — `rdtscp` waits for the
region to finish, the `lfence` keeps later instructions from starting
before the read.
