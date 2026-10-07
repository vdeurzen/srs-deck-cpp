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

Every binary search finds the boundary in a sequence of answers shaped
`false, …, false, true, …, true`. `std::lower_bound(first, last, key)`
returns the same position as `std::partition_point(first, last, p)` with
`p(x)` being {{c1::`x < key`::a test that holds on the left part}}.

---

`partition_point` returns the first element for which `p` is false. For
`{1, 3, 3, 5}` and key 3 the test gives `true, false, false, false`, so
both calls land on index 1. Seeing searches as "first place the answer
flips" is what makes searching on the answer possible.
