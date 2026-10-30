---
id: technique-pick-disk-files
kind: basic
version: 1
level: 3
tags: [techniques, mixed]
requires:
  - technique-pseudo-polynomial
  - technique-subset-sum-prune
  - interview-essentials/complexity-feasible-n
elaborate: If the sizes were whole megabytes up to 10⁴ instead, which approach would you switch to, and why?
refs:
  - https://doi.org/10.1145/321296.321300
  - https://en.wikipedia.org/wiki/Subset_sum_problem
---

## Choose some of 25 files, sizes in bytes up to 10¹², whose sizes add up to exactly a disk's capacity. Which technique would you use?

---

**Backtracking: a take-or-skip search over the files, pruning dead ends.**

A table indexed by byte count would need about 10¹² cells. The search
grows with the number of files, not their sizes: at most 2²⁵ ≈ 3·10⁷
subsets, and pruning cuts most of them.
