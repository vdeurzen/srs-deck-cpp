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
  - https://en.wikipedia.org/wiki/Memoization
elaborate: LC 377 counts ordered sequences that sum to target. Which side of this split is it on, and what single number is its state?
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

**(a) must output every combination, and there can be exponentially many.**

(b) only counts, so equal states share work: every path reaching
(coin index, amount left) has the same number of completions, and a
table of n × amount cells suffices. A listing can't share; each answer
is written out on its own.
