---
id: linkage-include-is-paste
kind: basic
version: 1
level: 1
tags: [headers, preprocessor, translation-units]
refs:
  - https://en.cppreference.com/w/cpp/preprocessor/include
  - https://en.cppreference.com/w/cpp/language/translation_phases
---

## `main.cpp` starts with `#include "rect.h"`. What does the compiler actually receive in place of that line?

---

**The whole text of `rect.h`, pasted in by the preprocessor.**

A header is never compiled on its own. The compiler works on one `.cpp`
file plus everything pasted into it, a **translation unit**, so a header
included by five `.cpp` files is compiled five times.
