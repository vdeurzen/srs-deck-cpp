---
id: technique-dp-overlapping-subproblems
kind: basic
version: 1
level: 2
tags: [dynamic-programming, recursion]
requires:
  - technique-divide-and-conquer
  - complexity-recursion-tree-calls
refs:
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
  - https://en.wikipedia.org/wiki/Overlapping_subproblems
---

## Naive recursive `fib(n)` is exponential; with a memo table it is linear. What property of the recursion does the memo exploit?

---

**Overlapping subproblems: the same calls recur, and only n distinct
ones exist.** `fib(5)` computes `fib(2)` three times; the memo computes it
once. Cost becomes *distinct subproblems × work each*.

Contrast merge sort: its halves never overlap, so a memo saves nothing.
That is divide and conquer, not dynamic programming.
