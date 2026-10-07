---
id: sort-cpp-comparator-dispatch
kind: basic
version: 1
level: 3
tags: [sorting, templates, inlining]
requires:
  - sort-go-dispatch
  - cpp-core/lambda-closure-type
elaborate: Where in your code is a comparator or hash stored as `std::function` only because the type was hard to name?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/sort
  - https://en.cppreference.com/w/cpp/utility/functional/function
---

## `std::sort(v.begin(), v.end(), cmp)`: `cmp` is a lambda in one build, a `std::function<bool(long, long)>` in another. What changes per comparison?

---

**The lambda's unique type instantiates `std::sort` with an inlinable call; `std::function` adds an indirect call.**

Measured, GCC 16.2 `-O2`, 2²⁰ random `long`s: 82 ms vs 114 ms. The cost
belongs to the dispatch mechanism, not the language: it is Go's
`sort.Sort` cost, reproduced in C++.
