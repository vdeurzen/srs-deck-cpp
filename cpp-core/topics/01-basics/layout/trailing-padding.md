---
id: layout-trailing-padding
kind: basic
version: 1
level: 2
tags: [layout, alignment, padding]
requires:
  - layout-padding-sizeof
refs:
  - https://eel.is/c++draft/expr.sizeof#2
  - https://en.cppreference.com/w/cpp/language/sizeof
---

## `struct S { double d; char c; };` holds 9 bytes of data, yet `sizeof(S)` is 16 on x86-64. Why?

---

**`sizeof` includes trailing padding so every element of an `S[]` keeps
`d` 8-byte aligned.** Array elements sit exactly `sizeof(S)` apart, so
`sizeof` is always a multiple of `alignof(S)`, which is the largest
member alignment (8 here). With a size of 9, `arr[1].d` would land on
offset 9.
