---
id: spaceship-basics
kind: basic
version: 1
level: 2
tags: [comparisons]
refs:
  - https://en.cppreference.com/w/cpp/language/operator_comparison#Three-way_comparison
  - https://en.cppreference.com/w/cpp/utility/compare/strong_ordering
---

## `auto r = 3 <=> 5;` What is `r`?

---

**`std::strong_ordering::less`: a comparison-category value, not a `bool`
or an `int`.**

You test it against the literal `0`: `r < 0` means less, `r == 0`
equivalent, `r > 0` greater. Comparing it with any other number is not
supported.
