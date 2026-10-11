---
id: complexity-cost-trace-single-loop
kind: trace
version: 1
level: 1
tags: [foundations, complexity, cost-model, tracing]
probes:
  1: { steps: "10" }
  2: { steps: "1000" }
  3: { steps: "1000" }
refs:
  - https://en.wikipedia.org/wiki/Analysis_of_algorithms#Cost_models
---

`scan` visits every index from `lo` up to (not including) `hi`. Each
probe reads `steps` after the call on its line.

```cpp
int steps = 0;
void scan(int lo, int hi) {
  for (int i = lo; i < hi; ++i) ++steps;
}

int main() {
  scan(0, 10);                 // @1
  steps = 0; scan(500, 1500);  // @2
  steps = 0; scan(0, 1000);    // @3
}
```

---

A single loop costs its number of passes: `hi − lo`, whatever the body
does per pass (a constant). Only the *length* of the range counts, never
the size of the indices: 500..1500 costs the same as 0..1000. A hundred
times the range is a hundred times the steps: the cost grows **linearly**
with n = hi − lo.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
