---
id: rec-dp-cell-vs-mask
kind: basic
version: 2
level: 4
tags: [grids, recognition, lc-64, lc-714]
requires:
  - dp-grid-dag-signal
refs:
  - https://leetcode.com/problems/minimum-path-sum/
  - https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
  - https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
elaborate: Best Time to Buy and Sell Stock with Cooldown (LC 309) forbids buying on the day after a sale. What third value joins the state, and why?
---

Two best-route statements:

> (a) In an `m x n` grid of non-negative numbers, find the path from
> top left to bottom right with the smallest sum; you move only down or
> right.
>
> (b) `prices[i]` is a stock's price on day `i`. Buy and sell as often
> as you like, holding at most one share at a time and paying `fee` on
> each sale. Return the largest profit.

## In one of them the position (cell or day) alone is not enough state. What decides that?

---

**(b): holding a share changes your next moves, so the state is (day, holding).**

Two histories reaching the same day can face different futures: one may
sell, the other may only buy. In (a) every route into a cell faces the
same remaining grid, so the cell alone fixes the best finish.
