---
id: technique-backtracking-undo
kind: basic
version: 1
level: 2
tags: [backtracking, recursion]
requires:
  - technique-backtracking-state-space
refs:
  - https://doi.org/10.1145/321296.321300
  - https://en.wikipedia.org/wiki/Backtracking
---

## Generating permutations of {a, b, c}, backtracking marks a letter used, recurses, then clears the mark. What goes wrong without the clear?

---

**Marks from one branch leak into its siblings, so they skip valid
choices.** After exploring every permutation starting with `a`, all
three letters are still marked; the branches starting with `b` and `c`
find nothing left to place. Choose, explore, **un-choose**: each branch
must leave the state as it found it.
