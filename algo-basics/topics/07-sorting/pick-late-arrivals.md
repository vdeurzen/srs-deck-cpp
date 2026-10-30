---
id: sort-pick-late-arrivals
kind: basic
version: 1
level: 3
tags: [sorting, mixed]
requires:
  - sort-insertion-shift-count
  - interview-essentials/sort-merge-idea
elaborate: Where in a larger sort would you deliberately hand small, nearly ordered pieces to this same algorithm?
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://algs4.cs.princeton.edu/21elementary/
---

## 40 records arrive in order, except that three of them sit one or two slots too late. Which sort would you use to put them in order?

---

**Insertion sort.**

It costs Θ(n + k) for k inversions; three slightly misplaced records
make at most six, so about n steps. Merge sort splits and merges all n
records on every level regardless, so it still pays n log n.
