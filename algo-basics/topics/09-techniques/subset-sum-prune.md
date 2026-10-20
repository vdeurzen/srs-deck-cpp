---
id: technique-subset-sum-prune
kind: basic
version: 2
level: 2
tags: [backtracking]
requires:
  - interview-essentials/technique-backtracking-state-space
elaborate: What other dead-end test could cut a search you have written, and what order of the input would it need?
refs:
  - https://doi.org/10.1145/321296.321300
  - https://en.wikipedia.org/wiki/Subset_sum_problem
---

## A take-or-skip search looks for a subset of the sorted items `2 4 6 8 10 12` that sums to 7; none does. At each node it gives up as soon as the next item is larger than the amount still left. Why can that never miss a solution?

---

**The items are sorted, so every later item is too big as well.**

Everything below that node can only add items ≥ the next one, which
already overshoots, so no subset there hits the amount exactly. Here it
cuts the search from all 127 nodes of the take-or-skip tree to 9.
