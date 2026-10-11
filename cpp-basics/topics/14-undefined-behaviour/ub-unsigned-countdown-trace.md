---
id: ub-unsigned-countdown-trace
kind: trace
version: 1
level: 1
tags: [integers, unsigned, tracing]
requires:
  - ub-signed-overflow-no-wrap
probes:
  1: { below: "4294967295" }
  2: { steps: "10" }
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
  - https://en.cppreference.com/w/cpp/types/integer
---

```cpp
std::uint32_t below = 0;
--below;                                         // @1

std::uint32_t steps = 0;
for (std::uint32_t i = 2; i >= 0 && steps < 10; --i)
    ++steps;
std::uint32_t taken = steps;                     // @2
```

---

Unsigned wrap is defined: `0 - 1` in a 32-bit unsigned type is
2³² − 1 = 4294967295. That makes `i >= 0` always true, so the countdown
never ends by itself: after `i` reaches 0 it wraps to 4294967295 and keeps
going, and only the `steps < 10` cap stops it. `-Wextra` warns:
`comparison of unsigned expression in '>= 0' is always true`. Values from
running an instrumented copy built with GCC 16.2 (`g++ -std=c++23`).
