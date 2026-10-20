---
id: layout-alignas-intro
kind: basic
version: 2
level: 1
tags: [layout, alignment, foundations]
requires:
  - layout-trailing-padding
  - class-struct-members
elaborate: Say in one sentence what this costs in memory, and when you would pay it.
refs:
  - https://en.cppreference.com/w/cpp/language/alignas
  - https://eel.is/c++draft/dcl.align
---

On x86-64 a `double` is 8 bytes with alignment 8; a `char` is 1 byte.

```cpp
struct Tick {
    double bid;
    double ask;
    double last;
    alignas(16) char flag;
};
```

## At what offset from the start of a `Tick` does `flag` start?

---

**32: the first multiple of 16 at or after byte 24.**

`alignas(N)` raises a member's alignment requirement to `N`. The three
`double`s end at byte 24, which is not a multiple of 16, so the compiler
inserts 8 padding bytes before `flag`.
