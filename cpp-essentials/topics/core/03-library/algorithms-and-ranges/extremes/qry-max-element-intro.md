---
id: qry-max-element-intro
kind: basic
version: 1
level: 1
tags: [algorithms, extremes]
requires:
  - stdalgo-find-if-no-match
  - alg-iter-index
elaborate: Say why returning a position rather than a value lets one call answer both "what is the largest" and "where is it".
refs:
  - https://en.cppreference.com/w/cpp/algorithm/max_element
  - https://eel.is/c++draft/alg.min.max
---

`std::max_element(first, last)` returns an iterator to the first largest
element of the range.

```cpp
std::vector<int> v{3, 9, 4, 9};
auto it = std::max_element(v.begin(), v.end());
auto i = it - v.begin();
```

## What is `i`?

---

**1: the largest value is 9, and its first copy is at index 1.**

It finds it in one pass over the range, n − 1 comparisons. A position
gives both answers: `*it` is the value 9, and `it - v.begin()` its index.
