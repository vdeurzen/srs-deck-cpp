---
id: dp-interval-last-burst
kind: basic
version: 1
level: 4
tags: [dynamic-programming, interval-dp, recognition, lc-312]
requires:
  - interview-essentials/technique-dp-state
refs:
  - https://leetcode.com/problems/burst-balloons/
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §14.2 (matrix-chain multiplication)
elaborate: LC 1039 (triangulate a polygon) splits the range at a vertex k too. What plays the role of the last balloon there?
---

> You are given `n` balloons with numbers `nums`. If you burst balloon
> `i`, you get `nums[i - 1] * nums[i] * nums[i + 1]` coins; afterwards
> its neighbours become adjacent. Return the maximum coins.
> `1 <= n <= 300`.

`a` is `nums` with a 1 added at each end; `dp[l][r]` covers the balloons
strictly between `l` and `r`.

## Which balloon `k` in `(l, r)` must the recurrence split on?

---

**The one burst *last*: its neighbours are then exactly `l` and `r`.**

`dp[l][r] = max over k of dp[l][k] + a[l]·a[k]·a[r] + dp[k][r]`. While
`k` stands, the two sides never touch, so they are independent. Choosing
the *first* burst makes `k − 1` and `k + 1` adjacent: the sides interact.
