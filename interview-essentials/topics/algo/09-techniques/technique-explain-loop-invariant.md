---
id: technique-explain-loop-invariant
kind: explain
version: 2
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
- [ ] Tests show only the inputs tried, so state a claim that holds at the top of every iteration
- [ ] Check it holds before the first iteration: when i is 0, s is 0, the sum of no elements
- [ ] Check each iteration keeps it: adding a[i], then incrementing i, keeps s the sum of a[0] to a[i − 1]
- [ ] At exit i equals n, which it reaches by growing one each pass, so s is the total
- [ ] The start check catches what tests miss: a maximum started at 0 returns 0 on −5, −2, −9
