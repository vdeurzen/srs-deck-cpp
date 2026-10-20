---
id: layout-padding-worked
kind: basic
version: 1
level: 1
tags: [layout, alignment, padding, worked-example]
requires:
  - layout-alignment
  - types-size-minimums
  - class-struct-members
refs:
  - https://en.cppreference.com/w/cpp/language/object#Alignment
  - https://eel.is/c++draft/expr.sizeof#2
---

On x86-64 (`alignof`: `char` 1, `short` 2, `int` 4), the compiler lays
out `struct Rec { char tag; int n; short id; char flag; };` in order:

| member | alignment | next free byte | placed at |
| --- | --- | --- | --- |
| `tag` (`char`) | 1 | 0 | 0 |
| `n` (`int`) | 4 | 1 | 4, after 3 padding |
| `id` (`short`) | 2 | 8 | 8, no padding |
| `flag` (`char`) | 1 | 10 | 10 |
| end of `Rec` | 4, its largest | 11 | `sizeof` 12 |

## No member follows `flag`, yet the last row rounds the size from 11 up to 12. Why?

---

**So every `Rec` in an array starts on a multiple of 4, keeping `n` aligned.**

Array elements sit exactly `sizeof(Rec)` apart. At size 11, the second
element's `n` would land at 15, not a multiple of 4. So `sizeof` is
always a multiple of the struct's alignment, its largest member's.
