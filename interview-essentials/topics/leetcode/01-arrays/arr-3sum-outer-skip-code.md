---
id: arr-3sum-outer-skip-code
kind: code
version: 1
level: 3
tags: [two-pointers, 3sum, arrays, lc-15]
input: chips
choices:
  c1: ["i > 0 && a[i] == a[i - 1]", "a[i] == a[i - 1]", "i > 0 && a[i] == a[i + 1]", "i > 0 && a[i] != a[i - 1]", "a[i] == a[i + 1]"]
compile:
  harness: |
    using VV = std::vector<std::vector<int>>;
    constexpr VV run(std::vector<int> a) {
      VV out;
      auto pairs = [&out](const std::vector<int>& s, std::size_t i) {
        for (std::size_t lo = i + 1, hi = s.size() - 1; lo < hi;) {
          int sum = s[i] + s[lo] + s[hi];
          if (sum < 0) ++lo;
          else if (sum > 0) --hi;
          else {
            out.push_back({s[i], s[lo++], s[hi--]});
            while (lo < hi && s[lo] == s[lo - 1]) ++lo;
          }
        }
      };
      three_sum(a, pairs);
      return out;
    }
    constexpr bool examples() {   // GCC 14 needs nested braced vectors inside a function
      return run({-1, 0, 1, 2, -1, -4}) == VV{{-1, -1, 2}, {-1, 0, 1}}
          && run({0, 1, 1}) == VV{}
          && run({0, 0, 0, 0}) == VV{{0, 0, 0}}
          && run({-2, 0, 0, 2, 2}) == VV{{-2, 0, 2}};
    }
    static_assert(examples());
    int main() {}
requires:
  - arr-3sum-frame-parsons
  - cpp-essentials/tmpl-auto-param-cloze
refs:
  - https://leetcode.com/problems/3sum/
  - https://leetcode.com/problems/subsets-ii/
  - https://en.wikipedia.org/wiki/3SUM
elaborate: Subsets II (LC 90) lists every subset of an array with duplicates, no subset twice. Its backtracking loop, choosing from index `i` on, skips a repeat only when `j > i`, not `j > 0`. Why is `i > 0` right here?
---

3Sum (LC 15): return all triplets that sum to 0, without duplicate
triplets. `pairs(a, i)` (hidden) records every distinct `{a[i], a[lo],
a[hi]}` with `i < lo < hi`. Complete the test that skips an `i`.

```cpp
#include <bits/stdc++.h>
constexpr void three_sum(std::vector<int> a, auto pairs) {
  std::ranges::sort(a);
  for (std::size_t i = 0; i + 2 < a.size(); ++i) {
    if ({{c1::i > 0 && a[i] == a[i - 1]}}) continue;
    pairs(a, i);
  }
}
```

---

**Skip `a[i]` when it equals the previous fixed value: its scan already found every triplet starting with it.**
The first of a run of equal values is kept and scans the widest range.

Without `i > 0`, `i = 0` reads `a[-1]`, out of range. `a[i] == a[i + 1]`
skips the *first* of the run instead, with or without `i > 0`, so the
triplet that needs both copies is lost: `{-1, -1, 2}` goes missing.
`!=` skips every new value and keeps only the repeats.
