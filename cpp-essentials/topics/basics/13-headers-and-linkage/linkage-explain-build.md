---
id: linkage-explain-build
kind: explain
version: 4
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
Walk them through what may go in `util.h` without breaking the link.
---
- [ ] `util.h` is pasted into both `.cpp` files, so whatever it holds ends up in both object files
- [ ] Function declarations are safe: the linker needs only one body for each, here in `util.cpp`
- [ ] A non-`inline` function defined in `util.h` is defined twice, so linking fails with `multiple definition`
- [ ] An `inline` function may be defined in `util.h`, provided every copy is identical
- [ ] A global variable goes in as `extern int x;`, with its one definition in a `.cpp` file
