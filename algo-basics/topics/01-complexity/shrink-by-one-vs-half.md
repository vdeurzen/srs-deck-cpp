---
id: complexity-shrink-by-one-vs-half
kind: trace
version: 1
level: 2
tags: [complexity, recurrences, tracing]
requires:
  - complexity-recursion-tree-calls
  - complexity-arithmetic-series
probes:
  1: { work: "136" }
  2: { work: "31" }
refs:
  - https://en.wikipedia.org/wiki/Recurrence_relation
---

Both functions do `n` units of work, then recurse once on a smaller
input. Each probe reads `work` after the statement on its line.

```cpp
long work = 0;
void by_one(int n)  { if (n == 0) return; work += n; by_one(n - 1); }
void by_half(int n) { if (n == 0) return; work += n; by_half(n / 2); }

int main() {
  by_one(16);              // @1
  work = 0; by_half(16);   // @2
}
```

---

`T(n) = T(n − 1) + n` sums n + (n − 1) + … + 1 = n(n + 1)/2: **Θ(n²)**,
so doubling n quadruples it. `T(n) = T(n/2) + n` sums
n + n/2 + … < 2n: **Θ(n)**: doubling n only doubles it. How the
input shrinks matters more than the work per call; the master theorem
covers only the dividing kind.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
