---
id: dp-memo-robber-code
kind: code
version: 1
level: 3
tags: [dynamic-programming, memoisation, lc-198]
input: chips
choices:
  c1: ["memo[i] != -1", "memo[i] > 0", "memo[i] != 0", "memo[i] == -1"]
compile:
  harness: |
    constexpr bool rob(std::vector<int> houses, int loot, int calls) {
      std::vector<int> memo(houses.size(), -1);
      int n = 0;
      return best(houses, memo, int(houses.size()) - 1, n) == loot && n == calls;
    }
    static_assert(rob({1, 2, 3, 1}, 4, 9));                       // LC 198, example 1
    static_assert(rob({2, 7, 9, 3, 1}, 12, 11));                  // LC 198, example 2
    static_assert(rob({0, 0, 0, 0, 0, 0, 0, 0, 0, 0}, 0, 21));    // 2n + 1 calls
    int main() {}
requires:
  - technique-dp-overlapping-subproblems
  - stl-min-max
  - stl-const-auto-param
refs:
  - https://leetcode.com/problems/house-robber/
  - https://leetcode.com/problems/climbing-stairs/
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
elaborate: Which line would you change to make this the bottom-up table, and in which direction must its loop over `i` run?
---

House Robber (LC 198): the most money you can take from a row of
houses `v` without robbing two adjacent ones. `best(v, memo, i, calls)`
is the most from houses `0..i`; `memo` starts all -1, and `calls`
counts every call. Complete the check that reuses a solved subproblem.

```cpp
#include <algorithm>
#include <vector>
constexpr int best(std::vector<int>& v, std::vector<int>& memo, int i, int& calls) {
  ++calls;
  if (i < 0) return 0;
  if ({{c1::memo[i] != -1}}) return memo[i];
  memo[i] = std::max(v[i] + best(v, memo, i - 2, calls), best(v, memo, i - 1, calls));
  return memo[i];
}
```

---

**`memo[i] != -1`: the sentinel must be a value no real answer can take.**
Each `i` is then solved once: 2n + 1 calls instead of exponentially
many (61 against 4.4 million for 30 houses).

`memo[i] > 0` is the zero-sentinel habit: the answers stay right, but
a subproblem worth 0 is never reused, so ten empty houses cost 287
calls, not 21. `!= 0` and `== -1` return the unsolved -1 as an answer.
