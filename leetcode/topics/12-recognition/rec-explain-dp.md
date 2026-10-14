---
id: rec-explain-dp
kind: explain
version: 1
level: 4
tags: [dynamic-programming, recognition, lc-72, lc-518, lc-300]
requires:
  - rec-one-vs-two-sequences
  - rec-dp-cell-vs-mask
  - rec-list-vs-count
refs:
  - https://leetcode.com/problems/edit-distance/
  - https://leetcode.com/problems/coin-change-ii/
  - https://leetcode.com/problems/longest-increasing-subsequence/
  - https://leetcode.com/problems/minimum-path-sum/
  - https://leetcode.com/problems/find-the-shortest-superstring/
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
elaborate: Which of these five could drop a dimension by keeping only the previous row or the previous amount, and which could not?
---
Give the DP state for each statement, and why it is enough. (1) The
fewest inserts, deletes and replaces turning `word1` into `word2`.
(2) The number of ways to pay `amount` with reusable coins. (3) The
longest strictly increasing subsequence of `nums`. (4) The cheapest
top-left to bottom-right path through a grid, moving only down or
right. (5) The cheapest order to visit all of `n <= 12` nodes, with a
cost on each ordered pair.
---
- [ ] (1) `(i, j)`, a prefix length of each word, because every operation settles the last character of one prefix or both
- [ ] (2) `dp[a]`, the ways to pay `a` with the coins added so far, because the last coin added leaves the smaller amount `a − c`
- [ ] (3) `dp[i]`, the longest run ending at `nums[i]`, because the next pick only has to beat that last value
- [ ] (4) `d[i][j]` per cell, because down-or-right moves never return to a cell, so its best entry is settled once the cells above and to the left are
- [ ] (5) `(visited mask, last node)`, because the rest of the tour depends only on which nodes are done and where it stands
