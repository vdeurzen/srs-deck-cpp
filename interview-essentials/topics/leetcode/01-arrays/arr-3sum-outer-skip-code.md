---
id: arr-3sum-outer-skip-code
kind: code
version: 1
level: 3
tags: [two-pointers, 3sum, arrays, lc-15]
input: chips
choices:
  c1: ["i > 0 && a[i] == a[i - 1]", "i > 0 && a[i] == a[i + 1]", "i > 0 && a[i] != a[i - 1]", "a[i] == a[i + 1]"]
compile:
  harness: |
    constexpr void two_ptr(const std::vector<int>& a, int i, VV& out) {
      for (int lo = i + 1, hi = int(a.size()) - 1; lo < hi;) {
        int s = a[i] + a[lo] + a[hi];
        if (s < 0) ++lo;
        else if (s > 0) --hi;
        else {
          out.push_back({a[i], a[lo++], a[hi--]});
          while (lo < hi && a[lo] == a[lo - 1]) ++lo;
        }
      }
    }
    constexpr bool examples() {   // GCC 14 needs nested braced vectors inside a function
      return three_sum({-1, 0, 1, 2, -1, -4}, two_ptr) == VV{{-1, -1, 2}, {-1, 0, 1}}
          && three_sum({0, 1, 1}, two_ptr) == VV{}
          && three_sum({0, 0, 0, 0}, two_ptr) == VV{{0, 0, 0}}
          && three_sum({-2, 0, 0, 2, 2}, two_ptr) == VV{{-2, 0, 2}};
    }
    static_assert(examples());
    int main() {}
requires:
  - arr-3sum-frame-parsons
  - cpp-essentials/tmpl-auto-param-cloze
  - cpp-essentials/vector-of-vectors
refs:
  - https://leetcode.com/problems/3sum/
  - https://leetcode.com/problems/subsets-ii/
  - https://en.wikipedia.org/wiki/3SUM
elaborate: Subsets II (LC 90) lists every subset of an array with duplicates, no subset twice. Its backtracking loop, choosing from index `i` on, skips a repeat only when `j > i`, not `j > 0`. Why is `i > 0` right here?
---

3Sum (LC 15): return all triplets that sum to 0, without duplicate
triplets.
`pairs(a, i, out)` runs the two-pointer scan right of `i` (its code is
hidden here) and appends each distinct `{a[i], a[lo], a[hi]}` once;
`using VV = ...;` gives that type a second name `VV`. Complete the test
that skips an `i`.

```cpp
#include <bits/stdc++.h>
using VV = std::vector<std::vector<int>>;
constexpr VV three_sum(std::vector<int> a, auto pairs) {
  std::ranges::sort(a);  VV out;
  for (std::size_t i = 0; i + 2 < a.size(); ++i) {
    if ({{c1::i > 0 && a[i] == a[i - 1]}}) continue;
    pairs(a, i, out);
  }
  return out;
}
```

---

**Skip `a[i]` when it equals the previous fixed value: its scan already found every triplet starting with it.**
The first of a run of equal values is kept and scans the widest range.

`a[i] == a[i + 1]` skips the *first* of the run instead, with or
without `i > 0`, so the triplet that needs both copies is lost:
`{-1, -1, 2}` goes missing. `!=` skips every new value and keeps only
the repeats.
