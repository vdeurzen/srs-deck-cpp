---
id: ll-struct-layout
kind: code
version: 1
level: 3
tags: [low-latency, layout, alignment, memory-hierarchy]
input: chips
choices:
  c1:
    - "i64 price; i64 qty; u32 id; u8 side; bool live;"
    - "u8 side; i64 price; bool live; i64 qty; u32 id;"
    - "i64 price; u32 id; i64 qty; u8 side; bool live;"
    - "bool live; i64 price; i64 qty; u32 id; u8 side;"
compile:
  harness: |
    static_assert(alignof(Order) == 8);
    static_assert(sizeof(Order[1000]) / 64 == 375);   // 64-byte lines spanned
    int main() {}
requires:
  - cpp-core/layout-declaration-order
  - cpp-core/layout-alignment
refs:
  - https://en.cppreference.com/w/cpp/language/object#Alignment
  - https://en.algorithmica.org/hpc/cpu-cache/alignment/
elaborate: Which struct on your hot path would you reorder first, and how would you confirm the new `sizeof` stays put (a `static_assert`)?
---

A matching engine scans an array of 1000 order records. Pick the
declaration order (x86-64) that makes the array span the fewest 64-byte
cache lines.

```cpp
#include <cstdint>
using i64 = std::int64_t; using u32 = std::uint32_t; using u8 = std::uint8_t;

struct Order {
  {{c1::i64 price; i64 qty; u32 id; u8 side; bool live;}}
};
```

---

**Declare members in decreasing alignment.** Each member starts at a
multiple of its alignment and the size rounds up to the largest one (8),
so a small field before a large one leaves a hole: `side` then `price`
wastes 7 bytes. Sorted, 22 bytes of payload need 2 bytes of padding.

At 24 bytes the array spans 375 lines; the 40-byte order needs 625, and a
scan's cost is the lines it touches.
