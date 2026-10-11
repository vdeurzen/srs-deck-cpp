---
id: complexity-cost-trace-sequential-vs-nested
kind: trace
version: 1
level: 1
tags: [foundations, complexity, cost-model, tracing]
requires:
  - complexity-cost-sum-rule
  - complexity-cost-product-rule
probes:
  1: { a: "40" }
  2: { b: "400" }
refs:
  - https://en.wikipedia.org/wiki/Analysis_of_algorithms#Growth_rate_analysis_of_other_resources
---

Two loops over the same `n`, arranged two ways. Each probe reads its
counter after that block has finished.

```cpp
int main() {
  const int n = 20;
  int a = 0, b = 0;
  for (int i = 0; i < n; ++i) ++a;
  for (int j = 0; j < n; ++j) ++a;       // @1
  for (int i = 0; i < n; ++i)
    for (int j = 0; j < n; ++j) ++b;     // @2
}
```

---

Same two loops, same n: **one after the other adds** (n + n = 40),
**one inside the other multiplies** (n · n = 400). At n = 20 the gap is
10×; at n = 10⁶ it is a million times. The first thing to see in any
piece of code is which loops are nested, and which merely follow.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
