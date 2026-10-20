---
id: ptr-trace-reference-assign
kind: trace
version: 3
level: 1
tags: [references, tracing]
requires:
  - ptr-reference-cannot-rebind
probes:
  1: { a: "8", b: "8" }
  2: { a: "9", b: "1" }
elaborate: Say where in real code `r = b;` meaning "copy b into a" could surprise a reader.
refs:
  - https://en.cppreference.com/w/cpp/language/reference#Lvalue_references
  - https://eel.is/c++draft/dcl.ref#5
---

```cpp
int a = 3, b = 8;
int& r = a;
r = b;          // @1
b = 1;
r += b;         // @2
```

---

`r = b` copies `b`'s value (8) into `a`; it does not make `r` refer to
`b`. So `b = 1` leaves `a` alone, and `r += b` adds 1 to `a`, giving 9.
Every use of `r` after its declaration is a use of `a`. Verified by
running an instrumented copy under GCC 16.2 (`g++ -std=c++23`).
