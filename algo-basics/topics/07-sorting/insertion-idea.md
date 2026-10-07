---
id: sort-insertion-idea
kind: basic
version: 1
level: 1
tags: [sorting, insertion-sort, invariants]
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://en.wikipedia.org/wiki/Insertion_sort
---

## Insertion sort has reached `[2 5 7 | 3 1]` (the bar marks how far it got). What does the array look like after the next step?

---

**`[2 3 5 7 | 1]`: 3 slides left past 7 and 5 and lands after 2.**

The invariant: left of the bar are the first i inputs, in sorted order.
Each step takes the next element and shifts every larger one right by
one slot until it fits, like sorting a hand of cards. Extra space: O(1).
