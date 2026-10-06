---
id: linkage-translation-unit
kind: basic
version: 1
level: 1
tags: [linkage, translation-units]
refs:
  - https://en.cppreference.com/w/cpp/language/translation_phases
  - https://en.cppreference.com/w/cpp/language/storage_duration#Linkage
elaborate: Go compiles a whole package at once; where does that hide this failure from you?
---

## `a.cpp` and `b.cpp` both define `int counter = 0;` at namespace scope. Each compiles on its own. Which build step fails?

---

**The link: `counter` now has two definitions with external linkage.**
Each `.cpp` plus everything it `#include`s is one **translation unit**,
compiled in isolation; no compile step ever sees both. Only the linker
does, and GNU ld reports `multiple definition of 'counter'`.
