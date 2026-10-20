---
id: types-brace-checks-constant
kind: code
version: 3
level: 1
tags: [types, initialization, narrowing]
input: chips
choices:
  c1: ["signed char", "unsigned char", "bool"]
compile:
  harness: |
    static_assert(sizeof(small) == 1 && small == code);
    int main() {}
requires:
  - const-vs-constexpr-initializer
  - types-signed-unsigned-range
elaborate: Say where in your code an `=` initialisation could silently squash a value that braces would have refused.
refs:
  - https://en.cppreference.com/w/cpp/language/list_initialization#Narrowing_conversions
  - https://eel.is/c++draft/dcl.init.list#7
---

The line initialises `small` with braces (`T x{v};` initialises `x` from
`v`). Choose the one-byte type that makes it compile.

```cpp
constexpr int code = 200;
constexpr {{c1::unsigned char}} small{code};
```

---

**Braces refuse narrowing: a conversion that would change the value.**

For a constant source the compiler checks the actual value: `200` fits
`unsigned char` (0..255) but not `signed char` (−128..127) or `bool`, so
those are compile errors. With `=` all three compile, and the value is
silently changed.
