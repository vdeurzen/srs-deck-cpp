---
id: spaceship-ordering-categories
kind: basic
version: 1
level: 3
tags: [comparisons]
refs:
  - https://en.cppreference.com/w/cpp/utility/compare/strong_ordering
  - https://en.cppreference.com/w/cpp/utility/compare/partial_ordering
---

## What distinguishes `std::strong_ordering`, `std::weak_ordering`, and `std::partial_ordering`?

**`strong_ordering`**: equivalent means substitutable — if `a` and `b`
compare equivalent, they are interchangeable in every observable way an
ordering could depend on. Total order: every pair compares.

**`weak_ordering`**: equivalent does not imply substitutable — a
case-insensitive string comparison can treat `"abc"` and `"ABC"` as
equivalent while they remain distinguishable objects. Still a total
order: every pair compares.

**`partial_ordering`**: some pairs are simply **unordered**, not just
equivalent — `float` comparison is the canonical example, since `NaN`
compares neither less, greater, nor equivalent to anything, including
itself.

A type's natural category flows from its members: a struct with any
`partial_ordering` member is at best `partial_ordering` itself, no matter
how its other members compare.
