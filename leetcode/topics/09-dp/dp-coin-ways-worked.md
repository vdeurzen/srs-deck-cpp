---
id: dp-coin-ways-worked
kind: basic
version: 1
level: 3
tags: [dynamic-programming, coin-change, lc-518, worked-example]
requires:
  - interview-essentials/dp-coin-ways-chunk
refs:
  - https://leetcode.com/problems/coin-change-ii/
---

Coin Change II: count the combinations of reusable coins that make an
amount. `dp[a]` counts the ways to pay `a`; it starts as `1 0 0 0 0`
(one way to pay 0). Adding coin 2 runs `a` upwards from 2:

```
a  dp[a] += dp[a − 2]   dp[0..4] after
2  0 + dp[0] = 1        1 0 1 0 0
3  0 + dp[1] = 0        1 0 1 0 0
4  0 + dp[2] = 1        1 0 1 0 1
```

## Row a = 4: `dp[2]` was written earlier in this same pass. Why is reading it right?

---

**`dp[2]` already uses a 2, so 4 = 2 + 2 reuses the coin.**

Going upwards, a pass reads cells it has already updated, which is
exactly reuse. Running `a` downwards would read the old `dp[2] = 0`
and leave `dp[4]` at 0: each coin at most once.
