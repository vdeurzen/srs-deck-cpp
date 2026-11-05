---
id: technique-explain-loop-invariant
kind: explain
version: 2
level: 4
tags: [invariants]
requires:
  - technique-loop-invariant-sum
  - technique-max-invariant-code
refs:
  - https://dl.acm.org/doi/10.1145/363235.363259
  - https://en.wikipedia.org/wiki/Loop_invariant
elaborate: Pick a loop you wrote recently and say aloud the claim that holds at the top of every iteration.
---
A code reviewer asks how you know your loop is correct for every input,
not just the ones you tested. Answer aloud.
---
- [ ] State a claim that holds at the top of every iteration, since tests show only the inputs tried
- [ ] The claim must hold before the first iteration: for a sum loop, s is 0 when i is 0
- [ ] Each iteration must keep the claim: adding a[i] and incrementing i keeps s the sum of the first i elements
- [ ] The claim at loop exit must give the answer: when i reaches n, s is the total
- [ ] (empty: tick this)
