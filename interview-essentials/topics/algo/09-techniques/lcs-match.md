---
id: technique-lcs-match
kind: code
version: 1
level: 3
tags: [dynamic-programming, strings]
requires:
  - technique-coin-change-table
input: chips
choices:
  c1:
    - "dp[i - 1][j - 1] + 1"
    - "dp[i - 1][j] + 1"
    - "dp[i][j - 1] + 1"
    - "std::max(dp[i - 1][j], dp[i][j - 1]) + 1"
compile:
  harness: |
    static_assert(lcs("ABCBDAB", "BDCABA") == 4);
    static_assert(lcs("AAAA", "AA") == 2);
    static_assert(lcs("AA", "AAAA") == 2);
    static_assert(lcs("AB", "BA") == 1);
    static_assert(lcs("ABC", "XYZ") == 0);
    int main() {}
refs:
  - https://doi.org/10.1145/321796.321811
  - https://en.wikipedia.org/wiki/Longest_common_subsequence
---

`dp[i][j]` is the longest common subsequence of the first `i` characters
of `a` and the first `j` of `b`. Complete the case where the last
characters match.

```cpp
#include <algorithm>
#include <string_view>
constexpr int lcs(std::string_view a, std::string_view b) {
  int dp[16][16] = {};
  for (std::size_t i = 1; i <= a.size(); ++i)
    for (std::size_t j = 1; j <= b.size(); ++j)
      dp[i][j] = a[i - 1] == b[j - 1] ? {{c1::dp[i - 1][j - 1] + 1}}
                                      : std::max(dp[i - 1][j], dp[i][j - 1]);
  return dp[a.size()][b.size()];
}
```

---

A matching last character belongs to the subsequence once, so **both**
strings drop it: diagonal + 1. Dropping it from only one side lets
one character pair with several: `dp[i − 1][j] + 1` scores "AAAA" vs
"AA" as 4, `dp[i][j − 1] + 1` scores "AA" vs "AAAA" as 4. Adding 1 to the
`max` overcounts "ABCBDAB" vs "BDCABA". Table size m × n, O(mn) time; each cell
reads only up, left and the diagonal.
