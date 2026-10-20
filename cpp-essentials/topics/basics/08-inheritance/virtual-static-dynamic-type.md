---
id: virtual-static-dynamic-type
kind: basic
version: 2
level: 1
tags: [inheritance, types]
requires:
  - virtual-is-a
elaborate: Say where in code you know a `Base&` parameter really refers to a derived object, and how you could tell from reading the call site.
refs:
  - https://eel.is/c++draft/defns.dynamic.type
  - https://eel.is/c++draft/defns.static.type
---

## `Dog` derives publicly from `Animal`, and `groom(rex)` passes it a `Dog`. When the compiler compiles `groom`'s body, which type does it know `pet` refers to: `Animal`, `Dog`, or both?

```cpp
void groom(Animal& pet) { /* ... */ }

Dog rex;
groom(rex);
```

---

**Only `Animal`, the *static* type: `Dog`, the *dynamic* type, is known only at run time.**
The static type is the one the code declares for `pet`. The dynamic type
is the type of the object actually there, fixed when it was created.
`groom` is compiled once for every `Animal` it may receive.
