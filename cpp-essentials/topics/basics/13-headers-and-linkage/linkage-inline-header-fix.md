---
id: linkage-inline-header-fix
kind: cloze
version: 1
level: 2
tags: [linkage, inline, headers]
requires:
  - linkage-odr-counting
refs:
  - https://en.cppreference.com/w/cpp/language/inline
  - https://eel.is/c++draft/dcl.inline
---

`util.h` is included by `a.cpp` and `b.cpp`, and the link fails with
`multiple definition of 'sq(int)'`. One word added to the header fixes
it, and `sq` stays one function shared by the whole program:

```cpp
// util.h
{{c1::inline::a keyword before the return type}} int sq(int x) { return x * x; }
```
