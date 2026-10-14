---
id: bucket-refill
kind: code
version: 1
level: 4
tags: [hft, rate-limit, token-bucket, implement-it]
input: chips
choices:
  c1:
    - "credit = std::min(cap, credit + (now - last) * rate); last = now;"
    - "credit += (now - last) * rate; last = now;"
    - "credit = std::min(cap, credit + (now - last) * rate);"
    - "last = now; credit = std::min(cap, credit + (now - last) * rate);"
compile:
  harness: |
    constexpr std::int64_t ms = 1'000'000;      // in ns
    constexpr int burst(Bucket& b, std::int64_t now) {   // orders sent back to back at now
      int sent = 0;
      while (sent < 1000 && b.try_take(now)) ++sent;
      return sent;
    }
    constexpr bool test() {
      Bucket b{100, 20 * kToken, 20 * kToken, 0};          // 100/s, burst 20, full at t = 0
      bool ok = burst(b, 0) == 20;                         // the stored burst, then refused
      ok = ok && burst(b, 10 * ms) == 1;                   // 10 ms earns one token
      int sent = 0;
      for (std::int64_t t = 11 * ms; t <= 1010 * ms; t += ms) sent += b.try_take(t);
      ok = ok && sent == 100;                              // checked every 1 ms: 100 per s
      return ok && burst(b, 60'000 * ms) == 20;            // idle a minute: still 20
    }
    static_assert(test());
    int main() {}
requires:
  - bucket-burst-bound
refs:
  - https://www.rfc-editor.org/rfc/rfc2697
  - https://en.cppreference.com/w/cpp/algorithm/min
elaborate: At 1 000 000 tokens/s, how long can the bucket sit idle before `(now - last) * rate` overflows `int64_t`, and how would you clamp it?
---

The interviewer: "Write the order-rate check. No timer thread." Each
check refills the bucket from the time elapsed since the last one.
Credit counts nano-tokens, so one token is `kToken` and refill needs no
division. Complete the refill.

```cpp
#include <algorithm>
#include <cstdint>
constexpr std::int64_t kToken = 1'000'000'000;  // nano-tokens per token
struct Bucket {
  std::int64_t rate, cap, credit, last;         // tokens/s; nano-tokens; nano-tokens; ns
  constexpr bool try_take(std::int64_t now) {   // now: monotonic ns
    {{c1::credit = std\::min(cap, credit + (now - last) * rate); last = now;}}
    if (credit < kToken) return false;
    credit -= kToken;  return true;
  }
};
```

---

**Add the elapsed time times the rate, clamp to the capacity, then
move `last` to now.** Without the clamp an idle bucket banks an
unbounded burst. Without moving `last`, every check re-counts the same
interval. Moving `last` before reading it makes every interval zero,
so the bucket never refills. Refill on demand like this needs no timer.
