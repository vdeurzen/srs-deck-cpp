---
id: variadic-fold-order
kind: trace
version: 1
level: 2
tags: [templates, variadic, tracing]
requires:
  - variadic-fold-forms
probes:
  1: { r: "9" }
  2: { l: "3" }
refs:
  - https://en.cppreference.com/w/cpp/language/fold
---

```cpp
template<typename... Ts>
int rfold(Ts... xs) { return (xs - ...); }
template<typename... Ts>
int lfold(Ts... xs) { return (... - xs); }

int r = rfold(10, 4, 3);   // @1
int l = lfold(10, 4, 3);   // @2
```

---

A **fold expression** applies a binary operator across a pack. With the
pack on the left, `(xs - ...)` is a right fold: `10 - (4 - 3)`. With
`...` on the left, `(... - xs)` is a left fold: `(10 - 4) - 3`. Verified
with GCC 16.2 (`g++ -std=c++23`).
