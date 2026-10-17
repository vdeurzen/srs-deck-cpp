---
id: layout-padding-sizeof
kind: code
version: 1
level: 1
tags: [layout, alignment, padding]
input: chips
choices:
  c1: ["12", "6", "9", "16"]
compile:
  harness: |
    int main() {}
requires:
  - layout-alignment
refs:
  - https://en.cppreference.com/w/cpp/language/sizeof
  - https://eel.is/c++draft/expr.sizeof#2
---

Predict the size on x86-64 (`char` 1 byte, `int` 4 bytes, both naturally
aligned).

```cpp
struct Rec { char tag; int count; char flag; };
static_assert(sizeof(Rec) == {{c1::12}});
```

---

`tag` at 0, three padding bytes, `count` at 4–7 (a multiple of
`alignof(int)`), `flag` at 8, then three more padding bytes at the end:
6 bytes of data, 12 of object.
