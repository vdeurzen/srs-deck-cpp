---
id: bucket-monotonic-clock
kind: basic
version: 1
level: 4
tags: [hft, rate-limit, token-bucket, clocks]
requires:
  - bucket-refill
refs:
  - https://en.cppreference.com/w/cpp/chrono/steady_clock
  - https://en.cppreference.com/w/cpp/chrono/system_clock
  - https://man7.org/linux/man-pages/man2/clock_gettime.2.html
elaborate: If the clock instead jumped 2 s forward, what would the bucket do, and why is that harmless?
---

## Your token bucket refills like this, with `now` from `std::chrono::system_clock`. Mid-session the clock is set back 2 s (a large NTP step, or a manual or PTP set). What does the limiter do?

```cpp
credit = std::min(cap, credit + (now - last) * rate);  last = now;
```

---

**It refuses orders for up to about 2 s: the lost 2 s of credit, minus
whatever was banked.** The next check sees an elapsed time of −2 s, so
the refill subtracts 2 s of credit. `system_clock` is wall time and can
be stepped. `steady_clock` never goes backwards, so time intervals with
it.
