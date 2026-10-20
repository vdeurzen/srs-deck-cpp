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
  - layout-padding-worked
  - constexpr-fn-static-assert
  - class-struct-members
elaborate: Say aloud how many bytes a million of these structs waste, and where you would look first to win them back.
refs:
  - https://en.cppreference.com/w/cpp/language/sizeof
  - https://eel.is/c++draft/expr.sizeof#2
---

Predict the size on x86-64 (`char`: 1 byte, alignment 1; `int`: 4 bytes,
alignment 4).

```cpp
struct Rec { char tag; int count; char flag; };
static_assert(sizeof(Rec) == {{c1::12}});
```

---

`tag` at 0, three padding bytes, `count` at 4–7 (a multiple of
`alignof(int)`), `flag` at 8, then three more padding bytes at the end:
6 bytes of data, 12 of object.
