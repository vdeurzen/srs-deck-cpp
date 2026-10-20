---
id: arr-intervals-merge-worked
kind: basic
version: 1
level: 2
tags: [intervals, sorting, worked-example, lc-56]
requires:
  - arr-intervals-merge-meet
refs:
  - https://leetcode.com/problems/merge-intervals/
---

Intervals already sorted by start, merged in one pass. Each one is
compared only with the last interval in the output.

```text
next     vs last output end    action                output
[1, 4]   output empty          open a new one        [1, 4]
[2, 3]   2 ≤ 4                 end stays max(4, 3)   [1, 4]
[4, 6]   4 ≤ 4                 end becomes 6         [1, 6]
[8, 9]   8 > 6                 open a new one        [1, 6] [8, 9]
```

## At `[8, 9]`, why can `[1, 6]` never grow again later in the pass?

---

**Sorted by start, every later interval starts at 8 or more, past 6.**

So once an interval starts after the last end, the run before it is
final: after the sort, one comparison per interval suffices.
Unsorted, `[5, 7]` could still arrive later and join it.
