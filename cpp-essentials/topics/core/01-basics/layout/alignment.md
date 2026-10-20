---
id: layout-alignment
kind: basic
version: 1
level: 1
tags: [layout, alignment]
requires:
  - ptr-holds-an-address
  - class-struct-members
refs:
  - https://en.cppreference.com/w/cpp/language/object#Alignment
  - https://en.cppreference.com/w/cpp/language/alignof
elaborate: Say aloud where padding would appear in a struct you wrote recently, and how many bytes it costs.
---

## In `struct Rec { char tag; int count; };` on x86-64 (the usual 64-bit PC and server CPU), why does `count` start 4 bytes from the start of `Rec`, not 1?

---

**`int` has alignment 4: its address must be a multiple of
`alignof(int)`.** Every complete type has an alignment requirement, so
the compiler inserts three unused padding bytes after `tag` to reach the
next multiple of 4.
