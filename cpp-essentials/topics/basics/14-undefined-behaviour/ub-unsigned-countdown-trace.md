---
id: ub-unsigned-countdown-trace
kind: trace
version: 3
level: 1
tags: [integers, unsigned, tracing]
requires:
  - types-overflow-rules
probes:
  1: { taken: "3" }
elaborate: Where in your code does an unsigned index count down, and what condition actually ends that loop?
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
  - https://en.cppreference.com/w/cpp/types/integer
---

Signed overflow is undefined behaviour; this loop uses an unsigned type
instead. `std::uint32_t` is an unsigned integer type exactly 32 bits wide.

```cpp
std::uint32_t steps = 0;
for (std::uint32_t i = 1; i >= 0 && steps < 3; --i)
    ++steps;
std::uint32_t taken = steps;                     // @1
```

---

Unsigned wrap is defined, so nothing here is undefined: `--i` from 0
gives 2³² − 1 = 4294967295. That makes `i >= 0` always true, so the
countdown never ends by itself: `i` runs 1, 0, then wraps and the body
runs a third time; only the `steps < 3` cap stops it. GCC warns that the
comparison is always true. Values from running an instrumented copy
built with GCC 16.2 (`g++ -std=c++23`).
