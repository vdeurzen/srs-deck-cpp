---
id: complexity-cost-geometric-sum
kind: code
version: 1
level: 1
tags: [foundations, complexity, sums]
input: chips
choices:
  c1: ["2 * last - 1", "last * last", "last + 1", "last * last / 2"]
compile:
  harness: |
    static_assert(sum_doublings(1) == closed(1));
    static_assert(sum_doublings(8) == closed(8));
    static_assert(sum_doublings(1024) == closed(1024));
    int main() {}
requires:
  - cpp-essentials/constexpr-fn-static-assert
  - complexity-geometric-sum-intro
elaborate: "Where else does a halving or doubling series hide inside code that looks as if it should cost more, and what does it really cost?"
refs:
  - https://en.wikipedia.org/wiki/Geometric_series#Sum
---

`sum_doublings(last)` adds 1 + 2 + 4 + … + last, where `last` is a power
of two. Complete the closed form that needs no loop.

```cpp
constexpr long sum_doublings(long last) {
  long s = 0;
  for (long p = 1; p <= last; p *= 2) s += p;
  return s;
}
constexpr long closed(long last) { return {{c1::2 * last - 1}}; }
```

---

**A doubling series is less than twice its last term.** In binary,
1 + 2 + 4 + 8 = 1111₂ = 10000₂ − 1 = 2 · 8 − 1 = 15. Whenever the
terms grow (or, read backwards, shrink) by a constant factor, the biggest
term dominates and the whole sum is a constant times it. This is why
"n + n/2 + n/4 + …" is simply linear in n.
