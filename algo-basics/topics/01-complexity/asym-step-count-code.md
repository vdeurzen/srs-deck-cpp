---
id: complexity-asym-step-count-code
kind: code
version: 1
level: 1
tags: [foundations, complexity, step-model]
requires:
  - complexity-asym-step-model
input: chips
choices:
  c1: ["4 * n + 3", "4 * n", "4 * n + 2", "5 * n + 2"]
compile:
  harness: |
    static_assert(ops(0) == closed(0));
    static_assert(ops(1) == closed(1));
    static_assert(ops(25) == closed(25));
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Analysis_of_algorithms#Cost_models
---

`ops(n)` counts every basic operation of the one-line loop in the comment,
charging each line what it executes. Complete the closed form T(n) so it
matches for every n ≥ 0.

```cpp
// int s = 0; for (int i = 0; i < n; ++i) s += a[i];
constexpr int ops(int n) {
  int c = 2;                       // s = 0 and i = 0
  for (int i = 0; i < n; ++i)
    c += 4;                        // i < n, a[i], s += ..., ++i
  c += 1;                          // the last i < n, which fails
  return c;
}
constexpr int closed(int n) { return {{c1::4 * n + 3}}; }
```

---

Two set-up steps, four per pass, and one extra test to leave the loop:
T(n) = 4n + 3. `4 * n` forgets that the loop costs something even at
n = 0; `4 * n + 2` forgets the failing test. The exact numbers depend on
what you call one step (is `s += a[i]` one operation or two?), which is
why the next move is to keep only the growth, a·n + b, and drop a and b.
