---
id: linkage-include-guard-intro
kind: basic
version: 1
level: 1
tags: [headers, preprocessor]
requires:
  - linkage-odr-class-repeat
  - class-struct-members
elaborate: Say why a header that only declares functions would compile without this line, yet should still have it.
refs:
  - https://en.cppreference.com/w/cpp/preprocessor/include
  - https://en.cppreference.com/w/cpp/preprocessor/impl#pragma_once
---

## `main.cpp` includes `point.h` and `draw.h`, and `draw.h` includes `point.h` too. Compiling `main.cpp` fails with `redefinition of 'struct Point'`. What one line at the top of `point.h` fixes it?

```cpp
// point.h
struct Point { int x; int y; };
```

---

**`#pragma once`: later `#include`s of `point.h` in the same file paste nothing.**

Both includes pasted `Point` into one translation unit, and a class may
be defined only once per translation unit. The portable spelling is an
*include guard*: `#ifndef POINT_H` / `#define POINT_H` at the top,
`#endif` at the end.
