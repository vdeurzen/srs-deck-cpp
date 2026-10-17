---
id: dp-coin-ways-trace
kind: trace
version: 1
level: 3
tags: [dynamic-programming, coin-change, tracing, lc-518]
probes:
  1: { dp: "1 1 2 2 3 3" }
  2: { dp: "1 1 2 2 3 4" }
requires:
  - interview-essentials/dp-coin-ways-chunk
refs:
  - https://leetcode.com/problems/coin-change-ii/
  - https://en.wikipedia.org/wiki/Change-making_problem
---

Coin Change II (LC 518): count the combinations of `coins` that make
`amount`, each coin reusable. Here `coins = {1, 2, 5}`, `amount = 5`,
one coin per call. Write
`dp` as its six values, `dp[0]` first, separated by spaces.

```cpp
std::vector<unsigned> dp(6);

void add_coin(int c) {
  for (int a = c; a <= 5; ++a) dp[a] += dp[a - c];
}

int main() {
  dp[0] = 1;
  add_coin(1);
  add_coin(2);   // @1
  add_coin(5);   // @2
}
```

---

**After each pass, `dp[a]` counts the payments of `a` using only the
coins added so far.** With 1s only there is one way to pay anything.
Adding 2 gives `dp[4] = 3`: 1+1+1+1, 1+1+2, 2+2. Adding 5 changes
only `dp[5]`: the payment 5 itself joins 1+1+1+1+1, 1+1+1+2 and 1+2+2.

These values follow from C++'s rules for this code; a compiled run on
two compilers agreed.
