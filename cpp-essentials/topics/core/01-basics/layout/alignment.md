---
id: layout-alignment
kind: basic
version: 1
level: 1
tags: [layout, alignment]
requires:
  - ptr-holds-an-address
  - ub-definition
refs:
  - https://en.cppreference.com/w/cpp/language/object#Alignment
  - https://en.cppreference.com/w/cpp/language/alignof
elaborate: Go also pads its structs; say aloud where in a Go or C++ struct you have written this padding would appear.
---

## In `struct Rec { char tag; int count; };` on x86-64 (the usual 64-bit PC and server CPU), why does `count` start 4 bytes from the start of `Rec`, not 1?

---

**`int` has alignment 4: its address must be a multiple of
`alignof(int)`.** Every complete type has an alignment requirement, so
the compiler inserts three padding bytes after `tag`. Misaligned objects
are undefined behaviour in C++; on the hardware a misaligned load may
take two memory accesses, or fault.
