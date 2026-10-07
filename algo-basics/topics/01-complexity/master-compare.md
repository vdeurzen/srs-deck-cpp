---
id: complexity-master-compare
kind: code
version: 1
level: 3
tags: [complexity, recurrences, divide-and-conquer]
requires:
  - complexity-master-theorem
input: chips
choices:
  c1: ["bk < a", "bk > a", "k < a", "a < b"]
compile:
  harness: |
    static_assert(master(1, 2, 0) == Wins::tie);     // binary search: Θ(log n)
    static_assert(master(2, 2, 1) == Wins::tie);     // merge sort: Θ(n log n)
    static_assert(master(3, 2, 1) == Wins::leaves);  // Karatsuba: Θ(n^1.585)
    static_assert(master(8, 2, 2) == Wins::leaves);  // naive recursive matmul: Θ(n³)
    static_assert(master(2, 2, 2) == Wins::root);    // Θ(n²)
    int main() {}
refs:
  - https://dl.acm.org/doi/10.1145/1008861.1008865
  - https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)
---

For `T(n) = a·T(n/b) + nᵏ`, `master` reports which side dominates. It
avoids logarithms by comparing the two growth rates through powers of
`b`. Complete the test for "the leaves dominate".

```cpp
enum class Wins { leaves, tie, root };

constexpr Wins master(long a, long b, int k) {
  long bk = 1;
  for (int i = 0; i < k; ++i) bk *= b;  // bk = b^k
  if ({{c1::bk < a}}) return Wins::leaves;
  if (bk == a) return Wins::tie;
  return Wins::root;
}
```

---

nᵏ against n^(log_b a) is k against log_b a, which is bᵏ against a.
Leaves win when bᵏ < a: the answer is Θ(n^(log_b a)). A tie gives
Θ(nᵏ log n). The root wins when bᵏ > a: Θ(nᵏ), the combine step alone.
