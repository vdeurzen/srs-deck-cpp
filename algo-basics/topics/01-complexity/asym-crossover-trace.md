---
id: complexity-asym-crossover-trace
kind: trace
version: 1
level: 1
tags: [foundations, complexity, growth-order, tracing]
requires:
  - complexity-asym-little-o
  - complexity-asym-log-rules
probes:
  1: { a: "16" }
  2: { b: "3" }
  3: { c: "50" }
refs:
  - https://en.wikipedia.org/wiki/Time_complexity#Table_of_common_time_complexities
  - https://en.wikipedia.org/wiki/Big_O_notation#Orders_of_common_functions
---

On the ladder 1, log n, n, n log n, n², 2ⁿ, n! each rung is o of the
next, so the faster-growing one wins *eventually*. `last_n_where`
returns the largest n ≤ 1000 for which the faster-growing rung is still
≤ the slower-growing one; `lg` is ⌊log₂ n⌋.

```cpp
#include <cmath>
int last_n_where(auto not_yet_ahead) {        // largest n <= 1000 where it holds
  int last = 0;
  for (int n = 1; n <= 1'000; ++n) if (not_yet_ahead(n)) last = n;
  return last;
}
double fact(int n) { double r = 1; for (int k = 2; k <= n; ++k) r *= k; return r; }
int lg(int n) { int k = 0; while (n > 1) { n /= 2; ++k; } return k; }

int main() {
  int a = last_n_where([](int n) { return std::pow(2.0, n) <= std::pow(n, 4); });  // @1
  int b = last_n_where([](int n) { return fact(n) <= std::pow(2.0, n); });         // @2
  int c = last_n_where([](int n) { return 1.0 * n * n <= 10.0 * n * lg(n); });     // @3
}
```

---

- `a`: 2¹⁶ = 65 536 = 16⁴ ties; from 17 on 2ⁿ is ahead for good (it
  doubles per step, n⁴ grows by (1 + 1/n)⁴ → 1). Polynomial-vs-exponential
  crossovers sit far out.
- `b`: 3! = 6 ≤ 8, 4! = 24 > 16. n! multiplies by n + 1 per step, 2ⁿ by
  2, so n! takes over almost at once.
- `c`: n² ≤ 10·n·lg n is n ≤ 10·⌊log₂ n⌋; for 32 ≤ n < 64 that is n ≤ 50,
  and for n ≥ 64 it never holds again. Without the 10 the n² rung is
  larger from n = 1: a constant on the slower rung moves the crossover,
  never the winner.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
