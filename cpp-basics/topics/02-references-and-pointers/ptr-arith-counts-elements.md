---
id: ptr-arith-counts-elements
kind: basic
version: 1
level: 1
tags: [pointers, arrays]
requires:
  - cpp-essentials/ptr-array-name-to-pointer
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Additive_operators
  - https://eel.is/c++draft/expr.add#4
---

## `p` points to `v[0]` of an `int v[5]`, and `int` is 4 bytes. By how many bytes does the address in `p + 2` differ from `p`?

---

**8 bytes: `p + 2` is `&v[2]`, two `int`s along.** Pointer arithmetic
counts elements of the pointed-to type, and the compiler scales by
`sizeof(int)` for you. So `p + i` is `&v[i]` whatever the element size,
and it is defined only while it stays inside the array or one past its
end.
