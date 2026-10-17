---
id: rec-explain-windows
kind: explain
version: 1
level: 3
tags: [sliding-window, two-pointers, prefix-sums, recognition, lc-3, lc-560, lc-167]
requires:
  - arr-window-negatives
  - arr-prefix-hash-signal
  - arr-3sum-frame-parsons
refs:
  - https://leetcode.com/problems/longest-substring-without-repeating-characters/
  - https://leetcode.com/problems/maximum-average-subarray-i/
  - https://leetcode.com/problems/subarray-sum-equals-k/
  - https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
  - https://leetcode.com/problems/corporate-flight-bookings/
  - https://usaco.guide/silver/two-pointers
elaborate: Corporate Flight Bookings (LC 1109) adds `seats` to every flight in each booked range `[first, last]`, then returns every flight's total. Which of these patterns does it run backwards?
---
For each problem, name the pattern that needs only O(n) work (plus
O(1) per query) and the property of the input that makes it work.
(1) The longest substring of `s` with no repeated character. (2) The
largest average of any `k` consecutive elements. (3) The number of
subarrays that sum to `k`, where values may be negative. (4) Two
entries of a sorted array that sum to `target`. (5) Many queries for
the sum of `nums[l..r]`; `nums` never changes.
---
- [ ] (1) A variable window, because once `s[lo..hi]` holds a repeat every window containing it does too, so `lo` only moves right
- [ ] (2) A fixed window, because every window has length `k`, so neighbours share `k − 1` elements: add the one entering, subtract the one leaving
- [ ] (3) A prefix sum plus a hash map counting earlier prefixes, not a window, because a negative value can pull a too-large sum back down, so shrinking the window is never safe
- [ ] (4) Two pointers from both ends, because the array is sorted, so one comparison rules out an end for good
- [ ] (5) A prefix-sum array, because with `P[i]` the sum of the first `i` values, the sum of `nums[l..r]` is `P[r+1] − P[l]`: one O(n) pass, then O(1) per query
