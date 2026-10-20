---
id: bucket-clock-step-trace
kind: trace
version: 2
level: 4
tags: [hft, rate-limit, token-bucket, clocks, tracing]
probes:
  1: { "b.credit": "-180000", ok: "false" }
  2: { "b.credit": "-80000", ok: "false" }
requires:
  - bucket-monotonic-clock
refs:
  - https://en.cppreference.com/w/cpp/chrono/system_clock
  - https://en.cppreference.com/w/cpp/chrono/steady_clock
elaborate: With `steady_clock`, what would `b.credit` be at @2, and would the order go out?
---

A token bucket in milli-tokens and milliseconds: 100 orders/s, a burst
of 20, and it is full. `now` comes from the wall clock. It last read
10 000 ms, then the clock was stepped back 2 s, so the next read is
8 000 ms.

```cpp
constexpr long kToken = 1000;                   // milli-tokens per token
struct Bucket {
  long rate, cap, credit, last;                 // tokens/s; milli-tokens; milli-tokens; ms
  bool try_take(long now) {
    credit = std::min(cap, credit + (now - last) * rate);  last = now;
    if (credit < kToken) return false;
    credit -= kToken;  return true;
  }
};
Bucket b{100, 20 * kToken, 20 * kToken, 10'000};
bool ok = b.try_take(8'000);                    // @1
ok = b.try_take(9'000);                         // @2   1 s of real time later
```

---

**The step back costs 2 s of credit, 200 tokens, far more than the 20
banked.** `std::min` clamps only from above, so at @1 the credit goes
deeply negative and a full bucket refuses. A second of real time earns
back 100 tokens, still leaving −80 tokens: refused again. It trades
again only about 1.8 s after the step: 2 s lost, 0.2 s banked.

These values follow from C++'s rules for this code; a compiled run
under GCC 16.2 agreed.
