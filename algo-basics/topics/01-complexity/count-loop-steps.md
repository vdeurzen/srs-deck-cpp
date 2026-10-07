---
id: complexity-count-loop-steps
kind: trace
version: 1
level: 1
tags: [complexity, big-o, tracing]
probes:
  1: { a: "16" }
  2: { b: "120" }
  3: { c: "4" }
requires:
  - complexity-big-o-scaling
refs:
  - https://en.wikipedia.org/wiki/Big_O_notation#Orders_of_common_functions
---

Each probe reads its counter after that loop has finished.

```cpp
int main() {
  const int n = 16;
  int a = 0, b = 0, c = 0;
  for (int i = 0; i < n; ++i) ++a;                   // @1
  for (int i = 0; i < n; ++i)
    for (int j = i + 1; j < n; ++j) ++b;             // @2
  for (int i = 1; i < n; i *= 2) ++c;                // @3
}
```

---

Three loop shapes worth recognising on sight:

- **One pass**: `a = n` → O(n).
- **Every pair once**: `b = n(n − 1)/2 = 120`. Half of n² is still
  O(n²); starting the inner loop at `i + 1` changes the constant, not the
  growth.
- **The loop variable doubles**: `c = log₂ 16 = 4` → O(log n). Any loop
  that multiplies or divides its variable by a constant is logarithmic.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
