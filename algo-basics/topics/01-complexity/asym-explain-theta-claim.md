---
id: complexity-asym-explain-theta-claim
kind: explain
version: 1
level: 2
tags: [foundations, complexity, capstone]
requires:
  - interview-essentials/complexity-asym-step-model
  - complexity-asym-limit-test
  - complexity-asym-o-is-not-worst-case
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
  - https://en.wikipedia.org/wiki/Big_O_notation
---

A junior reads "merge sort is Θ(n log n)" and asks what that actually
promises. Explain what the claim says, what it leaves out, and how you
would check such a claim for a routine of your own.
---
- [ ] Θ(n log n) traps the step count between two lines: c₁·n log n ≤ T(n) ≤ c₂·n log n from some n₀ on
- [ ] T(n) counts basic operations as a function of n, not seconds: a faster machine changes c, never the class
- [ ] O(n²) would also be true but loose, because O is only the upper line; Θ adds the matching lower one
- [ ] The bound is for one chosen case (worst, best or average); each case is its own function with its own Θ
- [ ] Checks it with the limit test: T(n)/(n log n) settling to a finite nonzero value, where 0 would mean little-o
