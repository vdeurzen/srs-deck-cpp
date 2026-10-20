---
id: linkage-build-pipeline
kind: basic
version: 1
level: 1
tags: [linkage, build, translation-units, foundations]
requires:
  - linkage-include-is-paste
  - fn-declaration-vs-definition
elaborate: Say why misspelling a function's name in its definition shows up as a linker error, not a compiler error.
refs:
  - https://en.cppreference.com/w/cpp/language/translation_phases
  - https://eel.is/c++draft/lex.phases
---

`a.cpp` declares `void record(int);` and calls `record(3)`; the
definition is in `b.cpp`. A build runs three steps: preprocess, compile,
link.

## If `b.cpp` is left out of the build, which of the three steps fails?

---

**Linking: compiling `a.cpp` needs only the declaration; the linker needs the body.**

The compiler turns each `.cpp` file, headers pasted in, into an object
file on its own, leaving `record` as an unresolved name. The linker then
joins the object files into one program and must find each used name's
definition.
