---
id: ptr-reference-vs-pointer
kind: basic
version: 1
level: 1
tags: [pointers, references]
refs:
  - https://en.cppreference.com/w/cpp/language/reference
  - https://en.cppreference.com/w/cpp/language/pointer
---

## `int& r = x;` versus `int* p = &x;` — what single property decides which one a parameter or member should be?

---

**Whether "none" or "a different one later" must be representable.** A
pointer is an object holding an address: it can be null, reseated,
compared, stepped. A reference is a name bound once, at
initialisation, to an object that must exist: never null, never reseated;
using `r` *is* using `x`. Target guaranteed and fixed: reference.
Optional or re-pointable: pointer.
