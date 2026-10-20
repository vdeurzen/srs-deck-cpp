---
id: arr-explain-kadane
kind: explain
version: 1
level: 3
tags: [arrays, recognition, lc-53]
requires:
  - arr-kadane-chunk
  - arr-kadane-signal
  - linear-sliding-window-sum
refs:
  - https://leetcode.com/problems/maximum-subarray/
  - https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
  - https://doi.org/10.1145/358234.381162
elaborate: Which running statistic in your own code (a peak load, a longest streak) is really "the best run ending here, or start over"?
---
An interviewer asks how you recognise, from the statement, a problem
that a single pass keeping two running values can solve, and how you
would explain that pass. Answer aloud.
---
- [ ] Cue: the largest sum of a contiguous run of any length, with negative values allowed
- [ ] Pattern: the best sum ending here either extends the previous best or restarts at this element
- [ ] Example: Maximum Subarray, the largest sum of a non-empty contiguous subarray
- [ ] Cost: O(n) time in one pass, O(1) extra space
- [ ] Look-alike: the largest sum of exactly k consecutive elements is a fixed-size sliding window instead
