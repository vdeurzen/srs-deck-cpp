---
id: dp-lis-patience-parsons
kind: parsons
version: 1
level: 3
tags: [dynamic-programming, binary-search, lis, lc-300]
distractors:
  - "    auto it = std::ranges::upper_bound(t, x);"
compile:
  harness: |
    static_assert(lis({10, 9, 2, 5, 3, 7, 101, 18}) == 4);   // LC 300, example 1
    static_assert(lis({0, 1, 0, 3, 2, 3}) == 4);             // LC 300, example 2
    static_assert(lis({7, 7, 7, 7}) == 1);                   // strictly increasing
    static_assert(lis({3, 4, 1}) == 2);
    static_assert(lis({5, 1, 6, 2, 7, 3, 8}) == 4);
    static_assert(lis({}) == 0);
    int main() {}
requires:
  - dp-lis-tails-trace
  - stl-const-auto-param
refs:
  - https://leetcode.com/problems/longest-increasing-subsequence/
  - https://cp-algorithms.com/sequences/longest_increasing_subsequence.html
  - https://en.cppreference.com/w/cpp/algorithm/ranges/lower_bound
elaborate: For a longest non-decreasing subsequence, which line changes, and what would {7, 7, 7} give then?
---

Longest Increasing Subsequence (LC 300): the length of the longest
strictly increasing subsequence of `nums`, here in O(n log n) with a
sorted list of tails `t`. `std::ranges::lower_bound(t, x)` is
`std::lower_bound` over all of `t`. Order the lines.

```cpp
#include <bits/stdc++.h>
constexpr int lis(const std::vector<int>& a) {
  std::vector<int> t;
  for (int x : a) {
    auto it = std::ranges::lower_bound(t, x);
    if (it == t.end()) t.push_back(x); else *it = x;
  }
  return t.size();
}
```

---

**Patience sorting.** Not the O(n²) DP's state ("LIS length ending at
`a[i]`") but a greedy structure: `t[k]`, the least tail of any
increasing subsequence of length k + 1, kept sorted. Each `x` binary-searches for the first tail ≥ x. If
there is none, `x` extends the longest one; otherwise `x` replaces that
tail, since a smaller end is easier to extend later. The answer is
`t.size()`.

`lower_bound` makes it *strictly* increasing: an equal `x` replaces its
twin. The distractor `upper_bound` lets {7, 7, 7, 7} count 4. `t` is
not itself a subsequence ({3, 4, 1} ends with t = {1, 4}); only its
length is the answer. `<bits/stdc++.h>` is what LeetCode's judge
includes; in real code include `<algorithm>` and `<vector>`.
