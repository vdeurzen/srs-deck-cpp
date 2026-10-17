---
id: rec-list-vs-count
kind: basic
version: 1
level: 4
tags: [backtracking, dynamic-programming, recognition, lc-39, lc-518]
requires:
  - bt-combination-start-index
  - dp-coin-ways-chunk
refs:
  - https://leetcode.com/problems/combination-sum/
  - https://leetcode.com/problems/coin-change-ii/
  - https://leetcode.com/problems/combination-sum-iv/
  - https://en.wikipedia.org/wiki/Memoization
elaborate: Combination Sum IV (LC 377) counts the ordered sequences of distinct `nums` that sum to `target`. Which side of this split is it on, and what single number is its state?
---

Same input: distinct positive values, each reusable any number of
times.

> (a) Return a list of all unique combinations of `candidates` that sum
> to `target`.
>
> (b) Return the number of combinations of `coins` that make up
> `amount`.

## Only one of them can be solved in time polynomial in n and the target. Which property of the other rules that out?

---

**(a) must output every combination, and their number grows faster than any polynomial.**

Candidates 1..n with target n list every partition of n: 5604 at
n = 30, 190 569 292 at n = 100. (b) only counts, so every path reaching
(coin index, amount left) shares one answer: n × amount cells suffice.
