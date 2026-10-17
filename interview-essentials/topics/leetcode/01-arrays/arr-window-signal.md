---
id: arr-window-signal
kind: basic
version: 1
level: 2
tags: [sliding-window, recognition, lc-1004]
requires:
  - linear-variable-window-shrink
refs:
  - https://leetcode.com/problems/max-consecutive-ones-iii/
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 16 (aggregate analysis)
elaborate: LC 424 (longest repeating character replacement) also allows "at most k" changes. What plays the role of the zero count there?
---

> Given a binary array `nums` and an integer `k`, return the maximum
> number of consecutive `1`'s in the array if you can flip at most `k`
> `0`'s.

## Which pattern solves this in O(n)?

---

**A variable window `nums[lo..hi]` holding at most `k` zeros; answer its longest length.**

Flipping the window's zeros makes it all ones. When a zero makes it
`k + 1`, move `lo` past the leftmost zero. Valid because the zero count
only grows with `hi` (counts are non-negative), unlike LC 560's sums.
