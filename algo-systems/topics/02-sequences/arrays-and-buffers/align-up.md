---
id: seq-align-up
kind: code
version: 1
level: 3
tags: [allocators, bit-tricks, arena]
requires:
  - foundations-bits-power-of-two
  - cpp-core/layout-alignment
input: chips
choices:
  c1:
    - "(p + a - 1) & ~(a - 1)"
    - "(p + a) & ~(a - 1)"
    - "p & ~(a - 1)"
    - "(p + a - 1) & (a - 1)"
compile:
  harness: |
    static_assert(align_up(0, 8) == 0);
    static_assert(align_up(1, 8) == 8);
    static_assert(align_up(8, 8) == 8);
    static_assert(align_up(13, 16) == 16);
    static_assert(align_up(4096, 4096) == 4096);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/memory/align
  - https://en.cppreference.com/w/cpp/language/object#Alignment
---

A bump allocator hands out the next aligned address. Complete `align_up`
so it rounds up to a power-of-two alignment `a` and leaves an
already-aligned value unchanged.

```cpp
#include <cstdint>

constexpr std::uintptr_t align_up(std::uintptr_t p, std::uintptr_t a) {
  return {{c1::(p + a - 1) & ~(a - 1)}};
}
```

---

Adding `a − 1` pushes any unaligned value past the next boundary;
`& ~(a − 1)` clears the low bits. Without the `− 1`, an aligned address
jumps a whole alignment and the arena wastes `a` bytes per allocation.
This is the hot path of a bump allocator, and it is only correct for a
power-of-two `a`.
