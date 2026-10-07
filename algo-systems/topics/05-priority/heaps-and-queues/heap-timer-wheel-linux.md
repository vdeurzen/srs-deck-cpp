---
id: heap-timer-wheel-linux
kind: basic
version: 1
level: 5
requires:
  - heap-timer-wheel-hierarchy
tags: [timers, linux, low-latency]
elaborate: Which timeouts in your own systems must fire on time, and which only need to fire eventually?
refs:
  - https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/kernel/time/timer.c
  - https://lwn.net/Articles/646950/
---

## Since Linux 4.8 the kernel's timer wheel never cascades a timer into a finer level. What does it give up?

---

**Exact expiry: a far-off timer fires late, by up to its level's granularity.**

Each level is 8× coarser than the last (1 ms, 8 ms, 64 ms… at
HZ=1000) and spans 64 buckets, so the lateness is bounded by about 1/8
of the timeout. The bet, per `timer.c`: most timeouts are cancelled
before expiry, so precision on them is wasted.
