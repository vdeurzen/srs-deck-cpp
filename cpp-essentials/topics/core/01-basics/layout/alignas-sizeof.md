---
id: layout-alignas-sizeof
kind: code
version: 1
level: 2
tags: [layout, alignment, alignas]
input: chips
choices:
  c1: ["64", "4", "68", "8"]
compile:
  harness: |
    int main() {}
requires:
  - layout-trailing-padding
refs:
  - https://en.cppreference.com/w/cpp/language/alignas
  - https://eel.is/c++draft/dcl.align
---

Predict the size.

```cpp
struct alignas(64) Slot { int value; };
static_assert(alignof(Slot) == 64);
static_assert(sizeof(Slot) == {{c1::64}});
```

---

`alignas(64)` raises `Slot`'s alignment to 64, and `sizeof` is always a
multiple of the alignment, so 4 bytes of data become a 64-byte object.
That is the point: in a `Slot[]`, each element starts on its own 64-byte
boundary. `alignas` only raises alignment: asking for less than the
natural one is ill-formed ([dcl.align]/5), though GCC 16 accepts it
without a diagnostic and keeps the natural alignment.
