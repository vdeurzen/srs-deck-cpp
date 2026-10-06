---
id: layout-alignment
kind: basic
version: 1
level: 1
tags: [layout, alignment]
refs:
  - https://en.cppreference.com/w/cpp/language/object#Alignment
  - https://en.cppreference.com/w/cpp/language/alignof
---

## In `struct Rec { char tag; int count; };` on x86-64, why does `count` start at offset 4, not 1?

---

**`int` has alignment 4: its address must be a multiple of
`alignof(int)`.** Every complete type has an alignment requirement, so
the compiler inserts three padding bytes after `tag`. Misaligned objects
are undefined behaviour in C++; on the hardware they cost extra memory
accesses or trap outright.
