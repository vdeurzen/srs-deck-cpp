---
id: sort-merge-space
kind: basic
version: 1
level: 2
tags: [sorting, merge-sort, memory]
requires:
  - sort-merge-trace
refs:
  - https://en.cppreference.com/w/cpp/algorithm/inplace_merge
  - https://en.wikipedia.org/wiki/Merge_sort
---

## Why does merge sort on an array need a Θ(n) extra buffer? Picture merging the two runs of `[5 6 | 1 2]` in place.

---

**A linear-time merge cannot write in place: it would overwrite left-run elements not yet read.**

The first output, 1, belongs in slot 0, which still holds the unread 5.
So the merge writes into a separate buffer (or copies one run out
first), up to n elements for the top-level merge.
