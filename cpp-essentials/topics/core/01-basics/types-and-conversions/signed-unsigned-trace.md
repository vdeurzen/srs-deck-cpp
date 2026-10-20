---
id: types-signed-unsigned-trace
kind: trace
version: 2
level: 2
tags: [types, integers, conversions, tracing]
probes:
  1: { before: "false" }
  2: { gap: "4294967294" }
requires:
  - types-usual-arithmetic-conversions
elaborate: Say aloud where in your code a `size()` result meets a signed index or a `-1`, and what this trace predicts there.
refs:
  - https://en.cppreference.com/w/cpp/language/usual_arithmetic_conversions
  - https://eel.is/c++draft/expr.arith.conv
---

`n` plays a container's size, `last` a "nothing yet" index. Read each
variable just after its line runs.

```cpp
// x86-64 Linux: int and unsigned are 32 bits
unsigned n = 3;
int last = -2;
bool before = last < n;     // @1
unsigned gap = n - 5;       // @2
```

---

`last < n`: `int` and `unsigned` share a rank, so `last` converts to
`unsigned`, and `-2` becomes 2³² − 2 = `4294967294`, which is not less
than 3. `n - 5` is computed in `unsigned` too: 3 − 5 wraps modulo 2³² to
the same `4294967294`. Values from an instrumented copy built with GCC
16.2.
