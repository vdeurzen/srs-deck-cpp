---
id: linkage-include-guard
kind: chunk
version: 1
level: 1
tags: [linkage, headers, preprocessor]
expose_ms: 6000
compile:
  harness: |
    // the same header reaches this translation unit a second time:
    #ifndef GEOM_POINT_H
    #define GEOM_POINT_H
    struct Point { int x; int y; };
    #endif
    int main() { Point p{1, 2}; return p.x - 1; }
requires:
  - linkage-translation-unit
refs:
  - https://en.cppreference.com/w/cpp/preprocessor/include
  - https://en.cppreference.com/w/cpp/preprocessor/conditional
---

```cpp
#ifndef GEOM_POINT_H
#define GEOM_POINT_H
struct Point { int x; int y; };
#endif
```

---

**The include guard.** `point.h` often reaches one `.cpp` twice, through
two other headers. The `#define` sets the very macro the `#ifndef` tests,
so the second copy expands to nothing instead of redefining `Point`; a
mismatched name is the classic typo. `#pragma once` is the non-standard,
universally supported one-line alternative. A guard works per translation
unit only: it never stops two `.cpp` files defining the same variable.
