---
id: technique-lcs-match
kind: code
version: 1
level: 3
tags: [dynamic-programming, strings]
requires:
  - technique-lcs-worked
  - technique-coin-change-table
  - cpp-essentials/strings-string-view-parameter
  - cpp-essentials/vector-of-vectors
elaborate: Say aloud how you would recover the subsequence itself, not just its length, from the filled table.
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

A subsequence keeps characters in order, not necessarily adjacent.
`dp[i][j]` is the length of the
longest common subsequence of the first `i` characters of `a` and the
first `j` of `b` (`std::size_t` is the unsigned type `size()` returns).
Complete the match case.

```cpp
#include <algorithm>
#include <string_view>
#include <vector>
constexpr int lcs(std::string_view a, std::string_view b) {
  std::vector<std::vector<int>> dp(a.size() + 1, std::vector<int>(b.size() + 1));
  for (std::size_t i = 1; i <= a.size(); ++i)
    for (std::size_t j = 1; j <= b.size(); ++j)
      if (a[i - 1] == b[j - 1]) dp[i][j] = {{c1::dp[i - 1][j - 1] + 1}};
      else dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);
  return dp[a.size()][b.size()];
}
```

---

A matching last character belongs to the subsequence once, so **both**
strings drop it: diagonal + 1. Dropping it from only one side lets
one character pair with several: `dp[i − 1][j] + 1` scores "AAAA" vs
"AA" as 4, `dp[i][j − 1] + 1` scores "AA" vs "AAAA" as 4. Adding 1 to the
`max` overcounts "ABCBDAB" vs "BDCABA". The table has one cell per pair of prefix lengths,
each reading only up, left and the diagonal.
