---
id: technique-greedy-vs-dp
kind: basic
version: 1
level: 2
tags: [greedy, dynamic-programming]
requires:
  - technique-greedy-idea
  - technique-dp-optimal-substructure
elaborate: Name a problem where greedy is provably safe and one where it is not, and say what separates them.
refs:
  - https://en.wikipedia.org/wiki/Greedy_algorithm
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
---

## Coins {4, 3, 1}, amount 6: greedy pays 4 + 1 + 1, DP finds 3 + 3. What does DP do at each step that greedy does not?

---

**DP tries every choice and keeps the best; greedy commits to one.**
Fewest for 6 is 1 + the best of fewest-for-2, fewest-for-3 and
fewest-for-5: 1 + 1 = 2, via last coin 3. Greedy never looks at "last
coin 3". Use greedy only when you can prove its one
choice is always safe; otherwise pay DP's amount × coins.
