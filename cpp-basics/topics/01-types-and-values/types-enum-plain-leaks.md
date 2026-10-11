---
id: types-enum-plain-leaks
kind: basic
version: 1
level: 1
tags: [types, enums, scope]
refs:
  - https://en.cppreference.com/w/cpp/language/enum#Unscoped_enumerations
  - https://eel.is/c++draft/dcl.enum#12
---

## Why does this header fail to compile?

```cpp
enum Fill   { none, solid };
enum Border { none, dashed };
```

---

**Both enums put `none` into the same surrounding scope, so it is declared
twice.** A plain `enum` injects its enumerators into the enclosing scope.
`enum class` keeps them inside the enum's own scope instead: with it,
`Fill::none` and `Border::none` are two distinct names and the header
compiles.
