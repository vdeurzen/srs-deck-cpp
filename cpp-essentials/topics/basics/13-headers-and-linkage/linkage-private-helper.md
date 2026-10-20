---
id: linkage-private-helper
kind: basic
version: 1
level: 2
tags: [linkage, namespaces]
requires:
  - linkage-odr-counting
  - fn-namespace-clash
refs:
  - https://en.cppreference.com/w/cpp/language/namespace#Unnamed_namespaces
  - https://eel.is/c++draft/basic.link
elaborate: Say which helpers in a `.cpp` file you know belong in an unnamed namespace, and what a name clash would cost without it.
---

## `a.cpp` and `b.cpp` each define a helper `int clamp01(int v)` for their own use, with different bodies. The link fails with `multiple definition`. What should each file do?

---

**Give each helper internal linkage: wrap it in `namespace { ... }` or
declare it `static`.** The name is then private to its translation unit,
so the linker never sees two. `inline` would not do: it demands
identical definitions.
