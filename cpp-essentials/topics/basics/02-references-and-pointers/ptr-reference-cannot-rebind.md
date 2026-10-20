---
id: ptr-reference-cannot-rebind
kind: basic
version: 1
level: 1
tags: [references]
requires:
  - ptr-reference-must-bind
elaborate: Say what a Go programmer expects `r = b;` to do, and why C++ gives a different result.
refs:
  - https://en.cppreference.com/w/cpp/language/reference
  - https://eel.is/c++draft/dcl.ref#5
---

## After `int& r = a;`, is there any statement that makes `r` refer to `b` instead?

---

**No: a reference stays bound to the object it was initialised with.**
`r = b;` is legal but means `a = b;`: every use of `r` is a use of `a`.
To switch targets later you need a pointer, which is an object whose
value (the address) you can overwrite.
