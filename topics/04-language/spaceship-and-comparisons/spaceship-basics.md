---
id: spaceship-basics
kind: basic
version: 1
level: 2
tags: [comparisons]
refs:
  - https://en.cppreference.com/w/cpp/language/operator_comparison#Three-way_comparison
---

## What does `a <=> b` return, and how do you get a `bool` out of it?

`a <=> b` returns a value of a **comparison category type** —
`std::strong_ordering`, `std::weak_ordering`, or `std::partial_ordering`
— not a `bool` or an `int`. That value compares against the literal `0`
with the ordinary relational operators: `(a <=> b) < 0` means "`a` is
less than `b`", `== 0` means equivalent, `> 0` means greater.

You rarely write `a <=> b` directly for a bool result. Defining
`operator<=>` is usually enough on its own: the compiler synthesizes
`<`, `<=`, `>`, `>=` (and, unless you also declared `operator==`,
`==`/`!=` too) as rewritten expressions in terms of it.
