---
id: linkage-chunk-header-source
kind: chunk
version: 1
level: 1
tags: [headers, declarations, idioms]
expose_ms: 7000
compile: null
requires:
  - linkage-prototype-in-header
  - linkage-guard-define-line
refs:
  - https://en.cppreference.com/w/cpp/preprocessor/include
  - https://en.cppreference.com/w/cpp/language/definition
---

```cpp
// temp.h
#pragma once
double to_fahrenheit(double celsius);

// temp.cpp
#include "temp.h"
double to_fahrenheit(double celsius) { return celsius * 9 / 5 + 32; }
```

---

**The header/source pair.** The header holds only the declaration, which
every caller needs, and `#pragma once` stops it being pasted twice into
one file. The `.cpp` includes its own header first, so a mismatch with
the declaration shows up there, and holds the single definition.
