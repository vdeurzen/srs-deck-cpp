---
id: foundations-littles-law-sizing
kind: code
version: 1
level: 4
tags: [cost-model, throughput, low-latency, ring-buffer]
requires:
  - foundations-littles-law
input: chips
choices:
  c1:
    - "rate * us / 1'000'000"
    - "rate * us"
    - "rate / us"
    - "us * 1'000'000 / rate"
compile:
  harness: |
    static_assert(ring_slots(200'000, 50) == 64);      // 10 in flight
    static_assert(ring_slots(1'000'000, 3) == 16);     // 3 in flight
    static_assert(ring_slots(5'000'000, 100) == 2048); // 500 in flight
    int main() {}
refs:
  - https://doi.org/10.1287/opre.9.3.383
  - https://en.cppreference.com/w/cpp/numeric/bit_ceil
---

Size a power-of-two ring for messages arriving at `rate` per second that
each stay `us` microseconds before they are consumed. Complete the
average number in flight; the ring gets 4× headroom for bursts.

```cpp
#include <bit>

constexpr unsigned long ring_slots(unsigned long rate, unsigned long us) {
  constexpr unsigned long kHeadroom = 4;
  return std::bit_ceil(kHeadroom * ({{c1::rate * us / 1'000'000}}));
}
```

---

Little's law, `L = λ·W`, with `W` converted from microseconds to seconds.
The law gives the *mean*; a ring sized to the mean overflows on the first
burst, hence the headroom. `rate / us` and `us · 10⁶ / rate` are unit
errors that still compile.
