---
id: seq-align-up
kind: code
version: 1
level: 3
tags: [allocators, bit-tricks, arena]
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

Add `a − 1` to push any value that is not already on a boundary past the
next one, then clear the low bits with `~(a − 1)`. The `− 1` is what
makes the function idempotent: without it, an already-aligned address
gets bumped a whole alignment forward and the arena leaks `a` bytes per
allocation.

This is the entire hot path of a bump (arena, region) allocator: align
the cursor, compare `cursor + n` against the end of the block, bail out
or publish the new cursor and return the old one. Two adds, an AND, a
compare and a store — no free list, no size classes, no metadata per
allocation, and deallocation is resetting `cursor_`.
That is why compilers allocate AST and IR nodes from arenas tied to a
compilation unit, and why low-latency systems allocate per-message state
from an arena reset at the end of each event: the cost model is "free
everything at once, never free anything individually".

The catch is that `align_up` is only correct for a power-of-two `a`, and
overflow near the top of the address space is unchecked — both are
invariants of the caller, usually pinned with a `static_assert` or an
assertion at the arena's boundary rather than a branch per allocation.
