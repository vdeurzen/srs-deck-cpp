---
id: linkage-explain-build
kind: explain
version: 1
level: 2
tags: [linkage, headers, build]
requires:
  - linkage-inline-header-fix
  - linkage-extern-global-variable
refs:
  - https://en.cppreference.com/w/cpp/language/translation_phases
  - https://en.cppreference.com/w/cpp/language/definition#One_Definition_Rule
---
A teammate's program is `main.cpp` plus `util.cpp`, sharing `util.h`.
Walk them through how it is built into one executable, and which error
comes from which step.
---
- [ ] `#include` pastes the header's text; each `.cpp` plus its pasted headers is one translation unit, compiled alone
- [ ] A translation unit must see a declaration of everything it uses, so headers carry declarations; a missing one is a compile error
- [ ] The linker joins the translation units; a used function or variable that no unit defines gives `undefined reference`
- [ ] Two units defining the same non-`inline` function or variable gives `multiple definition` at link time
- [ ] `inline` lets an identical definition sit in every translation unit and still be one entity, which is how a header may define a function
