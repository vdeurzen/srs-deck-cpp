---
id: types-double-to-int-trace
kind: trace
version: 1
level: 1
tags: [types, conversions, floating-point, tracing]
probes:
  1: { a: "7" }
  2: { b: "-7" }
  3: { c: "8" }
refs:
  - https://eel.is/c++draft/conv.fpint#1
  - https://en.cppreference.com/w/cpp/language/implicit_conversion
---

All three lines compile.

```cpp
double price = 7.9;
int a = price;              // @1
int b = -price;             // @2
int c = price + 0.5;        // @3
```

---

Converting a floating value to an integer type **discards the fraction**
(truncates toward zero): `7.9` becomes `7`, and `-7.9` becomes `-7`, not
`-8`. The `=` form does it silently. Adding `0.5` first rounds a positive
value (`8.4` → `8`); `std::lround` rounds properly for negatives too.
If the truncated value does not fit the integer type, the behaviour is
undefined. Values from an instrumented copy built with GCC 16.2
(`g++ -std=c++23`).
