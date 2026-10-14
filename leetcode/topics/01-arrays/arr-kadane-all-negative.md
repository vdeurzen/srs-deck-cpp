---
id: arr-kadane-all-negative
kind: basic
version: 1
level: 2
tags: [kadane, arrays, misconception, lc-53]
requires:
  - arr-kadane-chunk
  - algo-basics/technique-max-start-element-code
refs:
  - https://leetcode.com/problems/maximum-subarray/
  - https://doi.org/10.1145/358234.381162
elaborate: When would allowing the empty subarray be the right answer, for example a best trading window where "don't trade" scores 0?
---

A candidate writes Kadane's algorithm the way many textbooks print it,
resetting at zero:

```cpp
int cur = 0, best = 0;
for (int x : nums) {
  cur = std::max(0, cur + x);
  best = std::max(best, cur);
}
return best;
```

## What does it return for `nums = {-3, -1, -2}`?

---

**0, the empty subarray; LC 53 wants a non-empty one, so the answer is −1.**

Resetting to 0 and starting `best` at 0 both allow "take nothing".
Bentley's 1984 version allows it on purpose. Keep the choice per
element, `max(x, cur + x)`, and start `best` at `INT_MIN` or `nums[0]`.
