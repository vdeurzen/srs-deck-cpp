---
id: linkage-header-static-trace
kind: trace
version: 1
level: 3
tags: [linkage, inline, tracing]
probes:
  1: { id: "2" }
  2: { tag: "1" }
requires:
  - linkage-inline-meaning
  - linkage-internal-linkage
refs:
  - https://en.cppreference.com/w/cpp/language/storage_duration#Linkage
  - https://en.cppreference.com/w/cpp/language/inline
---

```cpp
// ids.h, included by a.cpp and b.cpp
inline int next_id()  { static int n = 0; return ++n; }
static int next_tag() { static int n = 0; return ++n; }

// a.cpp: int a_id() { return next_id(); }  int a_tag() { return next_tag(); }
// b.cpp: int b_id() { return next_id(); }  int b_tag() { return next_tag(); }

// main.cpp
a_id();
int id = b_id();     // @1
a_tag();
int tag = b_tag();   // @2
```

---

An `inline` function is one entity across the program, so its
function-local `static` is one object: `a.cpp`'s call made it 1 and
`b.cpp`'s makes it 2. A namespace-scope `static` function has **internal
linkage**: each translation unit gets its own private copy, with its own
`n`, so `b_tag()` starts from 0 and returns 1. `static` in a header is
the classic way to get per-file state by accident. Values from building
the three files separately with GCC 16.2 (`g++ -std=c++23`, at `-O0` and
`-O2`) and running the result.
