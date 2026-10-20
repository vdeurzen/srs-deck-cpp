---
id: technique-explain-loop-invariant
kind: explain
version: 1
level: 4
tags: [invariants]
requires:
  - technique-loop-invariant-sum
  - technique-max-invariant-code
  - technique-max-start-element-code
refs:
  - https://dl.acm.org/doi/10.1145/363235.363259
  - https://en.wikipedia.org/wiki/Loop_invariant
elaborate: Pick a loop you wrote recently and say aloud the claim that holds at the top of every iteration.
---
A code reviewer asks how you know your loop is correct for every input,
not just the ones you tested. Answer aloud.
---
- [ ] Problem: tracing a few runs cannot show a loop is right for every input
- [ ] Mechanism: a claim true before the first iteration, kept by every iteration, gives the answer at exit
- [ ] Example: s sums a[0] to a[i − 1], so when i reaches n, s is the total
- [ ] Trade-off: writing the claim costs a sentence per loop but proves it for every input
- [ ] Pitfall: starting the maximum at 0 returns 0 on all-negative input such as −5, −2, −9
