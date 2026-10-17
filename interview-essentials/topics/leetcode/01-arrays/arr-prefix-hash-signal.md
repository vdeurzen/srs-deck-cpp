---
id: arr-prefix-hash-signal
kind: basic
version: 1
level: 2
tags: [prefix-sums, hash-map, recognition, lc-560]
requires:
  - linear-prefix-sum-range
refs:
  - https://leetcode.com/problems/subarray-sum-equals-k/
  - https://en.cppreference.com/w/cpp/algorithm/partial_sum
elaborate: LC 525 (equal 0s and 1s) has no "sum" in its statement. What rewrite of the values turns it into this pattern?
---

> Given an integer array `nums` and an integer `k`, return the total
> number of contiguous subarrays whose sum equals `k`.
> `-1000 <= nums[i] <= 1000`.

## Which pattern solves this in O(n)?

---

**Running prefix sum `p`; a hash map counts earlier prefixes; add `count[p − k]`.**

A subarray `(i, j]` sums to `k` exactly when `p[j] − p[i] = k`, so each
earlier prefix equal to `p − k` starts one. One pass, O(n). Signals:
*contiguous*, *sum equals*, negatives allowed (which rules out a window).
