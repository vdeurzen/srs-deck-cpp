---
id: arr-explain-kadane
kind: explain
version: 3
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
- [ ] Reach for it on the largest sum of a contiguous run of any length, with negative values allowed
- [ ] It keeps the best sum ending at each index, which extends the previous best or restarts at this element
- [ ] It works because every subarray ends somewhere, so the largest of those per-index bests is the answer
- [ ] Buy-and-sell stock hides it: take the daily price changes, then their largest subarray sum
- [ ] It takes O(n) time in one pass and O(1) extra space
