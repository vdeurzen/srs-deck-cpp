---
id: types-cstyle-reinterprets
kind: basic
version: 1
level: 2
tags: [types, conversions, casts, pointers]
requires:
  - cpp-essentials/types-static-cast-value
  - types-reinterpret-cast-intro
refs:
  - https://en.cppreference.com/w/cpp/language/explicit_cast
  - https://en.cppreference.com/w/cpp/language/reinterpret_cast
  - https://eel.is/c++draft/expr.cast#4
elaborate: When you read `(T)x` in a code review, what would you have to look up to know which conversion it is?
---

## Both C-style casts compile. Which one still compiles if rewritten as `static_cast`?

```cpp
double d = 2.7;
float  f = 1.5f;
int  a = (int)d;      // A
int* p = (int*)&f;    // B
```

---

**Only A.** B relabels a `float`'s address as an `int`'s, which needs
`reinterpret_cast`; `static_cast` refuses unrelated pointer types. The
same `(T)` spelling silently became two very different casts, and
nothing at the call site says which.
