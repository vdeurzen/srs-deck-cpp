---
id: bucket-clock-step-trace
kind: trace
version: 1
level: 4
tags: [hft, rate-limit, token-bucket, clocks, tracing]
probes:
  1: { "full.credit": "-180000", "full.last": "8000", ok: "false" }
  2: { "empty.credit": "-200000", "empty.last": "8000", ok: "false" }
  3: { "full.credit": "19000", "full.last": "10000", ok: "true" }
  4: { "empty.credit": "0", "empty.last": "10000", ok: "false" }
requires:
  - bucket-monotonic-clock
refs:
  - https://en.cppreference.com/w/cpp/chrono/system_clock
  - https://en.cppreference.com/w/cpp/chrono/steady_clock
elaborate: With `steady_clock`, what would `empty.credit` be at @4?
---

`try_take` from `bucket-refill`, in milli-tokens and milliseconds. Both
buckets allow 100 orders/s with a burst of 20. `now` comes from the wall
clock. It reads 10 000 ms, then is stepped back 2 s, so the next read is
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
Bucket full{100, 20 * kToken, 20 * kToken, 10'000};
Bucket empty{100, 20 * kToken, 0, 10'000};
bool ok = full.try_take(8'000);                 // @1
ok = empty.try_take(8'000);                     // @2
ok = full.try_take(10'000);                     // @3   2 s of real time later
ok = empty.try_take(10'000);                    // @4
```

---

**The step back costs each bucket 2 s of credit, 200 tokens, far more
than either holds.** `std::min` clamps only from above, so at @1 and @2
the credit goes deeply negative and both refuse. Two seconds later both have earned
exactly that back. The full bucket is full again, since it was clamped
at the cap anyway; the empty one is still empty, where a monotonic clock
would have refilled it to 20 tokens.

These values follow from C++'s rules for this code; a compiled run on
two compilers agreed.
