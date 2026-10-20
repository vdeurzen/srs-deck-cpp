---
id: ptr-reference-must-bind
kind: basic
version: 2
level: 1
tags: [references]
requires:
  - ptr-holds-an-address
elaborate: Say in one sentence what a Go programmer gains when a C++ function takes `T&` instead of `T*`.
refs:
  - https://en.cppreference.com/w/cpp/language/reference
  - https://eel.is/c++draft/dcl.ref#5
---

## `int& r = a;` makes `r` a reference: another name for `a`. Which of these two declarations compiles on its own: `int* p;` or `int& r;`?

---

**Only `int* p;`: a reference must be bound to an object when it is declared.**
A reference is another name for an existing object, not an object
holding an address, so there is no "unbound" state to start from. Code
receiving a reference needs no "is it there?" check (though the object
can still die while the reference remains).
