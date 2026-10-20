---
id: layout-pin-chunk
kind: chunk
version: 2
level: 2
tags: [layout, padding, static-assert]
expose_ms: 6500
compile: null
requires:
  - layout-offsets-trace
  - std-names-and-headers
elaborate: Which struct in your code is written to a file or sent over a network, and what would pinning its layout have caught?
refs:
  - https://en.cppreference.com/w/cpp/types/offsetof
  - https://en.cppreference.com/w/cpp/language/static_assert
---

`struct Order { double price; int qty; char side; };` is written to a
file as raw bytes on x86-64.

```cpp
#include <cstddef>
static_assert(sizeof(Order) == 16);
static_assert(offsetof(Order, side) == 12);
```

---

**Pinning a layout.** `<cstddef>` provides `offsetof`. The `sizeof` line
fails the build if anyone adds padding or a member; the `offsetof` line
fails it if a field moves, even when the total size stays the same. The
file format can then never change silently.
