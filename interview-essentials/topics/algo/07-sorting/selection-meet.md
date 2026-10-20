---
id: sort-selection-meet
kind: basic
version: 1
level: 1
tags: [foundations, sorting]
refs:
  - https://algs4.cs.princeton.edu/21elementary/
  - https://en.wikipedia.org/wiki/Selection_sort
---

## Selection sort fills the array from the front: each pass scans the unsorted rest for its minimum and swaps it into the next slot. What does `5 3 8 1` hold after the first pass?

---

**`1 3 8 5`: the minimum, 1, swaps with the 5 in slot 0.**

Slot 0 is now final, and the next pass scans only `3 8 5`. A pass must
scan the whole rest, since any slot could hold the minimum, so the
comparisons are the same whatever order the keys arrive in.
