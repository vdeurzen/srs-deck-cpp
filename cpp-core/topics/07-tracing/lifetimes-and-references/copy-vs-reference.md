---
id: trace-copy-vs-reference
kind: trace
version: 1
level: 2
tags: [tracing, references]
probes:
  1: { a: "1", b: "1" }
  2: { a: "99", b: "1" }
  3: { a: "99", b: "5" }
requires:
  - ptr-reference-vs-pointer
refs:
  - https://en.cppreference.com/w/cpp/language/reference
---

```cpp
int a = 1;
int b = a;        // @1
int& r = a;
r = 99;            // @2
b = 5;              // @3
```

---

`int b = a;` copies `a`'s value into a brand-new object; nothing connects
`a` and `b` afterwards, so assigning through `b` later never touches `a`.
`int& r = a;` is the opposite: `r` is not a new object at all, just
another name for `a`, so `r = 99;` changes `a` itself. Verified by running an instrumented copy under GCC 16.2
(`g++ -std=c++23`).
