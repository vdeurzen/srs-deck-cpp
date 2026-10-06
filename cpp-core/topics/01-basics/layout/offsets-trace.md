---
id: layout-offsets-trace
kind: trace
version: 1
level: 2
tags: [layout, alignment, padding, tracing]
probes:
  1: { at: "8" }
  2: { at: "16" }
  3: { at: "18" }
  4: { size: "24" }
requires:
  - layout-padding-sizeof
refs:
  - https://en.cppreference.com/w/cpp/types/offsetof
---

```cpp
// x86-64: alignof double 8, short 2, char 1
struct Msg { char kind; double price; short qty; char side; };

std::size_t at = offsetof(Msg, price);   // @1
at = offsetof(Msg, qty);                 // @2
at = offsetof(Msg, side);                // @3
std::size_t size = sizeof(Msg);          // @4
```

---

`kind` at 0, then 7 padding bytes so `price` lands on a multiple of 8.
`qty` follows directly at 16 (already 2-aligned) and `side` at 18. The
data ends at 19, and the size rounds up to the next multiple of
`alignof(Msg)` = 8: 24 bytes, 12 of them padding. Values from running an
instrumented copy built with GCC 16.2 (`g++ -std=c++23`, x86-64 Linux).
