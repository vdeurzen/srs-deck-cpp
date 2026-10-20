---
id: ptr-reference-must-bind
kind: basic
version: 2
level: 1
tags: [references]
requires:
  - ptr-reference-alias-write
  - ptr-holds-an-address
elaborate: Say in one sentence what bug a reference parameter rules out that a pointer parameter allows.
refs:
  - https://en.cppreference.com/w/cpp/language/reference
  - https://eel.is/c++draft/dcl.ref#5
---

## Which of these two declarations compiles on its own: `int* p;`, `int& r;`, both or neither?

---

**Only `int* p;`: a reference must be bound to an object when it is declared.**
A reference is another name for an existing object, not an object
holding an address, so there is no "unbound" state to start from. Code
receiving a reference needs no "is it there?" check (though the object
can still die while the reference remains).
