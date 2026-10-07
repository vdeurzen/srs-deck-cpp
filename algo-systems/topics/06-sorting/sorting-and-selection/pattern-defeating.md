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
  - https://go.dev/src/sort/zsortinterface.go
---

## Real data is rarely random — it is already sorted, reversed, or concatenated from sorted pieces. What do modern sorts do about it?

---

**Detect existing order and exploit it: sorted or reversed input costs about one pass.**

Go's pdqsort reverses a descending range and finishes an ascending one
with a bounded insertion sort; Timsort merges the natural runs it finds.
So benchmarks on random input understate the gap on real data.
