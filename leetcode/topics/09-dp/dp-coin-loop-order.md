---
id: dp-coin-loop-order
kind: basic
version: 1
level: 3
tags: [dynamic-programming, coin-change, misconception, lc-518, lc-377]
requires:
  - dp-coin-ways-chunk
refs:
  - https://leetcode.com/problems/coin-change-ii/
  - https://leetcode.com/problems/combination-sum-iv/
  - https://en.wikipedia.org/wiki/Change-making_problem
elaborate: LC 377 (Combination Sum IV) counts ordered sequences. Which nesting does it want, and why does LC 70 (climbing stairs) have the same shape?
---

For LC 518 (ways to pay `amount`, each coin reusable), a candidate nests
the loops the other way round (`dp[0] = 1` as in the chunk): both
versions visit every (coin, amount) pair once.

```cpp
for (int a = 1; a <= amount; ++a)
  for (int c : coins)
    if (c <= a) dp[a] += dp[a - c];
```

## What does it return for `coins = {1, 2}`, `amount = 3`?

---

**3, not 2: it counts 1+2 and 2+1 as different payments.**

With amounts outer, `dp[a]` sums over *any* last coin, so every order of
a multiset is counted: permutations (LC 377). With coins outer, coins
enter in a fixed order and each multiset is built once.
