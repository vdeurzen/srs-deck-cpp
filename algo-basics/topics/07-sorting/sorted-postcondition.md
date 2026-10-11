---
id: sort-sorted-postcondition
kind: basic
version: 1
level: 1
tags: [foundations, sorting, invariants]
elaborate: Checking only neighbours relies on ≤ chaining along. What could a comparator that is not transitive make this check miss?
refs:
  - https://algs4.cs.princeton.edu/21elementary/
  - https://en.cppreference.com/w/cpp/algorithm/is_sorted
---

## `my_sort({4, 1, 3, 2})` returns `{1, 3, 2, 4}`: the same values, smallest first, largest last. What is the cheapest check that proves it is not sorted?

---

**Compare each neighbour pair: `3 > 2` at positions 1 and 2 fails.**

Sorted means `b[i] ≤ b[i + 1]` for all n − 1 neighbour pairs (plus
being a rearrangement of the input). Since ≤ chains along, neighbours
imply every other pair: n − 1 comparisons certify an output, one bad
pair refutes it.
