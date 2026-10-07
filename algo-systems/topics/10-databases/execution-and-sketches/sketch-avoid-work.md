---
id: db-sketch-avoid-work
kind: basic
version: 1
level: 4
tags: [databases, sketches, probabilistic]
requires:
  - db-sketch-properties
refs:
  - https://datasketches.apache.org/
  - http://dimacs.rutgers.edu/~graham/pubs/papers/cm-full.pdf
---

## A system must never return a wrong answer. Where can it still use a probabilistic sketch?

---

**In front of an exact path, to skip work; never as the answer itself.**

A sketch's bound holds only with probability 1 − δ. A Bloom filter in
front of an exact lookup, or a count-min surfacing candidates that are
then counted exactly, can only cost time when it errs, never
correctness.
