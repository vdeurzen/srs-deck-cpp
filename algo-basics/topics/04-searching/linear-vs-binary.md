---
id: search-linear-vs-binary
kind: basic
version: 1
level: 1
tags: [binary-search, complexity, misconception]
elaborate: Where in your own code is a collection sorted just to be searched once or twice?
requires:
  - search-binary-search-halving
  - complexity-growth-ladder
refs:
  - https://en.cppreference.com/w/cpp/algorithm/sort
  - https://en.cppreference.com/w/cpp/algorithm/find
---

## Binary search is O(log n), so to check once whether an id is in an unsorted list of a million ids, you sort the list and binary search it. What does that cost compared with a plain scan?

---

**More: the sort alone is O(n log n), worse than the O(n) scan it was meant to beat.**

The O(log n) is tempting because it is quoted without its precondition.
Sorting pays off only over many searches: q lookups cost q·n by
scanning, n log n + q·log n by sorting first.
