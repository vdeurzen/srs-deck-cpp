---
id: arr-kadane-chunk
kind: chunk
version: 1
level: 2
tags: [kadane, dynamic-programming, arrays, lc-53]
expose_ms: 6000
compile: null # a function body: graded by text, see below
requires:
  - technique-max-invariant-code
refs:
  - https://leetcode.com/problems/maximum-subarray/
  - https://leetcode.com/problems/maximum-product-subarray/
  - https://en.wikipedia.org/wiki/Maximum_subarray_problem
elaborate: Maximum Product Subarray (LC 152), the largest product of a contiguous subarray, breaks this. Which second running value must you keep, and why?
---

```cpp
int cur = 0, best = INT_MIN;
for (int x : nums) {
  cur = std::max(x, cur + x);
  best = std::max(best, cur);
}
return best;
```

---

**Kadane's algorithm** (Maximum Subarray, LC 53: the largest sum of a
non-empty contiguous subarray). `cur` is the best sum
of a subarray *ending at* `x`: either extend the previous one or start
fresh at `x`, whichever is larger. `best` is the largest `cur` seen.
One pass, O(1) space.

Start fresh exactly when the running sum before `x` is negative: it can
only drag `x` down.

Graded by text (`compile: null`); body of `int maxSubArray(std::vector<int>& nums)`.
The diff is the judge: an equivalent rewrite is marked different, so
compare it line by line and rate yourself.
