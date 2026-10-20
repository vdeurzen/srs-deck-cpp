---
id: class-init-list-which-first
kind: basic
version: 1
level: 2
tags: [classes, constructors, initialization]
requires:
  - class-ctor-colon-part
elaborate: Say in one sentence, as to an interviewer, which member an initialiser may safely read, and how you would reorder a class to make an unsafe read safe.
refs:
  - https://eel.is/c++draft/class.base.init#13
  - https://en.cppreference.com/w/cpp/language/constructor#Initialization_order
---

```cpp
struct Range {
    int lo;
    int hi;
    Range(int n) : hi(n), lo(hi - 1) {}
};
Range r(5);
```

## Which member of `r` is initialised first: `hi`, written first in the list, or `lo`?

---

**`lo`: members are initialised in declaration order; the list's order is ignored.**

So `lo(hi - 1)` reads `hi` before `hi` has been initialised, and `r.lo`
is not 4. GCC's `-Wreorder` (part of `-Wall`) warns when the list
is written in a different order from the declarations.
