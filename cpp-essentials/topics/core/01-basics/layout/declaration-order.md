---
id: layout-declaration-order
kind: basic
version: 1
level: 2
tags: [layout, padding]
requires:
  - layout-padding-sizeof
refs:
  - https://eel.is/c++draft/expr.rel#4
  - https://wg21.link/p1847r4
---

## Why doesn't the compiler reorder `struct { char a; double d; char b; }` to remove its padding?

---

**The standard requires members to be laid out in declaration order:
a later member is at a higher address.** Code depends on that order:
a struct shared with C must have the same layout on both sides. So
removing padding is your job, not the optimiser's.
