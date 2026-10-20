---
id: linkage-explain-build
kind: explain
version: 2
level: 2
tags: [linkage, headers, build]
requires:
  - linkage-inline-header-fix
  - linkage-extern-global-variable
refs:
  - https://en.cppreference.com/w/cpp/language/translation_phases
  - https://en.cppreference.com/w/cpp/language/definition#One_Definition_Rule
elaborate: Say which of the two link errors, `undefined reference` or `multiple definition`, you would expect first in a new project, and why.
---
A teammate's program is `main.cpp` plus `util.cpp`, sharing `util.h`.
Walk them through how it is built into one executable.
---
- [ ] Problem: each `.cpp` compiles alone, so a header shares the declarations every file needs
- [ ] Mechanism: each `.cpp` file, with its headers pasted in, compiles to an object file the linker joins
- [ ] Example: a function `util.h` declares but no file defines fails at link time with `undefined reference`
- [ ] Trade-off: `inline` lets a header carry a function's definition, provided every copy is identical
- [ ] Pitfall: a non-`inline` function defined in a header fails to link with `multiple definition`
