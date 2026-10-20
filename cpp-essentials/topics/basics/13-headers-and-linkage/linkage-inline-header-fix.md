---
id: linkage-inline-header-fix
kind: basic
version: 2
level: 2
tags: [linkage, inline, headers]
requires:
  - linkage-which-step-fails
refs:
  - https://en.cppreference.com/w/cpp/language/inline
  - https://eel.is/c++draft/dcl.inline
elaborate: Say why the same word does not fix two `.cpp` files that each define a helper of that name with different bodies.
---

## `util.h` is included by `a.cpp` and `b.cpp`, and the link fails with `multiple definition of 'sq(int)'`. Which one keyword, added in the header, lets every `.cpp` hold the definition while `sq` stays one function?

```cpp
// util.h
int sq(int x) { return x * x; }
```

---

**`inline`: `inline int sq(int x) { return x * x; }`.**

An `inline` function may be defined in every translation unit that uses
it, provided all the definitions are identical. The linker keeps one
instead of reporting a clash.
