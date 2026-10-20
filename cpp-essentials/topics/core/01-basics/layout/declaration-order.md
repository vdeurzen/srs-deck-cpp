---
id: layout-declaration-order
kind: basic
version: 1
level: 2
tags: [layout, padding]
requires:
  - layout-padding-worked
  - class-struct-members
elaborate: Say in one sentence, as to an interviewer, what would break if the compiler were free to reorder a struct's members.
refs:
  - https://eel.is/c++draft/expr.rel#4
  - https://wg21.link/p1847r4
---

## Why doesn't the compiler reorder `struct { char a; double d; char b; }` to remove its padding?

---

**The standard requires members to be laid out in declaration order:
a later member is at a higher address.** Code depends on that order:
C code compiled separately that reads the same struct expects the same
bytes in the same places. So removing padding is your job, not the
compiler's.
