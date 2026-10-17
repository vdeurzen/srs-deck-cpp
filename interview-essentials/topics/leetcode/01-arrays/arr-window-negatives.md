---
id: arr-window-negatives
kind: basic
version: 1
level: 3
tags: [sliding-window, prefix-sums, misconception, lc-560, lc-209]
requires:
  - arr-window-variable-chunk
refs:
  - https://leetcode.com/problems/subarray-sum-equals-k/
  - https://leetcode.com/problems/minimum-size-subarray-sum/
elaborate: Minimum Size Subarray Sum (LC 209) says "positive integers". Which word in a problem statement would you now check before reaching for a window?
---

Subarray Sum Equals K (LC 560): count the contiguous subarrays of `a`
that sum to `k`. A candidate reuses the shrinking window from Minimum
Size Subarray Sum (LC 209: the shortest subarray with sum ≥ `target`):

```cpp
for (int hi = 0; hi < n; ++hi) {
  sum += a[hi];
  while (sum > k && lo <= hi) sum -= a[lo++];
  if (sum == k) ++count;
}
```

## What does it return for `a = {2, 4, -3}`, `k = 3`?

---

**0, but the answer is 1: `{2, 4, -3}` itself.** At `4` the sum is 6,
so the `2` and then the `4` are both dropped; the `-3` would have brought
it back to 3.

Shrinking is safe only when growing never lowers the sum: no negatives.
Here, use prefix sums and a hash map.

(Run under GCC 16.2.)
