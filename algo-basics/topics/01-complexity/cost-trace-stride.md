---
id: complexity-cost-trace-stride
kind: trace
version: 1
level: 1
tags: [foundations, complexity, cost-model, tracing]
requires:
  - complexity-cost-trace-single-loop
probes:
  1: { steps: "34" }
  2: { steps: "10" }
  3: { steps: "3334" }
refs:
  - https://en.wikipedia.org/wiki/Analysis_of_algorithms#Cost_models
---

`stride` walks 0, k, 2k, … while below `n`. Each probe reads `steps`
after the call on its line.

```cpp
int steps = 0;
void stride(int n, int k) {
  steps = 0;
  for (int i = 0; i < n; i += k) ++steps;
}

int main() {
  stride(100, 3);     // @1
  stride(100, 10);    // @2
  stride(10'000, 3);  // @3
}
```

---

The loop runs ⌈n / k⌉ times: 34 (i = 0, 3, …, 99), 10, 3 334. A stride
divides the cost by a **constant**, so it is still linear in n: a
hundred times the input is a hundred times the steps (34 → 3 334).
Changing k changes the constant factor, which growth analysis ignores,
and never the shape.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
