---
id: technique-rec-fewest-squares
kind: basic
version: 1
level: 3
tags: [recognition, optimisation]
requires:
  - technique-greedy-vs-dp
  - technique-dp-overlapping-subproblems
  - complexity-feasible-n
elaborate: Say aloud the one-sentence meaning of a table cell for this problem, and how many cells and steps per cell it needs at n = 10⁴.
refs:
  - https://leetcode.com/problems/perfect-squares/
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
---

## Return the fewest perfect squares (1, 4, 9, 16, …) that sum to `n`, with n ≤ 10⁴. Which technique fits?

---

**Dynamic programming over amounts: fewest for m is 1 + the best over m − s².**

Largest-square-first fails: 12 = 9 + 1 + 1 + 1, but 4 + 4 + 4 uses
three. Every amount below n recurs across choices, so n cells of about
√n candidates each, 10⁶ steps, fit easily. (Perfect Squares, LC 279.)
