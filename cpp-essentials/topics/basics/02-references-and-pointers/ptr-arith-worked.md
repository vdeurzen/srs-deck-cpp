---
id: ptr-arith-worked
kind: basic
version: 1
level: 2
tags: [pointers, arrays, worked-example]
requires:
  - ptr-subtract-counts-elements
  - ptr-subscript-is-deref
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Additive_operators
  - https://eel.is/c++draft/expr.sub#2
---

`int v[3] = {10, 20, 30};`, step by step:

| statement | state after | why |
| --- | --- | --- |
| `int* p = v;` | `p` at `v[0]` (10) | array name converts |
| `++p;` | `p` at `v[1]` (20) | one element along |
| `int* q = p + 1;` | `q` at `v[2]` (30) | one more element |
| `int gap = q - p;` | `gap` is 1 | elements between them |
| `p[1] = 0;` | `v[2]` is 0 | `*(p + 1)` |

## Why does `p[1] = 0;` change `v[2]`, not `v[1]`?

---

**`p[1]` counts from where `p` points now, `v[1]`, not from `v[0]`.**

`p[1]` is `*(p + 1)`, and `++p` already moved `p` one element along.
A pointer carries only its current position; nothing remembers where
the array started.
