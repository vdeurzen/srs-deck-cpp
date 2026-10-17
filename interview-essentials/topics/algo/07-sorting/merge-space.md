---
id: sort-merge-space
kind: basic
version: 1
level: 2
tags: [sorting, merge-sort, memory]
refs:
  - https://en.cppreference.com/w/cpp/algorithm/inplace_merge
  - https://en.wikipedia.org/wiki/Merge_sort
requires:
  - sort-merge-idea
---

## Why does the simple two-pointer merge on an array need a Θ(n) buffer? Picture merging the two runs of `[5 6 | 1 2]` in place.

---

**Writing output in place would overwrite left-run elements not yet read.**

The first output, 1, belongs in slot 0, which still holds the unread 5.
So the merge writes into a separate buffer, or copies one run out first
(n/2 for the top-level merge). Without a buffer, `std::inplace_merge`
falls back to O(n log n).
