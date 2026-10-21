---
id: sort-pdqsort-break-patterns
kind: basic
version: 2
level: 4
tags: [sorting, adaptivity]
requires:
  - sort-pattern-defeating
elaborate: Why might a full random shuffle on a bad partition be worse for a production sort than these few swaps?
refs:
  - https://github.com/orlp/pdqsort/blob/master/pdqsort.h
  - https://arxiv.org/abs/2106.05123
---

## pdqsort just made a partition whose smaller side holds under 1/8 of the range. What does it do before choosing the next pivot?

---

**Swaps a few elements with ones a quarter of the way in, breaking the pattern.**

It does this on each side, so the input pattern that fooled the pivot
choice is gone for the price of a handful of swaps. The budget of ⌊log₂ n⌋ bad partitions keeps the worst case
O(n log n): past it, pdqsort switches to heapsort.
