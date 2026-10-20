---
id: ptr-reference-cannot-rebind
kind: basic
version: 2
level: 1
tags: [references, misconception]
requires:
  - ptr-reference-must-bind
elaborate: Say where in your own code you would reach for a pointer instead of a reference, because the target must change later.
refs:
  - https://en.cppreference.com/w/cpp/language/reference
  - https://eel.is/c++draft/dcl.ref#5
---

Many expect `r = b;` to make `r` refer to `b` from then on.

```cpp
int a = 1, b = 2;
int& r = a;
r = b;
```

## After the last line, what are `a` and `b`?

---

**Both are 2: `r = b;` copies 2 into `a`, and `r` still refers to `a`.**

A reference stays bound to the object it was initialised with, so
`r = b;` means `a = b;`. It looks like re-pointing because assigning a
pointer, `p = &b;`, does re-point; to switch targets later you need a
pointer.
