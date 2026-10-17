---
id: layout-pin-chunk
kind: chunk
version: 1
level: 2
tags: [layout, padding, static-assert]
expose_ms: 8000
compile:
  harness: |
    int main() {}
requires:
  - layout-offsets-trace
refs:
  - https://en.cppreference.com/w/cpp/types/offsetof
  - https://en.cppreference.com/w/cpp/language/static_assert
---

```cpp
#include <cstddef>
struct Order { double price; int qty; char side; };
static_assert(offsetof(Order, side) == 12 && sizeof(Order) == 16);
```

---

**Pinning a layout.** A `static_assert` on `offsetof` and `sizeof` turns
the layout into a checked fact: someone who adds a member, reorders
fields or changes a type in a way that adds padding breaks the build
instead of silently growing every array, file record or wire message
built from `Order`.
