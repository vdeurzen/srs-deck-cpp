---
id: linkage-which-step-fails
kind: cloze
version: 1
level: 1
tags: [linkage, build, declarations]
requires:
  - linkage-prototype-in-header
refs:
  - https://en.cppreference.com/w/cpp/language/definition
  - https://en.cppreference.com/w/cpp/language/translation_phases
---

`main.cpp` calls `area`, and `rect.h` declares it, but no file in the
build has the body. Every file compiles; the build then stops with
`undefined reference to 'area(int, int)'`. That message comes from the
{{c1::linker::a build step}}, the only step that sees all the compiled
files together and matches each use to a definition.
