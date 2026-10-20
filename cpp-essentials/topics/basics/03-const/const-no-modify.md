---
id: const-no-modify
kind: basic
version: 1
level: 1
tags: [const]
refs:
  - https://en.cppreference.com/w/cpp/language/cv
  - https://eel.is/c++draft/dcl.type.cv
---

## Given `const int limit = 10;`, what does the compiler do with `limit = 20;` or `++limit;`?

---

**Rejects both: a `const` object cannot be modified through its name.**
`const` is a promise checked at compile time: after initialization,
assignment, increment, or any other write to `limit` is an error. It
costs nothing at run time, and turns "someone changed my setting" bugs
into compile errors.
