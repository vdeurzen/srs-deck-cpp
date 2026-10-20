---
id: technique-coin-change-table
kind: code
version: 1
level: 2
tags: [dynamic-programming]
requires:
  - technique-coin-change-trace
  - technique-dp-state
  - cpp-essentials/vector-sized-constructor
  - cpp-essentials/iter-range-for-intro
elaborate: Say aloud, as to an interviewer, why this loop must run amounts upwards, and what changes if coins could only be used once.
input: chips
choices:
  c1: ["dp[a - c] + 1", "dp[a - c]", "dp[a] + 1", "dp[c] + 1"]
compile:
  harness: |
    static_assert(min_coins({1, 7, 10}, 14) == 2);
    static_assert(min_coins({5, 2}, 11) == 4);
    static_assert(min_coins({25, 10, 5, 1}, 63) == 6);
    static_assert(min_coins({2}, 3) == 4);    // none: amount + 1
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Change-making_problem#Dynamic_programming
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
---

`dp[a]` is the fewest coins (each value usable any number of times)
that sum to `a`; `amount + 1` means "no way to pay" (`std::min(x, y)`
returns the smaller of the two). Complete the candidate that ends with
coin `c`.

```cpp
#include <algorithm>
#include <vector>
constexpr int min_coins(std::vector<int> coins, int amount) {
  std::vector<int> dp(amount + 1, amount + 1);
  dp[0] = 0;
  for (int a = 1; a <= amount; ++a)
    for (int c : coins)
      if (c <= a) dp[a] = std::min(dp[a], {{c1::dp[a - c] + 1}});
  return dp[amount];
}
```

---

Last coin `c`, plus the best way to pay the rest: `dp[a − c] + 1`. The
loop runs `a` upwards because every `a − c` is smaller. Cost is
amount × coins. It pays 14 from {10, 7, 1} as 7 + 7, where taking the
biggest coin first gives 10 + 1 + 1 + 1 + 1. `dp[a]` alone forgets the
coin; `dp[a] + 1` and `dp[c] + 1` read the wrong amount.
