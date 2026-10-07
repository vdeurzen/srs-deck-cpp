---
id: ll-warm-path
kind: basic
version: 1
level: 4
tags: [low-latency, hft, memory-hierarchy]
requires:
  - ll-busy-polling
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/
---

## The order-sending path fires once a minute, and its first run after a gap is several times slower than in the benchmark, on a core that never sleeps. Why?

---

**Everything it needs went cold: caches, TLB and branch predictor were
filled by other work.** A rarely run path is a cold path. The fix is to
keep it warm: push dummy messages through the same code periodically,
stopping just short of the wire.
