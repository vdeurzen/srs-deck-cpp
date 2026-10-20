---
id: linkage-tu-contents
kind: basic
version: 1
level: 1
tags: [linkage, build, foundations]
requires:
  - linkage-build-pipeline
elaborate: Say aloud why editing one header makes every `.cpp` that includes it recompile.
refs:
  - https://en.cppreference.com/w/cpp/language/translation_phases
  - https://eel.is/c++draft/lex.separate
---

```cpp
// point.h
struct Point { int x; int y; };

// a.cpp
#include "point.h"
int norm2(Point p) { return p.x * p.x + p.y * p.y; }
```

## The compiler works on one *translation unit* at a time. What text makes up the translation unit for `a.cpp`?

---

**`a.cpp` with `point.h`'s text pasted in where it is included.**

Preprocessing replaces each `#include` with the header's contents. That
one stream is what the compiler sees, and nothing from any other `.cpp`
file. Every `.cpp` in the build is its own translation unit.
