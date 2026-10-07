---
id: technique-greedy-choice
kind: basic
version: 1
level: 1
tags: [greedy]
refs:
  - https://en.wikipedia.org/wiki/Greedy_algorithm
  - https://doi.org/10.1016/0304-3975(94)90061-2
---

## Greedy change-making for 63¢ with coins {25, 10, 5, 1}: what rule picks each coin?

---

**Take the largest coin that still fits, and never revisit a choice.**
That gives 25, 25, 10, 1, 1, 1: six coins, which is optimal here. Greedy
is one fast pass, but it is correct only when you can prove each local
choice belongs to some optimal answer; for US coins that proof exists.
