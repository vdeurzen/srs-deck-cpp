---
id: complexity-explain-big-o
kind: explain
version: 1
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
- [ ] Problem: time varies by machine, so count basic operations as a function of the input size n
- [ ] Mechanism: keep the dominant term and drop constant factors, so 3n² + 100n + 7 is O(n²)
- [ ] Example: comparing every pair of n elements once is n(n − 1)/2 steps, which is O(n²)
- [ ] Cost: it predicts scaling, so 1000× more input makes O(n) 1000× slower and O(n²) a million times
- [ ] Pitfall: log n outer passes need not mean n log n, since halving inner loops sum to under 2n
