---
id: complexity-cost-trace-dependent-halving
kind: trace
version: 1
level: 2
tags: [foundations, complexity, cost-model, tracing]
requires:
  - interview-essentials/complexity-cost-geometric-sum
  - complexity-cost-trace-triangular
probes:
  1: { steps: "197" }
  2: { steps: "1994" }
refs:
  - https://en.wikipedia.org/wiki/Geometric_series#Sum
---

The inner loop runs `len` times while `len` halves. Each probe reads
`steps` after the call on its line.

```cpp
int steps = 0;
void shrink(int n) {
  for (int len = n; len > 0; len /= 2)
    for (int j = 0; j < len; ++j) ++steps;
}

int main() {
  shrink(100);              // @1
  steps = 0; shrink(1000);  // @2
}
```

---

Add the passes: 100 + 50 + 25 + 12 + 6 + 3 + 1 = 197, and
1000 + 500 + … + 1 = 1 994. Each pass costs half the one before, so the
sum is **less than twice the first pass**: linear in n, not n·log n.
"Outer runs log n times, inner runs up to n" multiplies two bounds that
are never large at the same time; add the actual per-pass counts.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
