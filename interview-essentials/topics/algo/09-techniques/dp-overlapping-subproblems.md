---
id: technique-dp-overlapping-subproblems
kind: basic
version: 1
level: 2
tags: [dynamic-programming, recursion]
requires:
  - complexity-recursion-tree-calls
elaborate: Say aloud how you would check a new recursion for repeated calls before reaching for a memo.
refs:
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
  - https://en.wikipedia.org/wiki/Overlapping_subproblems
---

## Naive recursive `fib(n) = fib(n − 1) + fib(n − 2)` roughly doubles its work with each step of n. With a memo (a table that saves each call's answer by its argument, so a repeat returns at once) it is linear. What property of the recursion does the memo exploit?

---

**Overlapping subproblems: the same calls recur, and only n distinct
ones exist.** `fib(5)` computes `fib(2)` three times; the memo computes it
once. Cost becomes *distinct subproblems × work each*.

Contrast summing an array by splitting it in halves: the halves never
overlap, so a memo saves nothing. That is divide and conquer, not
dynamic programming.
