---
id: complexity-cost-trace-triangular
kind: trace
version: 1
level: 1
tags: [foundations, complexity, cost-model, tracing]
requires:
  - complexity-cost-product-rule
probes:
  1: { steps: "45" }
  2: { steps: "190" }
refs:
  - https://en.wikipedia.org/wiki/Triangular_number
---

The inner bound is the outer index. Each probe reads `steps` after the
call on its line.

```cpp
int steps = 0;
void pairs(int n) {
  steps = 0;
  for (int i = 0; i < n; ++i)
    for (int j = 0; j < i; ++j) ++steps;
}

int main() {
  pairs(10);  // @1
  pairs(20);  // @2
}
```

---

The inner count changes every pass (0, 1, 2, …, n − 1), so you cannot
multiply; **add the passes**: 0 + 1 + … + 9 = 45, 0 + … + 19 = 190.
That is n(n − 1)/2, the triangular number: a little under half of
n². Doubling n quadrupled the steps (45 → 190), the signature of a cost
that grows **quadratically**. The shape is "every pair once".

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
