---
id: types-enum-fixed-underlying
kind: code
version: 1
level: 2
tags: [types, enums, sizes]
input: chips
choices:
  c1: [": unsigned char", "<unsigned char>", "(unsigned char)", "= unsigned char"]
compile:
  harness: |
    static_assert(sizeof(Level) == 1);
    int main() {}
requires:
  - types-enum-default-underlying
refs:
  - https://en.cppreference.com/w/cpp/language/enum
  - https://eel.is/c++draft/dcl.enum#5
---

`Level` must fit the one-byte field of a packed record, so its values
should be stored as `unsigned char` instead of `int`. Complete the
declaration.

```cpp
enum class Level {{c1::: unsigned char}} { off, low, max = 200 };
static_assert(static_cast<int>(Level::max) == 200);
```

---

The underlying type is named after a colon, between the enum's name and
its braces. It fixes `sizeof(Level)` and the range of values the
enumerators may take. The other spellings are not C++ syntax for this
and fail to compile.
