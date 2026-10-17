---
id: types-signed-unsigned-trace
kind: trace
version: 1
level: 2
tags: [types, integers, conversions, tracing]
probes:
  1: { lt: "false" }
  2: { lt2: "true" }
  3: { d: "4294967295" }
requires:
  - types-usual-arithmetic-conversions
refs:
  - https://en.cppreference.com/w/cpp/language/usual_arithmetic_conversions
---

```cpp
// x86-64 Linux: int is 32 bits, long is 64 bits
int i = -1;
unsigned u = 1;
bool lt = i < u;          // @1
long wide = -1;
bool lt2 = wide < u;      // @2
unsigned d = u - 2;       // @3
```

---

`i < u`: same rank, so `i` converts to `unsigned` and `-1` becomes
`4294967295`; the comparison is false. `wide < u`: `long` outranks
`unsigned int` and, being 64 bits, can represent every `unsigned` value,
so `u` converts to `long` instead and `-1 < 1` is true. The same source
line flips meaning on a platform where `long` is 32 bits (Windows).
`u - 2` is computed in `unsigned` and wraps modulo 2³² to `4294967295`.
Values from running an instrumented copy built with GCC 16.2
(`g++ -std=c++23`, x86-64 Linux).
