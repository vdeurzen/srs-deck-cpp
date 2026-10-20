---
id: rec-sorted-pair-cue
kind: basic
version: 2
level: 3
tags: [arrays, recognition, lc-167, lc-1]
requires:
  - linear-two-pointers-sorted-pair
  - hashing-average-vs-worst
refs:
  - https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
  - https://leetcode.com/problems/two-sum/
elaborate: Where else would sorting first destroy something the answer needs, such as original positions or arrival order?
---

> (a) Given an array `numbers` sorted in non-decreasing order, return
> the positions of two entries that add up to `target`.
>
> (b) Given an unsorted array `nums`, return the positions, in `nums`
> as given, of two entries that add up to `target`.
>
> Both: `2 <= n <= 3 * 10^4`.

## One of them is better solved by a hash map of values already seen than by two pointers from both ends. Which one?

---

**(b): two pointers need sorted input, and sorting would scramble the positions it returns.**

In (a) the order is given: each comparison discards one end for good,
O(n) time and O(1) memory. In (b) the map finds each partner in one
pass, O(n) time and O(n) memory.
