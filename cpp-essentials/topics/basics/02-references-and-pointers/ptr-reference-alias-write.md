---
id: ptr-reference-alias-write
kind: basic
version: 1
level: 1
tags: [references]
refs:
  - https://en.cppreference.com/w/cpp/language/reference
  - https://eel.is/c++draft/dcl.ref#1
---

## `int& r = a;` declares `r` as a reference to `a`. What are `a` and `b` after the last line?

```cpp
int a = 1;
int b = a;
int& r = a;
r = 5;
```

---

**`a` is 5 and `b` is 1: a reference is another name for `a`.**

`b` is a separate object holding a copy of 1, so later writes to `a`
never reach it. `r` is not an object of its own: assigning to `r`
assigns to `a`, exactly as if the line said `a = 5;`.
