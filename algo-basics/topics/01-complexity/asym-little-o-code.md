---
id: complexity-asym-little-o-code
kind: code
version: 1
level: 1
tags: [foundations, complexity, little-o]
requires:
  - complexity-asym-little-o
input: chips
choices:
  c1: ["n * n", "100 * n", "n * n / (n + 1)", "n * n / (5 * n)"]
compile:
  harness: |
    static_assert(ratio(1e3) < 1e-1);             // small
    static_assert(ratio(1e6) < 1e-3);             // and heading to 0
    static_assert(ratio(1e6) < ratio(1e3) / 100);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Big_O_notation#Little-o_notation
---

f(n) = 5n + 100. Complete g so that f(n) = o(g(n)): the ratio f/g must
tend to 0, so that it eventually drops below any constant you name.

```cpp
constexpr double f(double n) { return 5 * n + 100; }
constexpr double g(double n) { return {{c1::n * n}}; }
constexpr double ratio(double n) { return f(n) / g(n); }
```

---

(5n + 100)/n² = 5/n + 100/n² → 0: f is o(n²). Against `100 * n` the
ratio settles at 0.05: small, but a constant, so f is Θ(100n), never o of
it. No constant factor in g can turn Θ into o; only a faster-growing g
can. `n * n / (n + 1)` and `n * n / (5 * n)` look quadratic but simplify to
about n and n/5: linear, so the ratio settles near 5 and 25.
