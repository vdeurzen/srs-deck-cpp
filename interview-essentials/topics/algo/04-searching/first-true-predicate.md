---
id: search-first-true-predicate
kind: cloze
version: 1
level: 3
tags: [binary-search, lower-bound]
requires:
  - search-lower-bound-meaning
elaborate: "Name a yes/no question about a number in your own work whose answer flips exactly once as the number grows."
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.cppreference.com/w/cpp/algorithm/partition_point
---

On a sorted range, a yes/no test on each element can read
`true, …, true, false, …, false`. `std::lower_bound(first, last, key)`
returns the first element where the test {{c1::`x < key`::a test that holds on the left part}}
turns false.

---

For `{1, 3, 3, 5}` and key 3 the test gives `true, false, false, false`, so
`lower_bound` lands on index 1. Seeing searches as "first place the answer
flips" is what makes searching on the answer possible.
