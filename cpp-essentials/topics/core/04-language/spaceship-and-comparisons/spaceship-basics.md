---
id: spaceship-basics
kind: basic
version: 1
level: 2
tags: [comparisons]
requires:
  - types-auto-deduces
elaborate: Go's `cmp.Compare` returns -1, 0 or +1; say aloud what C++ gains by returning a typed value instead.
refs:
  - https://en.cppreference.com/w/cpp/language/operator_comparison#Three-way_comparison
  - https://en.cppreference.com/w/cpp/utility/compare/strong_ordering
---

`<=>` is the three-way comparison operator, new in C++20.

## `auto r = 3 <=> 5;` What is `r`?

---

**`std::strong_ordering::less`: a comparison-category value, not a `bool`
or an `int`.**

You test it against the literal `0`: `r < 0` means less, `r == 0`
equivalent, `r > 0` greater. Comparing it with any other number is not
supported.
