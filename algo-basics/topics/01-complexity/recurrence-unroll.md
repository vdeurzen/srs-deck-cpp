---
id: complexity-recurrence-unroll
kind: code
version: 1
level: 2
tags: [complexity, recurrences]
requires:
  - complexity-recursion-tree-calls
input: chips
choices:
  c1: ["n * lg", "n * n", "2 * n", "n + lg"]
compile:
  harness: |
    static_assert(T(2) == closed(2, 1));
    static_assert(T(8) == closed(8, 3));
    static_assert(T(1024) == closed(1024, 10));
    int main() {}
refs:
  - https://dl.acm.org/doi/10.1145/1008861.1008865
  - https://en.wikipedia.org/wiki/Merge_sort#Analysis
---

`T` is merge sort's recurrence: two halves, plus n to merge. Complete its
closed form for powers of two, where `lg` is log₂ n.

```cpp
constexpr long T(long n) { return n <= 1 ? 0 : 2 * T(n / 2) + n; }
constexpr long closed(long n, long lg) { return {{c1::n * lg}}; }
```

---

Unroll it as a tree. Level 0 is one call doing n; level 1 is two calls
doing n/2 each, n again; every level costs n in total. Halving reaches
size 1 after log₂ n levels, so T(n) = n·log₂ n: 2, 24, 10 240. The
recipe works for any recurrence: **cost per level × number of levels**.
