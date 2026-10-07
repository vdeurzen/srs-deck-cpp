---
id: spaceship-partial-ordering-nan
kind: basic
version: 1
level: 3
tags: [comparisons, floating-point]
requires:
  - spaceship-ordering-categories
refs:
  - https://en.cppreference.com/w/cpp/utility/compare/partial_ordering
  - https://en.cppreference.com/w/cpp/language/operator_comparison#Three-way_comparison
---

## For two `double`s, `<=>` returns `std::partial_ordering`, not a total-order category. Which value forces that?

---

**NaN: it is unordered with every value, itself included.**

`NaN <=> 1.0` is `std::partial_ordering::unordered`: not less, not
equivalent, not greater, so `<`, `==` and `>` are all false. A total
order would have to place it somewhere.
