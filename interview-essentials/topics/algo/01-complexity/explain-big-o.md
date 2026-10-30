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
- [ ] It counts basic operations as a function of the input size n, not seconds, so it holds on every machine
- [ ] It claims the step count stays at most c·n² for some constant c, once n is past some n₀
- [ ] Constants and lower terms drop out, so a loop doing 3n² + 100n + 7 steps is still O(n²)
- [ ] It predicts scaling: 1000× more input makes an O(n²) loop up to a million times slower
- [ ] It is not a running time: constants are dropped, so it cannot say which of two O(n²) loops is faster
