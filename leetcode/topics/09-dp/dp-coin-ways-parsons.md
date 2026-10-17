---
id: dp-coin-ways-parsons
kind: parsons
version: 1
level: 3
tags: [dynamic-programming, knapsack, coin-change, lc-518]
distractors:
  - "    for (int a = 1; a <= amount; ++a)"
compile:
  harness: |
    static_assert(change(5, {1, 2, 5}) == 4);    // LC 518, example 1
    static_assert(change(3, {2}) == 0);          // LC 518, example 2
    static_assert(change(10, {10}) == 1);        // LC 518, example 3
    static_assert(change(0, {7}) == 1);
    static_assert(change(3, {1, 2}) == 2);
    static_assert(change(4, {1, 2, 3}) == 4);
    int main() {}
requires:
  - interview-essentials/dp-coin-ways-chunk
refs:
  - https://leetcode.com/problems/coin-change-ii/
  - https://leetcode.com/problems/combination-sum-iv/
  - https://en.wikipedia.org/wiki/Change-making_problem
elaborate: Combination Sum IV (LC 377) counts the ordered sequences of distinct `nums` that sum to `target` instead. Which two lines trade places, and what changes in the inner loop's start?
---

Coin Change II (LC 518): the number of ways to pay `amount`, each coin usable any number
of times, each combination counted once. Order the lines.

```cpp
#include <vector>
constexpr int change(int amount, const std::vector<int>& coins) {
  std::vector<unsigned> dp(amount + 1);
  dp[0] = 1;
  for (int c : coins)
    for (int a = c; a <= amount; ++a)
      dp[a] += dp[a - c];
  return dp[amount];
}
```

---

**Seed the empty payment, coins outer, amounts upward from `c`.** The
inner loop needs `c`, so it must be inside the coin loop, and `dp[0] = 1`
must come before any pass reads it.

The distractor starts `a` at 1, so `dp[a - c]` indexes below 0 whenever
`a < c`: out of bounds, rejected at compile time here, undefined
behaviour on LeetCode.
