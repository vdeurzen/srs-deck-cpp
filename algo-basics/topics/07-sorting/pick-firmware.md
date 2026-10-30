---
id: sort-pick-firmware
kind: basic
version: 1
level: 3
tags: [sorting, mixed]
requires:
  - interview-essentials/sort-heap-sort
  - interview-essentials/sort-compare-properties
elaborate: What would you give up by choosing this sort on a server where memory is plentiful and only the average time matters?
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.wikipedia.org/wiki/Heapsort
---

## Firmware must sort 2 000 readings in an array, with no spare memory beyond a few variables and a hard limit on the slowest possible run. Which sort would you use?

---

**Heap sort.**

It is O(n log n) on every input and sorts inside the array, O(1)
extra. Merge sort needs a Θ(n) buffer; quicksort's recursion needs a
stack, and an unlucky pivot can still cost n².
