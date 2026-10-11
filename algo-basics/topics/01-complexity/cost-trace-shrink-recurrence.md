---
id: complexity-cost-trace-shrink-recurrence
kind: trace
version: 1
level: 2
tags: [foundations, complexity, recurrences, tracing]
requires:
  - complexity-cost-trace-doubling
probes:
  1: { calls: "1001" }
  2: { calls: "10" }
refs:
  - https://en.wikipedia.org/wiki/Recurrence_relation
---

Both functions do a constant amount of work, then call themselves once
on a smaller input. Each probe reads `calls` after the statement on its
line.

```cpp
int calls = 0;
void by_one(int n)  { ++calls; if (n > 0) by_one(n - 1); }
void by_half(int n) { ++calls; if (n > 1) by_half(n / 2); }

int main() {
  by_one(1000);              // @1
  calls = 0; by_half(1000);  // @2
}
```

---

Written as recurrences: `by_one` is T(n) = T(n − 1) + 1, one call per
unit of n, so n + 1 = 1 001 calls: **linear**. `by_half` is
T(n) = T(n/2) + 1: 1000, 500, 250, 125, 62, 31, 15, 7, 3, 1 is 10
calls, **logarithmic**. A recursion that halves is the loop that halves,
written differently; what matters is how fast the input shrinks.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
