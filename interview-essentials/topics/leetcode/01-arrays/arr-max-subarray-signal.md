---
id: arr-max-subarray-signal
kind: basic
version: 1
level: 3
tags: [arrays, recognition, lc-53]
requires:
  - arr-kadane-worked
refs:
  - https://leetcode.com/problems/maximum-subarray/
  - https://doi.org/10.1145/358234.381162
elaborate: Say aloud what you would reach for instead if the statement asked for the largest sum of exactly k consecutive elements.
---

> Given an integer array `nums`, find the non-empty contiguous subarray
> with the largest sum and return its sum.
> `1 <= nums.length <= 10^5`, `-10^4 <= nums[i] <= 10^4`.

## Which pattern solves this in one pass?

---

**Kadane's algorithm: keep the best sum ending at each index, extending or restarting.**

Signals: *contiguous*, *largest sum*, any length, negatives allowed.
Every subarray ends somewhere, so the best of the "best ending here"
sums is the answer. This is Maximum Subarray (LC 53).
