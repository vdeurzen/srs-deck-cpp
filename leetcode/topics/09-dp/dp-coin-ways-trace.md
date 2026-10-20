---
id: dp-coin-ways-trace
kind: trace
version: 2
level: 3
tags: [dynamic-programming, coin-change, tracing, lc-518]
probes:
  1: { "dp[3]": "2", "dp[4]": "3" }
requires:
  - dp-coin-ways-worked
  - interview-essentials/dp-coin-ways-chunk
refs:
  - https://leetcode.com/problems/coin-change-ii/
  - https://en.wikipedia.org/wiki/Change-making_problem
elaborate: Where else does one rolling row, filled upwards, count combinations, and what plays the coin there?
---

Coin Change II (LC 518): count the combinations of `coins` that make
`amount`, each coin reusable. Here `coins = {1, 2}`, `amount = 4`.
Coin 1 has been added: there is one way to pay each amount. Now coin 2:

```cpp
std::vector<unsigned> dp{1, 1, 1, 1, 1};   // dp[0..4] after coin 1

void add_coin(int c) {
  for (int a = c; a <= 4; ++a) dp[a] += dp[a - c];
}

int main() {
  add_coin(2);   // @1
}
```

---

**After the pass, `dp[a]` counts the payments of `a` using 1s and 2s.**
`dp[2]` becomes 2 first (1+1, 2). `dp[3]` adds `dp[1]` = 1: 1+1+1 and
1+2. `dp[4]` adds the *updated* `dp[2]` = 2, giving 3: 1+1+1+1, 1+1+2
and 2+2. Reading the old `dp[2]` would miss 2+2.

Values from compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
