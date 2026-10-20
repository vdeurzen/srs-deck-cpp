---
id: technique-backtracking-undo
kind: basic
version: 2
level: 2
tags: [backtracking, recursion]
requires:
  - technique-backtracking-state-space
elaborate: Say aloud where else in your code a recursive call must restore shared state before returning.
refs:
  - https://doi.org/10.1145/321296.321300
  - https://en.wikipedia.org/wiki/Backtracking
---

## Generating permutations of {a, b, c} (every ordering of all three letters), backtracking marks a letter used, recurses, then clears the mark. What goes wrong without the clear?

---

**Marks from one branch leak into its siblings, so they skip valid
choices.** After the first permutation, abc, every letter stays marked,
so no other branch finds a free letter: only abc is produced. Choose,
explore, **un-choose**: each branch must leave the state as it found it.
