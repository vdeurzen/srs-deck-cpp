---
id: complexity-cost-amortized
kind: basic
version: 1
level: 2
tags: [foundations, complexity, amortised]
requires:
  - complexity-cost-cases
refs:
  - https://epubs.siam.org/doi/10.1137/0606031
---

## A growable array doubles its storage when full, so one push can copy every element already stored. Still each push is called "amortised constant time". What exactly is bounded?

---

**The total cost of any sequence of pushes, divided by their number.**
Amortised cost averages over the *operations in a sequence*, not over
inputs: the rare expensive pushes are paid for by the many cheap ones
around them. One push may still cost n; amortised and
worst-case-per-call are different promises.
