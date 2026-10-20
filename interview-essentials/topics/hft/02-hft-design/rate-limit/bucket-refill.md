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
    constexpr int burst(Bucket& b, long now) {     // orders sent back to back at now
      int sent = 0;
      while (sent < 1000 && b.try_take(now)) ++sent;
      return sent;
    }
    constexpr bool test() {
      Bucket b{1, 20, 20, 0};                      // 1 per tick, burst 20, full at tick 0
      bool ok = burst(b, 0) == 20;                 // the stored burst, then refused
      ok = ok && burst(b, 1) == 1;                 // one tick earns one token
      int sent = 0;
      for (long t = 2; t <= 101; ++t) sent += b.try_take(t);
      ok = ok && sent == 100;                      // checked every tick: 100 in 100 ticks
      return ok && burst(b, 6'000) == 20;          // idle a long time: still 20
    }
    static_assert(test());
    int main() {}
requires:
  - bucket-burst-bound
  - cpp-essentials/class-struct-members
  - cpp-essentials/constexpr-fn-static-assert
refs:
  - https://www.rfc-editor.org/rfc/rfc2697
  - https://en.cppreference.com/w/cpp/algorithm/min
elaborate: Say to an interviewer why this limiter needs no timer thread, and what happens to `(now - last) * rate` after a very long idle spell.
---

The interviewer: "Write the order-rate check. No timer thread." Each
check refills the bucket from the time elapsed since the last one;
`std::min(a, b)` returns the smaller of two values. Complete the refill.

```cpp
#include <algorithm>
struct Bucket {
  long rate, cap, credit, last;          // tokens per tick; tokens; tokens; tick
  constexpr bool try_take(long now) {    // now: the current tick, never decreasing
    {{c1::credit = std\::min(cap, credit + (now - last) * rate); last = now;}}
    if (credit < 1) return false;
    credit -= 1;  return true;
  }
};
```

---

**Add the elapsed time times the rate, clamp to the capacity, then
move `last` to now.** Without the clamp an idle bucket banks an
unbounded burst. Without moving `last`, every check re-counts the same
interval. Moving `last` before reading it makes every interval zero,
so the bucket never refills. Refill on demand like this needs no timer.
