---
id: complexity-amortised-vs-average
kind: basic
version: 1
level: 2
tags: [complexity, amortised]
requires:
  - complexity-doubling-copies
  - complexity-average-needs-distribution
elaborate: Which "O(1) on average" structure in your own code could an adversary who controls the input push to its worst case, and which amortised one could they not?
refs:
  - https://epubs.siam.org/doi/10.1137/0606031
  - https://en.cppreference.com/w/cpp/container/vector/push_back
---

## `push_back` is *amortised* O(1); a hash lookup is *average-case* O(1). What does "amortised" promise that "average" does not?

---

**A bound on every sequence: any n pushes cost O(n) in total.** It
assumes nothing about the input, so no adversary can defeat it.
Average-case is a statement about a distribution of inputs (or of random
choices), and an adversary who picks the inputs can.
