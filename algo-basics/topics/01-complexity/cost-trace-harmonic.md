---
id: complexity-cost-trace-harmonic
kind: trace
version: 1
level: 2
tags: [foundations, complexity, cost-model, tracing]
requires:
  - complexity-cost-trace-stride
  - complexity-cost-harmonic-number
probes:
  1: { a: "16" }
  2: { b: "4" }
  3: { c: "61" }
refs:
  - https://en.wikipedia.org/wiki/Harmonic_number
  - https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes#Algorithmic_complexity
---

The inner loop's stride is the outer index, as in a sieve that strikes
out every i-th cell. Each probe reads the variable on its line.

```cpp
int inner(int n, int i) {
  int c = 0;
  for (int j = 0; j < n; j += i) ++c;
  return c;
}
int total(int n) {
  int s = 0;
  for (int i = 1; i <= n; ++i) s += inner(n, i);
  return s;
}

int main() {
  int a = inner(16, 1);  // @1
  int b = inner(16, 5);  // @2
  int c = total(16);     // @3
}
```

---

Pass i costs ⌈n / i⌉: 16, 8, 6, 4, 4, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1,
which add to 61. The sum n/1 + n/2 + … + n/n is n times the **harmonic
number** H(n) ≈ ln n + 0.58, so the whole thing costs about **n log n**:
much less than the n² the nested shape suggests, since most passes do
only a handful of steps.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
