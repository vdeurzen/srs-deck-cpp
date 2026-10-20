---
id: sort-insertion-shift-count
kind: basic
version: 2
level: 1
tags: [foundations, sorting, insertion-sort, inversions]
requires:
  - sort-inversion-count
  - sort-insertion-idea
elaborate: Your input is a log that is sorted except for a few late arrivals. What does this predict insertion sort costs on it?
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://algs4.cs.princeton.edu/21elementary/
---

## An array has k inversions. How many one-slot shifts does insertion sort make while sorting it?

---

**Exactly k: each shift undoes one inversion and no other pair.**

A shift moves the key past one larger value on its left, fixing exactly
that pair. `[3 1 2]` has 2 inversions (3·1, 3·2) and takes 2 shifts. So
the sort costs Θ(n + k): linear on nearly sorted input.
