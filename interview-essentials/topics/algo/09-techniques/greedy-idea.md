---
id: technique-greedy-idea
kind: basic
version: 1
level: 1
tags: [foundations, coins, optimisation]
refs:
  - https://en.wikipedia.org/wiki/Greedy_algorithm
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 15
---

## A cashier pays 63 cents from coins of 25, 10, 5 and 1. At each step she takes the largest coin that still fits: 25, 25, 10, 1, 1, 1. Once a coin is counted out, what does her method never do with it?

---

**Reconsider it: each step takes the best-looking choice now and keeps it for good.**

A method that commits to the locally best option and never revisits it
is a *greedy* algorithm. It needs one pass and no search, but it is
correct only when a locally best choice always extends to a best whole
answer, and that needs a proof.
