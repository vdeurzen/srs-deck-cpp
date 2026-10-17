---
id: search-first-true-predicate
kind: cloze
version: 1
level: 3
tags: [binary-search, lower-bound]
requires:
  - search-lower-bound-meaning
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partition_point
---

Lower-bound-style searches find the boundary in a sequence of answers
shaped `true, …, true, false, …, false`. On a range shaped that way under
`p`, `std::partition_point(first, last, p)` returns the first element
where `p` is false. `std::lower_bound(first, last, key)` returns the same
position when `p(x)` is {{c1::`x < key`::a test that holds on the left part}}.

---

For `{1, 3, 3, 5}` and key 3 the test gives `true, false, false, false`, so
both calls land on index 1. Seeing searches as "first place the answer
flips" is what makes searching on the answer possible.
