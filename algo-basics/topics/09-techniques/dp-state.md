---
id: technique-dp-state
kind: code
version: 1
level: 2
tags: [dynamic-programming]
requires:
  - technique-dp-optimal-substructure
input: chips
choices:
  c1: ["dp[i - 1] + dp[i - 2]", "2 * dp[i - 1]", "dp[i - 1] + 2", "dp[i - 2] + 1"]
compile:
  harness: |
    static_assert(ways(1) == 1);
    static_assert(ways(2) == 2);   // 1+1, 2
    static_assert(ways(3) == 3);   // 1+1+1, 1+2, 2+1
    static_assert(ways(10) == 89);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Dynamic_programming
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
---

A DP starts by saying in words what one cell means. Here: `dp[i]` is the
number of ways to climb to step `i`, taking 1 or 2 steps at a time.
Complete the recurrence that follows from it.

```cpp
#include <array>
constexpr long ways(int n) {
  std::array<long, 64> dp{};
  dp[0] = 1; dp[1] = 1;          // stand still; one single step
  for (int i = 2; i <= n; ++i)
    dp[i] = {{c1::dp[i - 1] + dp[i - 2]}};
  return dp[n];
}
```

---

Ask "what was the **last** move?" A climb to step i ends with a 1-step
from i − 1 or a 2-step from i − 2, and those two sets never overlap, so
add them. With the state named, the recurrence is a case split on the
last decision; without it, you guess formulas. `2 * dp[i - 1]` counts
1+2 and 2+1 as if every step could be both.
