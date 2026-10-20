---
id: linkage-odr-class-repeat
kind: basic
version: 1
level: 2
tags: [linkage, odr, headers]
requires:
  - linkage-translation-unit
elaborate: Say aloud what goes wrong, and who would notice, if two `.cpp` files saw different definitions of the same `struct Point`.
refs:
  - https://en.cppreference.com/w/cpp/language/definition#One_Definition_Rule
  - https://eel.is/c++draft/basic.def.odr
---

## Every `.cpp` that includes `point.h` gets its own definition of `struct Point`. Why is that not a multiple-definition error?

---

**The One Definition Rule allows one class definition per translation
unit, provided all of them are identical.** The linker only places
functions and variables; a class is a type, so it gives the linker
nothing to clash over.
