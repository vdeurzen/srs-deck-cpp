---
id: linear-prefix-sum-code
kind: code
version: 1
level: 2
tags: [prefix-sums, arrays]
requires:
  - linear-prefix-sum-range
input: chips
choices:
  c1: ["p[r] - p[l]", "p[r] - p[l - 1]", "p[r + 1] - p[l]", "p[r - 1] - p[l]"]
compile:
  harness: |
    constexpr Prefix<6> pre({2, 7, 1, 8, 2, 8});
    static_assert(pre.sum(0, 6) == 28);
    static_assert(pre.sum(1, 3) == 8);    // 7 + 1
    static_assert(pre.sum(3, 4) == 8);
    static_assert(pre.sum(2, 2) == 0);    // empty range
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Prefix_sum
  - https://en.cppreference.com/w/cpp/algorithm/partial_sum
---

Build prefix sums once, then answer the sum of the half-open range
`a[l..r)` in O(1).

```cpp
#include <array>

template <int N> struct Prefix {
  std::array<int, N + 1> p{};           // p[i] = a[0] + ... + a[i-1]
  constexpr Prefix(std::array<int, N> a) {
    for (int i = 0; i < N; ++i) p[i + 1] = p[i] + a[i];
  }
  constexpr int sum(int l, int r) const { return {{c1::p[r] - p[l]}}; }
};
```

---

**`p[r]` covers `a[0..r)`, `p[l]` covers `a[0..l)`; the difference is
`a[l..r)`.** With half-open ranges and the leading zero there are no ±1
corrections, and the empty range `l == r` gives 0 by itself.

`p[l - 1]` is the inclusive-index habit: it reads `p[-1]` when `l == 0`.
