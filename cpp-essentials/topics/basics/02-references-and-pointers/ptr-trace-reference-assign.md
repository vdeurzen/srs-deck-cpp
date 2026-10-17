---
id: ptr-trace-reference-assign
kind: trace
version: 1
level: 1
tags: [references, tracing]
requires:
  - ptr-reference-cannot-rebind
  - ptr-amp-and-star-cloze
probes:
  1: { a: "2", b: "2" }
  2: { a: "2", r: "2" }
  3: { a: "3", b: "7" }
  4: { a: "0" }
refs:
  - https://en.cppreference.com/w/cpp/language/reference#Lvalue_references
  - https://eel.is/c++draft/dcl.ref#5
---

```cpp
int a = 1, b = 2;
int& r = a;
r = b;          // @1
b = 7;          // @2
r += 1;         // @3
int* p = &r;
*p = 0;         // @4
```

---

`r = b` copies `b`'s value (2) into `a`; it does not make `r` refer to
`b`. So the later `b = 7` does not reach `r`, which still reads 2.
`r += 1` is `a += 1`. Even `&r` is the address of `a`, so writing through
`p` zeroes `a`. Every use of `r` after its declaration is a use of `a`.
