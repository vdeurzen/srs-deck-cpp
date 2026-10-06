---
id: ptr-trace-reseat-vs-alias
kind: trace
version: 1
level: 1
tags: [pointers, references, tracing]
requires:
  - ptr-reference-vs-pointer
  - ptr-element-count
probes:
  1: { "a[1]": "20", r: "20" }
  2: { "a[2]": "4", r: "20" }
  3: { "a[1]": "0", r: "0" }
refs:
  - https://en.cppreference.com/w/cpp/language/reference
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Additive_operators
---

```cpp
int a[4] = {1, 2, 3, 4};
int* p = a + 1;
int& r = *p;
*p = 20;            // @1
++p;
*p += 1;            // @2
r = 0;              // @3
```

---

`p` starts at `a[1]`, and `r` is bound to the object `p` points at —
`a[1]` itself, not `p`. Writing through either at Probe 1 changes that
one `int`, so `a[1]` and `r` both read `20`. `++p` reseats the pointer one
element on; `*p += 1` now touches `a[2]`, while `r` has not moved and
still reads `20`. At Probe 3, `r = 0` writes `a[1]`: a reference cannot be
reseated, so what it named when it was initialised is what it names for
good. The pointer is the thing that moves. Verified by compiling and
running this program under GCC 16.2 (`g++ -std=c++23`).
