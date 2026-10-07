---
id: ll-measurement
kind: basic
version: 2
level: 4
tags: [low-latency, measurement, benchmarking]
refs:
  - https://github.com/google/benchmark/blob/main/docs/user_guide.md
  - https://man7.org/linux/man-pages/man7/vdso.7.html
---

## You wrap one call of a ~50 ns function in two `std::chrono::steady_clock::now()` reads. Why is the number you get unusable?

---

**Each clock read costs ~20 ns, as much as the thing measured.** On
Linux it is a vDSO read of the TSC plus conversion, so the interval is
mostly the clock. Time a loop of N calls and divide, subtracting an
empty-loop baseline.
