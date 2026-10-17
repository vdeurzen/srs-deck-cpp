---
id: virtual-static-dynamic-type
kind: basic
version: 1
level: 1
tags: [inheritance, types]
requires:
  - virtual-is-a
  - ptr-reference-must-bind
refs:
  - https://eel.is/c++draft/defns.dynamic.type
  - https://eel.is/c++draft/defns.static.type
---

## `Dog` derives publicly from `Animal`. While `groom(rex)` runs, what is the *dynamic* type of the object `pet` refers to?

```cpp
void groom(Animal& pet) { /* ... */ }

Dog rex;
groom(rex);
```

---

**`Dog`.** The dynamic type is the type of the object actually there,
fixed when that object was created. The *static* type is the type the
code declares, `Animal` for `pet`, and it is all the compiler sees when
it checks `groom`'s body. A base-class reference or pointer is exactly
where the two differ.
