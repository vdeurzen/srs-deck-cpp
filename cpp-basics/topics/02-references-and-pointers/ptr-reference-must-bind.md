---
id: ptr-reference-must-bind
kind: basic
version: 1
level: 1
tags: [references]
refs:
  - https://en.cppreference.com/w/cpp/language/reference
  - https://eel.is/c++draft/dcl.ref#5
---

## `int* p;` compiles, but `int& r;` is an error. What rule about references does that error enforce?

---

**A reference must be bound to an object at the moment it is
declared.** A reference is another name for an existing object, not an
object holding an address, so there is no "unbound" or null state to
start from. Code receiving a reference needs no null check (though the
object can still die while the reference remains).
