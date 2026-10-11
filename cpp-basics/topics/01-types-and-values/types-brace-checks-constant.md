---
id: types-brace-checks-constant
kind: code
version: 1
level: 1
tags: [types, initialization, narrowing]
input: chips
choices:
  c1: ["short", "unsigned char", "signed char", "bool"]
compile:
  harness: |
    static_assert(small == 300);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/list_initialization#Narrowing_conversions
  - https://eel.is/c++draft/dcl.init.list#7
---

`unsigned char small = code;` compiled and quietly stored `44`. The line
now uses braces instead. Choose the type the braces accept.

```cpp
constexpr int code = 300;
constexpr {{c1::short}} small{code};
```

---

Brace initialization refuses **narrowing**: a conversion that can lose
the value. For a constant source the compiler checks the actual value:
`300` fits a `short` (at least 16 bits), so that is fine, but not an
8-bit `char` type or `bool`, so those are compile errors where `=` would
have wrapped or squashed it. For a non-constant source the standard
rejects narrowing too; GCC reports that as a `-Wnarrowing` warning, so do
not ignore it.
