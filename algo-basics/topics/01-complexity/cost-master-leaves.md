---
id: complexity-cost-master-leaves
kind: code
version: 1
level: 2
tags: [foundations, complexity, recurrences, divide-and-conquer]
requires:
  - complexity-cost-recursion-tree
input: chips
choices:
  c1: ["n * n", "4 * n", "2 * n", "n * n * n"]
compile:
  harness: |
    static_assert(leaves(1) == closed(1));
    static_assert(leaves(16) == closed(16));
    static_assert(leaves(1024) == closed(1024));
    int main() {}
refs:
  - https://dl.acm.org/doi/10.1145/1008861.1008865
  - https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)
---

`T(n) = 4T(n/2) + n`: four half-size calls, then n work to combine.
`leaves` counts the calls at the bottom of its recursion tree. Complete
the closed form for n a power of two.

```cpp
constexpr long leaves(long n) { return n <= 1 ? 1 : 4 * leaves(n / 2); }
constexpr long closed(long n) { return {{c1::n * n}}; }
```

---

Calls quadruple per level and there are log₂ n levels, so
4^(log₂ n) = (2^(log₂ n))² = **n²** leaves: 256 for n = 16. Level k does
4ᵏ · n/2ᵏ = 2ᵏ·n, doubling every level, so the leaves' n² beats the
root's n and T(n) grows like n². `4n` is one level's calls, not the
bottom's; `n³` would need eight children per call.
