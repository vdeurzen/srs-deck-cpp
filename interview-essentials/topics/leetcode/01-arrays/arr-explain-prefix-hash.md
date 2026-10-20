---
id: arr-explain-prefix-hash
kind: explain
version: 1
level: 3
tags: [arrays, recognition, lc-560]
requires:
  - arr-prefix-hash-signal
  - arr-prefix-hash-parsons
  - arr-window-negatives
refs:
  - https://leetcode.com/problems/subarray-sum-equals-k/
  - https://leetcode.com/problems/minimum-size-subarray-sum/
  - https://en.cppreference.com/w/cpp/algorithm/partial_sum
elaborate: Where else could "store what you have seen so far, keyed on what a future element will need" turn a nested loop into one pass, for example matching log events by id?
---
An interviewer asks how you tell from a problem statement that counting
subarrays with a nested loop can become one pass, and what that pass
keeps. Answer aloud.
---
- [ ] Cue: count contiguous subarrays with an exact sum, and the values may be negative
- [ ] Pattern: a hash map counts earlier prefix sums, and each step adds the count of prefix minus k
- [ ] Example: Subarray Sum Equals K, the number of contiguous subarrays summing to k
- [ ] Cost: O(n) time in one pass, plus O(n) extra space for the map of prefix counts
- [ ] Look-alike: all values non-negative with a sum bound: a sliding window works, because widening never lowers the sum
