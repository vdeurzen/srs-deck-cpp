---
id: arr-intervals-merge-meet
kind: basic
version: 1
level: 1
tags: [intervals, foundations, lc-56]
refs:
  - https://leetcode.com/problems/merge-intervals/
---

Merge Intervals: given intervals `[start, end]`, merge every group that
overlaps and return the disjoint result.

```text
[1, 3]   [2, 5]   [7, 8]
```

## What does merging these three give?

---

**`[1, 5]` and `[7, 8]`: `[2, 5]` starts inside `[1, 3]`, so they merge.**

A merged interval runs from the earliest start to the latest end of its
group. `[7, 8]` starts after 5, so it stays apart. Intervals that only
touch, like `[1, 4]` and `[4, 6]`, share the point 4 and merge too.
