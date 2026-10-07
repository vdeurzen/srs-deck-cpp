---
id: foundations-growth-factor
kind: basic
version: 1
level: 3
requires:
  - foundations-amortised-vs-average
tags: [complexity, amortised, sequences, allocators]
refs:
  - https://epubs.siam.org/doi/10.1137/0606031
  - https://github.com/facebook/folly/blob/main/folly/docs/FBVector.md
---

## A dynamic array that grows by a fixed 16 slots each time it fills makes `push_back` cost O(n) amortised. Why does growing by a *factor* fix that?

---

**The copies form a geometric series, Θ(n) in total, so O(1) per push.**
With growth factor `g`, all copies sum to under `n·g/(g−1)`. A fixed
step copies the whole array every 16 pushes: about `n²/32` copies in
total, Θ(n) per push.
