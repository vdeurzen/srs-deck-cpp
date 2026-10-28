---
id: algmix-kth-largest
kind: basic
version: 1
level: 3
tags: [algorithms, choosing]
requires:
  - sel-top-three-ordered
elaborate: Say which word in a problem statement tells you the order of the other values doesn't matter.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
  - https://leetcode.com/problems/kth-largest-element-in-an-array/
---

## `std::vector<int> s` holds 10⁵ scores and may be rearranged. Return the 5th largest; the order of the other scores doesn't matter. Which standard call do you make?

---

**`std::nth_element` at `s.end() - 5`, then read that element.**

Equally right: `s.begin() + 4` with a `>` comparator. Cue: one position of sorted order is wanted, nothing else. `sort` would
order all 10⁵ scores; `partial_sort` would also order the top 5, which
nobody asked for. This is Kth Largest Element in an Array.
