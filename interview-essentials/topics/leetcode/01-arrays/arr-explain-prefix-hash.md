---
id: arr-explain-prefix-hash
kind: explain
version: 2
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
- [ ] The statement counts contiguous subarrays with an exact sum, and its values may be negative
- [ ] A subarray sums to k exactly when its end's prefix sum minus an earlier prefix sum equals k
- [ ] The pass keeps a running prefix sum p and a hash map counting earlier prefixes, adding count[p − k]
- [ ] The map starts with prefix sum 0 counted once, so subarrays starting at index 0 are counted
- [ ] With only non-negative values a sliding window would do; a negative lets a widened sum fall, breaking it
