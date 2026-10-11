---
id: complexity-asym-limit-code
kind: code
version: 1
level: 2
tags: [foundations, complexity, limit-test]
requires:
  - complexity-asym-limit-test
input: chips
choices:
  c1: ["n * n * n", "n * n", "4 * n * n", "n * n * n * n"]
compile:
  harness: |
    static_assert(ratio(1e6) > 0.1 && ratio(1e6) < 100);   // away from 0 and from infinity
    static_assert(ratio(1e6) / ratio(1e3) > 0.5 && ratio(1e6) / ratio(1e3) < 2);  // and settled
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Big_O_notation#Related_asymptotic_notations
---

f(n) = 4n³ + n². Complete g so that f(n)/g(n) settles to a finite,
nonzero limit, which makes g the Θ-class of f.

```cpp
constexpr double f(double n) { return 4 * n * n * n + n * n; }
constexpr double g(double n) { return {{c1::n * n * n}}; }
constexpr double ratio(double n) { return f(n) / g(n); }
```

---

(4n³ + n²)/n³ = 4 + 1/n → 4: finite and nonzero, so f = Θ(n³), with
the 4 absorbed into the constant. Against `n * n` or `4 * n * n` the
ratio grows like n (f is ω of them); against n⁴ it vanishes (f is o of
it). The Θ-class is the leading term with its coefficient stripped.
