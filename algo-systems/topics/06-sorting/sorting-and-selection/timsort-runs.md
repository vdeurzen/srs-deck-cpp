---
id: sort-timsort-runs
kind: basic
version: 1
level: 4
tags: [sorting, adaptivity, stability]
requires:
  - sort-pattern-defeating
elaborate: A log is appended in batches, each sorted by timestamp. How would you exploit that when re-sorting the whole file?
refs:
  - https://github.com/python/cpython/blob/main/Objects/listsort.txt
---

## Timsort gets 10⁶ records that are 8 sorted batches concatenated. Roughly what does the sort cost?

---

**About n·log₂ 8: one scan finds the 8 runs, then 3 levels of merging.**

Timsort (Python's `list.sort`, Java's object sort) treats maximal
ascending or strictly descending stretches as runs, reversing the
descending ones, and only merges. Fully sorted input is one run: O(n).
It is stable. CPython 3.11+ orders merges by powersort.
