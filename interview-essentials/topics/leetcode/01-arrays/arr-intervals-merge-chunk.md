---
id: arr-intervals-merge-chunk
kind: chunk
version: 1
level: 2
tags: [intervals, sorting, lc-56, lc-57]
expose_ms: 8000
compile: null # a function body: graded by text, see below
refs:
  - https://leetcode.com/problems/merge-intervals/
  - https://leetcode.com/problems/insert-interval/
  - https://leetcode.com/problems/non-overlapping-intervals/
  - https://en.cppreference.com/w/cpp/algorithm/ranges/sort
elaborate: Non-overlapping Intervals (LC 435) asks for the fewest intervals to remove so the rest don't overlap. Why does it sort by end, not by start?
---

```cpp
std::ranges::sort(iv);
std::vector<std::vector<int>> out;
for (const auto& v : iv)
  if (out.empty() || out.back()[1] < v[0]) out.push_back(v);
  else out.back()[1] = std::max(out.back()[1], v[1]);
return out;
```

---

Merge Intervals (LC 56): given intervals `[start, end]`, merge all
that overlap and return the disjoint result.

**Sort by start, then extend the last output interval or open a new
one.** After sorting, anything that overlaps the
current run is adjacent to it, so one pass suffices: O(n log n).

- A gap is `back()[1] < v[0]`; `[1,4]` and `[4,5]` touch and merge.
- `std::max`, not `v[1]`: `[2,3]` inside `[1,4]` must not shrink it.

Insert Interval (LC 57: insert one interval into a sorted list of
disjoint ones, merging where needed) is the same loop after
appending it, or O(n) in three phases: copy those that end before it,
absorb those that overlap it, copy the rest.

Graded by text (`compile: null`): it is the body of
`std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& iv)`,
and a harness can only be appended after it. Checked by including it
verbatim in a constexpr test of Merge Intervals' examples, GCC 16.2.
