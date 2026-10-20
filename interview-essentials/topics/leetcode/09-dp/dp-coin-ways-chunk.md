---
id: dp-coin-ways-chunk
kind: chunk
version: 1
level: 3
tags: [dynamic-programming, knapsack, coin-change, lc-518]
expose_ms: 11000
compile: null # a function body
requires:
  - technique-knapsack-direction
  - cpp-essentials/types-overflow-rules
refs:
  - https://leetcode.com/problems/coin-change-ii/
  - https://leetcode.com/problems/unique-paths/
  - https://en.wikipedia.org/wiki/Change-making_problem
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
elaborate: Unique Paths (LC 62), counting the right-and-down paths across an `m × n` grid, fits in one rolling row with the same `x[j] += x[j - step]` line. What is the step there, and what plays the role of a coin?
---

```cpp
std::vector<unsigned> dp(amount + 1);
dp[0] = 1;
for (int c : coins)
  for (int a = c; a <= amount; ++a)
    dp[a] += dp[a - c];
return dp[amount];
```

---

**Unbounded knapsack, counting combinations**: Coin Change II (LC 518),
the ways to make `amount` from reusable `coins`. Coins outer:
each multiset is built once. `a` upwards: `dp[a - c]` may already use `c`.

`unsigned`: coins {2, 4, …, 20} with amount 4999 answer 0, yet cells
pass 10¹⁸. Unsigned wraps where `int` overflow is UB; the answer stays
exact.
