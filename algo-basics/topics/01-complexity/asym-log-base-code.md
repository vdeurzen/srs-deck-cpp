---
id: complexity-asym-log-base-code
kind: code
version: 1
level: 1
tags: [foundations, complexity, logarithms]
requires:
  - complexity-asym-log-rules
  - complexity-asym-big-o-definition
input: chips
choices:
  c1: ["5", "8", "28", "4"]
compile:
  harness: |
    static_assert(2 * levels(1024, 4) == factor * levels(1024, 32));
    static_assert(2 * levels(1L << 20, 4) == factor * levels(1L << 20, 32));
    static_assert(2 * levels(1L << 40, 4) == factor * levels(1L << 40, 32));
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Logarithm#Change_of_base
---

`levels(n, b)` counts how often n can be divided by b before dropping
below b: ⌊log_b n⌋, the depth of a tree with fan-out b over n leaves.
For n any power of 1024, complete the factor in
2 · levels(n, 4) = factor · levels(n, 32).

```cpp
constexpr int levels(long n, int b) {
  int k = 0;
  while (n >= b) { n /= b; ++k; }
  return k;
}
constexpr int factor = {{c1::5}};
```

---

log₄ n = log₄ 32 · log₃₂ n, and log₄ 32 = 5/2 (32 = 4^2.5, since
4⁵ = 32² = 1024): five fan-out-4 levels do the work of two fan-out-32
levels. The ratio is a constant, which is exactly what big-O's c absorbs,
so both depths are O(log n). The constant is real all the same: 2.5×
fewer levels is why on-disk trees use wide nodes. `28` is 32 − 4; `8` is
32/4; neither is a log.
