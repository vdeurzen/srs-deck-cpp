---
id: technique-pruning-vs-memo
kind: basic
version: 1
level: 3
tags: [backtracking, dynamic-programming]
requires:
  - technique-subset-sum-prune
  - technique-dp-memo-calls
refs:
  - https://doi.org/10.1145/321296.321300
  - https://en.wikipedia.org/wiki/Memoization
---

## Pruning and memoisation both make a recursive search skip work. What exactly does each skip?

---

**Pruning skips subtrees that cannot succeed; memoisation skips states
already solved.** Pruning needs a test proving a dead end (next item
too big). Memoisation needs the same state to recur: over {2, 4, 6},
taking 2 and 4, or only 6, reaches the end with the same amount left.
Memoise on `(item, left)` and that state is solved once.
