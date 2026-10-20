---
id: ptr-reference-vs-pointer
kind: basic
version: 1
level: 1
tags: [pointers, references]
requires:
  - ptr-pointer-param-meaning
elaborate: Say in one sentence, as to an interviewer, when you would hold a pointer member rather than a reference member.
refs:
  - https://en.cppreference.com/w/cpp/language/reference
  - https://en.cppreference.com/w/cpp/language/pointer
---

## `p = &y;` makes `p` point at `y`. What does `r = y;` do?

```cpp
int x = 1, y = 2;
int& r = x;
int* p = &x;
p = &y;
r = y;
```

---

**It copies `2` into `x`; `r` still refers to `x`.** A reference is bound
once, at initialisation, and every later use of `r` *is* a use of `x`, so
it can never be re-pointed. A pointer is an object holding an address, and
assigning it changes the address. A member that must switch targets later
needs a pointer.
