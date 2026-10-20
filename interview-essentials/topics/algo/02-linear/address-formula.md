---
id: linear-address-formula
kind: basic
version: 1
level: 1
tags: [foundations, arrays, memory]
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.1 (arrays)
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Additive_operators
---

## An `int` array starts at address 1000, and an `int` takes 4 bytes. At which address does `a[6]` start?

---

**1024, that is 1000 + 6 · 4.**

The elements sit back to back with no gaps, so element `i` starts `i`
element-sizes past the start: `base + i · size`. One multiply and one
add for any `i`, so indexing costs O(1), constant time. `a[0]` sits at
the base itself, which is why indices start at 0.
