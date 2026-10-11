---
id: linkage-extern-declaration
kind: code
version: 1
level: 2
tags: [linkage, headers]
input: chips
choices:
  c1: ["extern int", "int", "static int", "inline int"]
compile:
  harness: |
    int main() { ++requests; }
requires:
  - linkage-translation-unit
refs:
  - https://en.cppreference.com/w/cpp/language/definition
  - https://en.cppreference.com/w/cpp/language/storage_duration#Linkage
---

Every `.cpp` that counts requests includes this header, and `stats.cpp`
holds the variable. Complete the header line.

```cpp
// stats.h
{{c1::extern int}} requests;

// stats.cpp, after #include "stats.h"
int requests = 0;
```

---

`extern int requests;` is a **declaration without a definition**: it
promises the object exists somewhere with external linkage, so every
translation unit can use it and only `stats.cpp` creates it. Plain
`int requests;` is already a definition, so with it every includer
defines `requests` (a link error), and `stats.cpp` defines it twice. `inline int` is a definition too. `static int` is
worse: `stats.cpp` still fails, and every other file would get its own
private counter. Prototypes and function bodies follow the same split.
