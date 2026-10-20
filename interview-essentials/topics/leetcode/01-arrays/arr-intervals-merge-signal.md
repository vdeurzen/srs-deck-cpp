---
id: arr-intervals-merge-signal
kind: basic
version: 1
level: 3
tags: [intervals, recognition, lc-56]
requires:
  - arr-intervals-merge-worked
refs:
  - https://leetcode.com/problems/merge-intervals/
  - https://en.cppreference.com/w/cpp/algorithm/ranges/sort
elaborate: Say aloud what the sort costs here, and why it dominates the single pass that follows.
---

> Meetings `[start, end]` arrive in any order. Return the busy periods:
> every group of overlapping meetings joined into one.
> `1 <= n <= 10^4`.

## Which step makes a single pass over the meetings enough?

---

**Sort by start: then a meeting can only overlap the last busy period.**

After the sort, everything that overlaps a period sits right after it,
so each meeting is compared once, with the last output. Unsorted, a
later meeting could still join any earlier period.
