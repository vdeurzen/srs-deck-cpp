---
id: complexity-cost-trace-early-exit
kind: trace
version: 1
level: 1
tags: [foundations, complexity, best-worst-average, tracing]
requires:
  - complexity-cost-trace-triangular
probes:
  1: { comparisons: "1" }
  2: { comparisons: "28" }
  3: { comparisons: "22" }
refs:
  - https://en.wikipedia.org/wiki/Best,_worst_and_average_case
---

`has_duplicate` compares each element with every earlier one and stops
at the first match. Each probe reads `comparisons` after the call on its
line.

```cpp
int comparisons = 0;
bool has_duplicate(const int* a, int n) {
  for (int i = 1; i < n; ++i)
    for (int j = 0; j < i; ++j) {
      ++comparisons;
      if (a[i] == a[j]) return true;
    }
  return false;
}

int main() {
  int x[] = {4, 4, 7, 1, 9, 2, 8, 5};
  int y[] = {4, 7, 1, 9, 2, 8, 5, 3};
  int z[] = {4, 7, 1, 9, 2, 8, 5, 4};
  has_duplicate(x, 8);                   // @1
  comparisons = 0; has_duplicate(y, 8);  // @2
  comparisons = 0; has_duplicate(z, 8);  // @3
}
```

---

Same code, same n = 8, three costs. A match at the first comparison
exits after 1. No duplicate at all means every pair: 1 + 2 + … + 7 = 28.
A duplicate in the last slot still pays 21 for the earlier rows, then
finds it on comparison 22. An early exit makes the cost **depend on the
input**, not just its size; the loop shape only fixes the ceiling.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
