---
id: sort-pdqsort-break-patterns
kind: basic
version: 1
level: 4
tags: [sorting, adaptivity, go]
requires:
  - sort-pattern-defeating
elaborate: Why might a full random shuffle on a bad partition be worse for a production sort than these three swaps?
refs:
  - https://go.dev/src/sort/zsortinterface.go
  - https://github.com/orlp/pdqsort
---

## Go's pdqsort just made a partition whose smaller side holds under 1/8 of the range. What does it do before choosing the next pivot?

---

**Swaps three middle elements with pseudo-random positions; after log₂ n such partitions, heapsort.**

The swaps break the input pattern that fooled the pivot choice, at the
cost of three swaps, and are deterministic (xorshift seeded by the
length). The budget is `bits.Len(n)` bad partitions, keeping
O(n log n) worst case.
