---
id: sort-pivot-depth
kind: basic
version: 1
level: 2
tags: [foundations, sorting, quicksort, complexity]
requires:
  - sort-quicksort-recurse-code
elaborate: Which inputs in your own systems arrive already sorted or reversed?
refs:
  - https://doi.org/10.1093/comjnl/5.1.10
  - https://algs4.cs.princeton.edu/23quicksort/
---

## Two quicksorts with the same partition code sort the same 1024 distinct keys. One recurses 10 levels deep, the other 1023. What property of their pivots differs?

---

**The pivot's rank within its range: near the middle versus always the smallest or largest.**

A middle pivot halves the range, so 10 halvings reach size 1. An
extreme pivot peels off one value per level. Every level partitions up
to n values, so total work is n × depth: about 10 240 versus 523 776
comparisons.
