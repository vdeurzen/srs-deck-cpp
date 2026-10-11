---
id: types-unsigned-modulo-trace
kind: trace
version: 1
level: 2
tags: [types, integers, overflow, tracing]
probes:
  1: { stock: "4294967295" }
  2: { big: "205032704" }
  3: { tiny: "4" }
requires:
  - types-overflow-rules
  - types-promotion-rule
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
  - https://eel.is/c++draft/conv.integral#2
---

On x86-64 Linux, `unsigned` is 32 bits and `unsigned char` is 8. Give
each value as a plain decimal number.

```cpp
unsigned stock = 2;
stock = stock - 3;          // @1
unsigned big = 4000000000;
big = big + 500000000;      // @2
unsigned char tiny = 250;
tiny = tiny + 10;           // @3
```

---

Unsigned values live on a clock face of 2ᴺ positions. `2 - 3` steps one
below zero and lands on 2³² − 1. `4 500 000 000` passes 2³² once, leaving
`4 500 000 000 − 4 294 967 296`. For `tiny`, the sum is first computed as
the `int` `260`; storing it back converts modulo 2⁸, giving `4`. No
undefined behaviour anywhere: every step is defined to wrap. Values from
an instrumented copy built with GCC 16.2 (`g++ -std=c++23`, x86-64 Linux).
