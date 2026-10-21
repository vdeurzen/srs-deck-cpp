---
id: dp-interval-order-code
kind: code
version: 1
level: 4
tags: [dynamic-programming, interval-dp, lc-312, lc-516]
input: chips
choices:
  c1:
    - "int l = n - 1; l >= 0; --l"
    - "int l = 0; l < n; ++l"
    - "int l = n - 1; l > 0; --l"
compile:
  harness: |
    static_assert(max_coins({1, 3, 1, 5, 8, 1}) == 167);   // LC 312, example 1
    static_assert(max_coins({1, 1, 5, 1}) == 10);          // LC 312, example 2
    static_assert(max_coins({1, 7, 1}) == 7);
    static_assert(max_coins({1, 2, 3, 1}) == 9);
    int main() {}
requires:
  - dp-interval-last-burst
  - interview-essentials/technique-memo-vs-table
refs:
  - https://leetcode.com/problems/burst-balloons/
  - https://leetcode.com/problems/longest-palindromic-subsequence/
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §14.2 (matrix-chain multiplication)
elaborate: Many solutions loop over the interval length first instead. Why is that order valid too?
---

Burst Balloons (LC 312): bursting balloon `i` scores
`nums[i - 1] * nums[i] * nums[i + 1]`, then its neighbours become
adjacent; return the most coins. `a` is `nums` padded with a 1 at each
end; `dp[l][r]` is the best score strictly between `l` and `r`.
Complete the outer loop header.

```cpp
#include <bits/stdc++.h>
constexpr int max_coins(const std::vector<int>& a) {
  int n = a.size();
  std::vector dp(n, std::vector<int>(n));
  for ({{c1::int l = n - 1; l >= 0; --l}})
    for (int r = l + 2; r < n; ++r)
      for (int k = l + 1; k < r; ++k)
        dp[l][r] = std::max(dp[l][r], dp[l][k] + a[l] * a[k] * a[r] + dp[k][r]);
  return dp[0][n - 1];
}
```

---

**`l` downwards: `dp[k][r]` has `k > l`, so its row must already be done.**
`dp[l][k]` is in the current row, left of `r`, and `r` runs upwards.

`l` upwards reads `dp[k][r]` rows that are still 0: `nums = {3, 1, 5, 8}`
gives 63, not 167. Stopping at `l > 0` never fills `dp[0][n − 1]`, the
answer. Longest Palindromic Subsequence (LC 516) uses the same downward `l`.
