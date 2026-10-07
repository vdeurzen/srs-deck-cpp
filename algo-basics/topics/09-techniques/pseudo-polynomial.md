---
id: technique-pseudo-polynomial
kind: basic
version: 1
level: 3
tags: [dynamic-programming, knapsack, complexity]
requires:
  - technique-knapsack-direction
refs:
  - https://en.wikipedia.org/wiki/Pseudo-polynomial_time
  - https://en.wikipedia.org/wiki/Knapsack_problem#Dynamic_programming_in-advance_algorithm
---

## 0/1 knapsack's DP takes O(n·W) for n items and capacity W. Why is that not called polynomial time?

---

**W is a number written in log₂ W bits, and n·W is exponential in that
length.** A capacity of 10¹² is 40 bits of input but 10¹² table cells.
The DP is fast only while W itself is small; that is "pseudo-polynomial".
For huge W, search with pruning or approximate instead.
