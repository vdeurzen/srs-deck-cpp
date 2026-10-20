---
id: technique-coin-change-trace
kind: trace
version: 1
level: 3
tags: [dynamic-programming, tracing]
probes:
  1: { "dp[6]": "3" }
  2: { "dp[6]": "2" }
  3: { "dp[6]": "2" }
requires:
  - technique-coin-change-worked
  - technique-dp-optimal-substructure
  - stl-min-max
  - stl-array-brace-zero
elaborate: Say aloud, as to an interviewer, which earlier cells one new cell reads, and why they must already be final.
refs:
  - https://en.wikipedia.org/wiki/Change-making_problem#Dynamic_programming
---

Coins {1, 3, 4}. `dp[a]` is the fewest coins that pay `a`; cells 0 to 5
are already filled. These lines fill cell 6, one candidate per last
coin. Each probe reads `dp[6]` after its line.

```cpp
int dp[7] = {0, 1, 2, 1, 1, 2};            // amounts 0 to 5 done
dp[6] = 7;                                  // more coins than any answer
dp[6] = std::min(dp[6], dp[6 - 1] + 1);     // @1 last coin 1
dp[6] = std::min(dp[6], dp[6 - 3] + 1);     // @2 last coin 3
dp[6] = std::min(dp[6], dp[6 - 4] + 1);     // @3 last coin 4
```

---

Last coin 1 reads the best for 5 (2 coins) and gives 3. Last coin 3
reads the best for 3 (one coin) and gives **2**: 3 + 3. Last coin 4
reads the best for 2 (2 coins), 3 again, so the minimum stays 2. Taking
the 4 first, 4 + 1 + 1, would have used three.

(Values from running it under GCC 16.2.)
