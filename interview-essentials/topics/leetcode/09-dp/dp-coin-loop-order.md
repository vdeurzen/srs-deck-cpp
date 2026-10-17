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
  - https://leetcode.com/problems/climbing-stairs/
  - https://en.wikipedia.org/wiki/Change-making_problem
elaborate: Combination Sum IV (LC 377) counts the ordered sequences of distinct `nums` that sum to `target`. Which nesting does it want, and why does Climbing Stairs (LC 70, the ways to climb `n` steps taking 1 or 2 at a time) have the same shape?
---

Coin Change II (LC 518): count the combinations of `coins` that make
`amount`, each coin usable any number of times. The usual table runs
coins outer, amounts inner, from `dp[0] = 1`. A candidate swaps the
loops: both versions visit every (coin, amount) pair once.

```cpp
for (int a = 1; a <= amount; ++a)
  for (int c : coins)
    if (c <= a) dp[a] += dp[a - c];
```

## What does it return for `coins = {1, 2}`, `amount = 3`?

---

**3, not 2: it counts 1+2 and 2+1 as different payments.**

With amounts outer, `dp[a]` sums over *any* last coin, so every order of
a multiset is counted: permutations. With coins outer, coins
enter in a fixed order and each multiset is built once.
