---
id: complexity-best-worst-linear-search
kind: trace
version: 1
level: 1
tags: [complexity, best-worst-average, tracing]
requires:
  - complexity-count-loop-steps
probes:
  1: { comparisons: "1" }
  2: { comparisons: "8" }
  3: { comparisons: "8" }
refs:
  - https://en.wikipedia.org/wiki/Linear_search
---

Each probe reads `comparisons` after the call on its line.

```cpp
int comparisons = 0;
int find(const int* a, int n, int key) {
  for (int i = 0; i < n; ++i) {
    ++comparisons;
    if (a[i] == key) return i;
  }
  return -1;
}

int main() {
  int a[] = {7, 3, 9, 1, 8, 2, 6, 4};
  find(a, 8, 7);                   // @1
  comparisons = 0; find(a, 8, 4);  // @2
  comparisons = 0; find(a, 8, 5);  // @3
}
```

---

Same code, same n, three costs. **Best case**: key first, 1 comparison,
Θ(1). **Worst case**: key last *or absent*, n comparisons, Θ(n).
Best, worst and average are three different functions of n; you must say
which one a bound is about.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
