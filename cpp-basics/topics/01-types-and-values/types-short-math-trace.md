---
id: types-short-math-trace
kind: trace
version: 1
level: 2
tags: [types, integers, promotion, tracing]
probes:
  1: { p: "90000" }
  2: { s: "24464" }
  3: { width: "4" }
requires:
  - cpp-essentials/types-promotion-rule
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Integral_promotion
  - https://eel.is/c++draft/conv.prom
  - https://eel.is/c++draft/conv.integral#3
---

On x86-64 Linux, `short` is 16 bits (largest value 32767) and `int` is
32 bits.

```cpp
short a = 300, b = 300;
auto p = a * b;             // @1
short s = a * b;            // @2
int width = sizeof(p);      // @3
```

---

Before arithmetic, any operand narrower than `int` is **promoted** to
`int`, so `a * b` is an `int` multiplication: `90000`, no overflow, and
`auto` makes `p` an `int` (4 bytes). Only storing into the 16-bit `s`
squeezes it: since C++20 that conversion is defined as modulo 2¹⁶,
`90000 − 65536 = 24464`. Values from an instrumented copy built with
GCC 16.2 (`g++ -std=c++23`, x86-64 Linux).
