---
id: technique-coin-change-table
kind: code
version: 1
level: 2
tags: [dynamic-programming]
requires:
  - technique-dp-state
  - technique-memo-vs-table
input: chips
choices:
  c1: ["dp[a - c] + 1", "dp[a - c]", "dp[a] + 1", "dp[c] + 1"]
compile:
  harness: |
    static_assert(min_coins(std::array{1, 3, 4}, 6) == 2);
    static_assert(min_coins(std::array{25, 10, 5, 1}, 63) == 6);
    static_assert(min_coins(std::array{1, 7, 10}, 14) == 2);
    static_assert(min_coins(std::array{2}, 3) == -1);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Change-making_problem#Dynamic_programming
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
---

`dp[a]` is the fewest coins that sum to `a` (amounts up to 100).
Complete the candidate that ends with coin `c`.

```cpp
#include <algorithm>
#include <array>
template <std::size_t K>
constexpr int min_coins(std::array<int, K> coins, int amount) {
  constexpr int INF = 1'000'000;
  std::array<int, 101> dp{};  // dp[0] = 0
  for (int a = 1; a <= amount; ++a) {
    dp[a] = INF;
    for (int c : coins)
      if (c <= a) dp[a] = std::min(dp[a], {{c1::dp[a - c] + 1}});
  }
  return dp[amount] >= INF ? -1 : dp[amount];
}
```

---

Last coin `c`, plus the best way to pay the rest: `dp[a − c] + 1`. The
loop runs `a` upwards because every `a − c` is smaller. Cost is
amount × coins, and unlike greedy it gets {1, 3, 4} → 6 right (3 + 3)
and reports −1 when no combination exists.
