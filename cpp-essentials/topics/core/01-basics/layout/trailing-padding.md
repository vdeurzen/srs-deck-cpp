---
id: layout-trailing-padding
kind: basic
version: 2
level: 2
tags: [layout, alignment, padding]
requires:
  - layout-padding-worked
  - class-struct-members
elaborate: Where else does "the size is rounded up so the next one starts aligned" show up, for example in a buffer of records you lay out by hand?
refs:
  - https://eel.is/c++draft/expr.sizeof#2
  - https://en.cppreference.com/w/cpp/language/sizeof
---

On x86-64 (`alignof`: `char` 1, `double` 8), both structs are 16 bytes.

```cpp
struct A { char c; double d; };
struct B { double d; char c; };
```

## Where are the 7 padding bytes in each?

---

**`A`: between `c` and `d`. `B`: after `c`, at the end.**

In `A`, `d` must start at a multiple of 8, so bytes 1–7 are padding. In
`B` the data ends at 9, and `sizeof` rounds up to a multiple of
`alignof(B)` = 8 so that `B[1].d` stays aligned: trailing padding.
