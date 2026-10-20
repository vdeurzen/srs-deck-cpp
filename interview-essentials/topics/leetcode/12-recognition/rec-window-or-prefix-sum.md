---
id: rec-window-or-prefix-sum
kind: basic
version: 1
level: 3
tags: [arrays, recognition, lc-209, lc-560]
requires:
  - arr-window-signal
  - arr-prefix-hash-signal
refs:
  - https://leetcode.com/problems/minimum-size-subarray-sum/
  - https://leetcode.com/problems/subarray-sum-equals-k/
elaborate: Say aloud which constraint line you now read first in a subarray problem, and what each possible answer to it tells you.
---

Two contiguous-subarray statements:

> (a) Given positive integers `nums` and a positive `target`, return the
> minimal length of a contiguous subarray whose sum is at least
> `target`, or 0 if there is none. `1 <= nums[i] <= 10^4`.
>
> (b) Given integers `nums` and `k`, return the number of contiguous
> subarrays whose sum equals `k`. `-1000 <= nums[i] <= 1000`.

## A window `nums[lo..hi]` whose two ends only ever move right solves one of them. Which statement rules it out?

---

**(b): its values may be negative, so widening a window can lower its sum.**

A window may drop its left end only when no wider window could do
better; positive values guarantee that in (a). For (b), count earlier
prefix sums in a hash map and add `count[p − k]` at each step.
