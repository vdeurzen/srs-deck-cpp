---
id: linkage-which-step-fails
kind: cloze
version: 1
level: 1
tags: [linkage, build, declarations]
requires:
  - linkage-translation-unit
refs:
  - https://en.cppreference.com/w/cpp/language/definition
  - https://en.cppreference.com/w/cpp/language/translation_phases
elaborate: Say which of the two messages you would get after renaming `area` in its `.cpp` file only, and why.
---

`main.cpp` calls `area(2, 3)`.

- If `main.cpp` includes `rect.h`, which declares `area`, but no file in
  the build has its body, the build stops with
  `undefined reference to 'area(int, int)'`, a message from the
  {{c1::linker::a build step}}.
- If `main.cpp` forgets the `#include`, so nothing declares `area` before
  the call, it stops with `'area' was not declared in this scope`, from
  the {{c2::compiler::a build step}}.
