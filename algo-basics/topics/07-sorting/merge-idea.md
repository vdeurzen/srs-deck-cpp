---
id: sort-merge-idea
kind: basic
version: 1
level: 1
tags: [sorting, merge-sort, complexity]
requires:
  - complexity-log-halvings
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://en.wikipedia.org/wiki/Merge_sort
---

## Merge sort runs on an 8-element array that is already sorted. Why does it still take Θ(n log n)?

---

**It always splits to depth log₂ n and merges all n elements on every level.**

8 → 4 + 4 → 2 + 2 + 2 + 2 → eight 1s: 3 levels, each merging all 8
elements. The split is by position, never by value, so input
order cannot remove a level: Θ(n log n) best, average and worst.
