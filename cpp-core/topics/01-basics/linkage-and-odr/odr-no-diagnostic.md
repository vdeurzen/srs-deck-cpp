---
id: linkage-odr-no-diagnostic
kind: basic
version: 1
level: 3
tags: [linkage, odr, misconception, undefined-behaviour]
requires:
  - linkage-odr-class-repeat
refs:
  - https://en.cppreference.com/w/cpp/language/definition#One_Definition_Rule
  - https://eel.is/c++draft/basic.def.odr
elaborate: What in your build (vendored copies, `#ifdef`-dependent members, mismatched flags) could give one class two definitions?
---

## `a.cpp` defines `struct Point { int x, y; };`, `b.cpp` defines `struct Point { int x, y, z; };`, and both call `void show(Point)`. The program links. Is it correct?

---

**No: it violates the One Definition Rule, which is ill-formed, no
diagnostic required.** Class definitions may repeat across translation
units only if they are identical. The linker matches symbol names, never
class layouts, so it stays silent; the program then has undefined
behaviour, for example `b.cpp` reading a `z` that `a.cpp` never passed.
