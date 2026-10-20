---
id: ptr-star-declarator-vs-deref
kind: basic
version: 1
level: 2
tags: [pointers, operators, declarations]
requires:
  - ptr-amp-and-star-cloze
elaborate: Say aloud the two different jobs `&` does in `int& r = n;` and `int* p = &n;`.
refs:
  - https://en.cppreference.com/w/cpp/language/pointer#Pointers
  - https://eel.is/c++draft/dcl.ptr#1
---

## This code has four `*`s. Which of them reach `n` through `p`?

```cpp
int n = 4;
int* p = &n;
*p = 7;
int m = *p * 2;
```

---

**The `*` in `*p = 7;` and the first `*` in `*p * 2`.**

In a declaration, `int* p` makes `*` part of `p`'s type: "pointer to
`int`", no object is reached. In an expression, `*p` dereferences. Between
two operands, `*p * 2`, the second `*` is plain multiplication.
