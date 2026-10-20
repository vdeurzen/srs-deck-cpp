---
id: layout-offsets-trace
kind: trace
version: 2
level: 2
tags: [layout, alignment, padding, tracing]
probes:
  1: { at: "8" }
  2: { at: "18" }
  3: { size: "24" }
requires:
  - layout-padding-worked
  - layout-trailing-padding
elaborate: Say aloud where a member's byte offset matters in code you have written, such as a file format or a message sent over a network.
refs:
  - https://en.cppreference.com/w/cpp/types/offsetof
---

`offsetof(S, m)` gives how many bytes member `m` sits from the start of
an `S`.

```cpp
// x86-64: alignof double 8, short 2, char 1
struct Msg { char kind; double price; short qty; char side; };

int at = offsetof(Msg, price);     // @1
at = offsetof(Msg, side);          // @2
int size = sizeof(Msg);            // @3
```

---

`kind` at 0, then 7 padding bytes so `price` lands on a multiple of 8.
`qty` follows directly at 16 (already 2-aligned) and `side` at 18. The
data ends at 19, and the size rounds up to the next multiple of
`alignof(Msg)` = 8: 24 bytes, 12 of them padding. Values from running an
instrumented copy built with GCC 16.2 (`g++ -std=c++23`, x86-64 Linux).
