---
id: arr-explain-kadane
kind: explain
version: 2
level: 3
tags: [arrays, recognition, lc-53]
requires:
  - arr-max-subarray-signal
  - arr-kadane-chunk
  - arr-kadane-signal
  - linear-sliding-window-sum
refs:
  - https://leetcode.com/problems/maximum-subarray/
  - https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
  - https://doi.org/10.1145/358234.381162
elaborate: Which running statistic in your own code (a peak load, a longest streak) is really "the best run ending here, or start over"?
---
An interviewer asks when you would reach for Kadane's algorithm and
why it works. Answer aloud.
---
- [ ] Cue: the largest sum of a contiguous run of any length, with negative values allowed
- [ ] Pattern: the best sum ending here either extends the previous best or restarts at this element
- [ ] Example: buy-and-sell stock: take the daily price changes, then their largest subarray sum
- [ ] Cost: O(n) time in one pass, O(1) extra space
- [ ] Look-alike: the largest sum of exactly k consecutive elements is a fixed-size sliding window instead
