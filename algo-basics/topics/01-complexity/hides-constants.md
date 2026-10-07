---
id: complexity-hides-constants
kind: basic
version: 1
level: 2
tags: [complexity, big-o, measurement]
requires:
  - complexity-drop-terms
elaborate: Where in your own code does a "worse" big-O win because n is always small?
refs:
  - https://gcc.gnu.org/git/?p=gcc.git;a=blob;f=libstdc%2B%2B-v3/include/bits/stl_algo.h
  - https://en.wikipedia.org/wiki/Big_O_notation
---

## A does n² steps; B does 20·n·log₂ n steps of the same cost. Which is faster at n = 16?

---

**A: 256 steps against B's 1 280.** Big-O drops constants, so it only
ranks algorithms for *large* n; here B wins only from n = 144. That is
why libstdc++'s `std::sort` hands ranges of 16 or fewer elements to
insertion sort (`_S_threshold = 16` in `bits/stl_algo.h`).
