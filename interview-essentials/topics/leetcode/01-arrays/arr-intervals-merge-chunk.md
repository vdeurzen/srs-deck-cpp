---
id: arr-intervals-merge-chunk
kind: chunk
version: 2
level: 2
tags: [intervals, sorting, lc-56, lc-57]
expose_ms: 8000
compile: null # a function body
requires:
  - arr-intervals-merge-worked
  - cpp-essentials/iter-range-for-const-auto-ref
  - cpp-essentials/vector-back-pop-back
refs:
  - https://leetcode.com/problems/merge-intervals/
  - https://leetcode.com/problems/insert-interval/
  - https://leetcode.com/problems/non-overlapping-intervals/
  - https://en.cppreference.com/w/cpp/algorithm/ranges/sort
elaborate: Non-overlapping Intervals (LC 435) asks for the fewest intervals to remove so the rest don't overlap. Why does it sort by end, not by start?
---

`iv` holds intervals as two-element vectors `{start, end}`, already
sorted by start. `out` holds the same kind and starts empty;
`out.empty()` is true while it holds nothing.

```cpp
for (const auto& v : iv)
  if (out.empty() || out.back()[1] < v[0]) out.push_back(v);
  else if (out.back()[1] < v[1]) out.back()[1] = v[1];
return out;
```

---

Merge Intervals (LC 56): given intervals `[start, end]`, merge all
that overlap and return the disjoint result.

**Sort by start, then extend the last output interval or open a new
one.** After sorting, anything that overlaps the current run is
adjacent to it, so one pass after the sort suffices.

- A gap is `back()[1] < v[0]`; `[1,4]` and `[4,5]` touch and merge.
- The `else` only ever raises the end: `[2,3]` inside `[1,4]` must not
  shrink it.

Insert Interval (LC 57: insert one interval into a sorted list of
disjoint ones, merging where needed) is the same loop after appending
it and sorting.
