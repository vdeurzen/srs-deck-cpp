---
id: heap-timer-wheel-precise
kind: basic
version: 1
level: 5
requires:
  - heap-timer-wheel
tags: [timers, heaps, low-latency]
refs:
  - https://doi.org/10.1145/41457.37504
  - https://man7.org/linux/man-pages/man2/timerfd_create.2.html
---

## An event loop must arm a single one-shot `timerfd` for its next deadline. Why does a timing wheel alone not suffice?

---

**A wheel knows only which tick a bucket covers, not the earliest exact deadline.**

Finding the minimum means scanning buckets, many possibly empty, and a
bucket's list is unsorted. A heap's root is the exact next expiry
in O(1). Hence the common hybrid: a wheel for the mass of timeouts, a
small heap for precise deadlines.
