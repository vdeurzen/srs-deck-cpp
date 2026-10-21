---
id: sort-pattern-defeating
kind: basic
version: 1
level: 4
tags: [sorting, adaptivity]
requires:
  - sort-introsort
elaborate: A query plan tracks which orderings each operator already produces ("interesting orders"). Where is that the same insight?
refs:
  - https://github.com/orlp/pdqsort
  - https://github.com/python/cpython/blob/main/Objects/listsort.txt
---

## Real data is rarely random — it is already sorted, reversed, or concatenated from sorted pieces. What do modern sorts do about it?

---

**Detect existing order and exploit it: already-ordered input costs about one pass.**

pdqsort finishes a range its partition left untouched with a bounded
insertion sort; Timsort finds the natural runs, reverses descending ones
and merges them.
So benchmarks on random input understate the gap on real data.
