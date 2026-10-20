---
id: layout-alignas-intro
kind: basic
version: 1
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

On x86-64 an `int` is 4 bytes with alignment 4.

```cpp
struct Pair {
    int a;
    alignas(64) int b;
};
```

## At what offset from the start of a `Pair` does `b` start?

---

**64: `alignas(64)` makes `b`'s address a multiple of 64.**

`alignas(N)` raises an alignment requirement to `N`. `Pair` takes its
largest member alignment, 64, so the compiler pads 60 bytes after `a`. On a type, `struct alignas(64) S`
raises the alignment of every `S`.
