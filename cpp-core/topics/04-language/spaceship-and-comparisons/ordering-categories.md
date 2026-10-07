---
id: spaceship-ordering-categories
kind: basic
version: 2
level: 3
tags: [comparisons]
requires:
  - spaceship-basics
refs:
  - https://en.cppreference.com/w/cpp/utility/compare/strong_ordering
  - https://en.cppreference.com/w/cpp/utility/compare/weak_ordering
---

## A case-insensitive string comparison's `<=>` returns `std::weak_ordering`, not `std::strong_ordering`. What property does it lack?

---

**Substitutability: `"abc"` and `"ABC"` compare equivalent yet are
distinguishable, so equivalent does not mean equal.**

`strong_ordering` promises that equivalent values are interchangeable in
every observable way. Both are total orders: every pair is less,
equivalent or greater.
