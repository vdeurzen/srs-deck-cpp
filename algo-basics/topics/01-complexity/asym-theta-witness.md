---
id: complexity-asym-theta-witness
kind: code
version: 1
level: 2
tags: [foundations, complexity, big-theta]
requires:
  - complexity-asym-theta-sandwich
input: chips
choices:
  c1: ["7", "1", "3", "14"]
compile:
  harness: |
    static_assert(violations(n0, 100'000) == 0);  // nothing escapes from n0 on
    static_assert(violations(n0 - 1, n0) == 1);   // and n0 - 1 still escapes
    int main() {}
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
---

f(n) = 2n² + 7n is Θ(n²) between the lines 1·n² and 3·n². Complete the
smallest n₀ from which no n escapes the sandwich.

```cpp
constexpr long f(long n) { return 2 * n * n + 7 * n; }
constexpr bool between(long n) { return n * n <= f(n) && f(n) <= 3 * n * n; }

constexpr long violations(long from, long to) {   // n in [from, to) outside the lines
  long v = 0;
  for (long n = from; n < to; ++n) v += !between(n);
  return v;
}
constexpr long n0 = {{c1::7}};
```

---

The lower line holds for every n ≥ 0 (2n² + 7n ≥ n² always). The upper
one needs 7n ≤ n², i.e. n ≥ 7, so n₀ is the later of the two thresholds.
`1` and `3` still escape above (9 > 3, 39 > 27); from `14` on nothing
escapes, but 13 does not either, so it is not the smallest. Any pair
c₁ ≤ 2 < c₂ works eventually: the leading coefficient 2 is what Θ(n²)
deliberately hides.
