---
id: linkage-explain-build
kind: explain
version: 3
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
Walk them through how the files become one executable, and what may go
in `util.h` without breaking the link.
---
- [ ] Each `.cpp` file, with its headers pasted in, compiles alone into an object file
- [ ] The linker then joins the object files into one executable
- [ ] A function `util.h` declares but no file defines fails at link time with `undefined reference`
- [ ] A non-`inline` function defined in `util.h` is defined in both files, so linking fails with `multiple definition`
- [ ] `inline` lets the header carry a function's definition, provided every copy is identical
