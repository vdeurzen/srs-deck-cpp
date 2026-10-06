---
id: linkage-odr-class-repeat
kind: basic
version: 1
level: 2
tags: [linkage, odr, headers]
requires:
  - linkage-translation-unit
refs:
  - https://en.cppreference.com/w/cpp/language/definition#One_Definition_Rule
  - https://eel.is/c++draft/basic.def.odr
---

## Every `.cpp` that includes `point.h` gets its own definition of `struct Point`. Why is that not a multiple-definition error?

---

**The One Definition Rule allows one class definition per translation
unit, provided all of them are identical.** A class is a type, not an
object the linker places, so nothing clashes. The same "once per
translation unit, identical everywhere" rule covers inline functions and
variables and templates.
