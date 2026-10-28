---
id: sel-cost
kind: basic
version: 1
level: 3
tags: [algorithms, rearranging, cost]
requires:
  - sel-nth-element-intro
  - srch-cost
elaborate: Say what changes in the cost if you need the top k values in order rather than one k-th value.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
  - https://eel.is/c++draft/alg.nth.element
---

## For one k-th smallest value among 10⁶ ints, why is `std::nth_element` cheaper than `std::sort` followed by `v[k]`?

---

**It continues only into the side holding position k, sorting nothing.**

Each round splits the range into values smaller and larger than one
chosen value, then drops the side without k, so the work is linear on
average: a few times n comparisons. `sort` orders everything, about
n·log₂ n ≈ 2×10⁷ comparisons.
