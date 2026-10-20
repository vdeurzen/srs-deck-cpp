---
id: foundations-growth-factor
kind: basic
version: 1
level: 3
requires:
  - linear-dynamic-array-growth
  - complexity-asym-theta-sandwich
tags: [complexity, amortised, sequences, allocators]
elaborate: What would break if the growth factor were 1.01 instead of 2, and would push_back still be O(1) amortised?
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
