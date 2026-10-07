---
id: ordered-search-mispredict
kind: basic
version: 1
level: 4
requires:
  - ordered-lower-bound-loop
  - foundations-branch-misprediction
tags: [binary-search, branchless, low-latency]
refs:
  - https://en.algorithmica.org/hpc/data-structures/binary-search/
---

## Binary search over a large sorted array with random keys: how often does the `if (a[mid] < key)` branch mispredict?

---

**About half the time: each step's direction is a fresh coin flip.**

The outcome depends on the data, not on any pattern the predictor can
learn, so roughly every second iteration flushes the pipeline. The
textbook loop is optimal in comparisons and still slow.
