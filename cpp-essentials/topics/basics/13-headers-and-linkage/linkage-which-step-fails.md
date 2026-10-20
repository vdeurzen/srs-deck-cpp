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
elaborate: Say which other message would tell you the compiler, not the linker, stopped the build.
---

`main.cpp` includes `rect.h` and calls `area(2, 3)`. `rect.h` declares
`area`, but no file in the build has its body. The build stops with
`undefined reference to 'area(int, int)'`, a message from the
{{c1::linker::a build step}}.
