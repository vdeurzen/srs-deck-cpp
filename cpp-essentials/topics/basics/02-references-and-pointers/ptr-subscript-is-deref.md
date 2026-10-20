---
id: ptr-subscript-is-deref
kind: basic
version: 1
level: 2
tags: [pointers, arrays]
requires:
  - ptr-arith-counts-elements
  - ptr-amp-and-star-cloze
elaborate: Say aloud why `v[i]` works the same whether `v` is an array or a pointer to its first element.
refs:
  - https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_subscript_operator
  - https://eel.is/c++draft/expr.sub#2
---

## What value does `p[2]` read?

```cpp
int v[4] = {5, 6, 7, 8};
int* p = &v[1];
int x = p[2];
```

---

**8: `p[i]` means `*(p + i)`, counted from where `p` points.**

`p` points at `v[1]`, so `p + 2` is `&v[3]` and `p[2]` reads the 8
there. Subscripting a pointer is pointer arithmetic plus a dereference;
it knows nothing about where the array starts.
