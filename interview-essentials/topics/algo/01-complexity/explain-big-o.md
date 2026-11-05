---
id: complexity-explain-big-o
kind: explain
version: 2
level: 3
tags: [complexity, big-o]
requires:
  - complexity-asym-step-model
  - complexity-drop-terms
  - complexity-count-loop-steps
  - complexity-big-o-scaling
  - complexity-halving-inner-loop
refs:
  - https://dl.acm.org/doi/10.1145/1008328.1008329
  - https://en.wikipedia.org/wiki/Analysis_of_algorithms#Cost_models
elaborate: Say in one sentence, as to an interviewer, when two O(n) solutions would still differ enough that you would pick one over the other.
---
A teammate reviewing your pull request asks what your comment "this
loop is O(n²)" actually claims about the code. Answer aloud in about a
minute.
---
- [ ] The claim counts basic operations as a function of input size n, not seconds, so it holds on every machine
- [ ] The step count stays at most c·n² for some constant c, once n is past some n₀
- [ ] Constants and lower terms drop out: a loop doing 3n² + 100n + 7 steps is still O(n²)
- [ ] O(n²) predicts scaling: 1000× more input makes the loop up to a million times slower
- [ ] O(n²) is not a running time: it cannot say which of two O(n²) loops is faster
