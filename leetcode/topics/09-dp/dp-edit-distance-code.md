---
id: dp-edit-distance-code
kind: code
version: 1
level: 3
tags: [dynamic-programming, strings, edit-distance, lc-72]
input: chips
choices:
  c1: ["d[i - 1][j - 1]", "d[i - 1][j - 1] + 1", "std::max(d[i - 1][j], d[i][j - 1])"]
compile:
  harness: |
    static_assert(min_distance("horse", "ros") == 3);              // LC 72, example 1
    static_assert(min_distance("intention", "execution") == 5);    // LC 72, example 2
    static_assert(min_distance("abc", "xbz") == 2);
    static_assert(min_distance("kitten", "sitting") == 3);
    static_assert(min_distance("", "ab") == 2);
    static_assert(min_distance("ab", "") == 2);
    int main() {}
requires:
  - algo-basics/technique-lcs-match
refs:
  - https://leetcode.com/problems/edit-distance/
  - https://doi.org/10.1145/321796.321811
elaborate: LC 1143 (LCS) and LC 712 (minimum ASCII delete sum) fill the same table. What does each change in the mismatch line?
---

LC 72: the fewest single-character inserts, deletes and replaces that
turn `a` into `b`. `d[i][j]` is that number for the first `i` characters
of `a` and the first `j` of `b`. Complete the third option in the
mismatch case.

```cpp
#include <bits/stdc++.h>
constexpr int min_distance(std::string_view a, std::string_view b) {
  std::vector d(a.size() + 1, std::vector<int>(b.size() + 1));
  for (std::size_t i = 0; i <= a.size(); ++i)
    for (std::size_t j = 0; j <= b.size(); ++j)
      if (i == 0 || j == 0) d[i][j] = i + j;
      else if (a[i - 1] == b[j - 1]) d[i][j] = d[i - 1][j - 1];
      else d[i][j] = 1 + std::min({d[i - 1][j], d[i][j - 1], {{c1::d[i - 1][j - 1]}}});
  return d.back().back();
}
```

---

**The diagonal: replacing `a[i-1]` by `b[j-1]` settles both last characters for one operation.**
Up is delete `a[i-1]`, left is insert `b[j-1]`. Against an empty prefix
the cost is the other's length, `i + j`.

`+ 1` charges a replace twice, as delete plus insert: "horse" → "ros"
gives 4. The `max` is the LCS habit; inside a `min` it never lowers the result, so
replace drops out with the same effect.
