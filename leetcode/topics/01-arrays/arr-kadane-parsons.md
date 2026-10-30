---
id: arr-kadane-parsons
kind: parsons
version: 1
level: 2
tags: [kadane, dynamic-programming, arrays, lc-53]
distractors:
  - "    cur = std::max(0, cur + x);"
compile:
  harness: |
    static_assert(max_sub_array({-2, 1, -3, 4, -1, 2, 1, -5, 4}) == 6);   // LC 53, example 1
    static_assert(max_sub_array({1}) == 1);                                // LC 53, example 2
    static_assert(max_sub_array({5, 4, -1, 7, 8}) == 23);                  // LC 53, example 3
    static_assert(max_sub_array({-3, -1, -2}) == -1);
    static_assert(max_sub_array({2, -1, 2}) == 3);
    int main() {}
requires:
  - interview-essentials/arr-kadane-chunk
refs:
  - https://leetcode.com/problems/maximum-subarray/
  - https://leetcode.com/problems/maximum-sum-circular-subarray/
  - https://en.wikipedia.org/wiki/Maximum_subarray_problem
elaborate: Maximum Sum Circular Subarray (LC 918), the same question when a subarray may wrap from the end of `nums` to its start, adds a second pass. Which running value does it track, and when is that answer wrong?
---

Maximum Subarray (LC 53): the largest sum of a non-empty contiguous
subarray. `cur` is the best sum of a subarray ending at `x`. Order the
lines.

```cpp
#include <bits/stdc++.h>
constexpr int max_sub_array(const std::vector<int>& nums) {
  int cur = 0, best = nums[0];
  for (int x : nums) {
    cur = std::max(x, cur + x);
    best = std::max(best, cur);
  }
  return best;
}
```

---

**Kadane: extend or restart at `x`, then record.** `cur` must be updated
before `best` reads it, or the last element's subarray is never seen.

The line `cur = std::max(0, cur + x);` floors `cur` at 0, which allows
the empty subarray: `{-3, -1, -2}` then returns 0 instead of −1.
`best = nums[0]` is safe here because Maximum Subarray guarantees
`nums` is non-empty.
