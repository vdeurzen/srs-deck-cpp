---
id: search-count-below-mixed
kind: basic
version: 1
level: 3
tags: [mixed, problem-recognition]
requires:
  - search-lower-bound-meaning
  - hashing-chaining
elaborate: "Which other query on sorted data becomes 'find a boundary', such as counting the values in a range [a, b)?"
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.cppreference.com/w/cpp/container/unordered_set
---

## A sorted array holds 10⁶ event timestamps. Each of 10⁵ queries asks how many events happened strictly before time t. Which method answers a query without scanning the array?

---

**Binary search: the index `lower_bound` returns for t is the count.**

"Before t" is a prefix of the sorted array, and its end is the first
element not less than t: about 20 comparisons. A hash table of the
timestamps answers only "is t present?"; it keeps no order, so it
cannot count what lies below t.
