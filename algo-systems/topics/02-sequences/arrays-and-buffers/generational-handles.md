---
id: seq-generational-handles
kind: basic
version: 1
level: 4
tags: [arena, handles, compilers, low-latency]
requires:
  - cpp-core/ptr-dangling
elaborate: A handle needs the arena in hand to dereference. Where does that arena live in your design, and what stops two arenas' handles being mixed up?
refs:
  - https://floooh.github.io/2018/06/17/handles-vs-pointers.html
  - https://docs.rs/slotmap/latest/slotmap/
---

## An IR stores operands as 32-bit indices into one `std::vector<Instr>` instead of `Instr*`. The vector then reallocates. What do the indices give that pointers would not?

```cpp
struct Instr { std::uint32_t lhs, rhs; /* ... */ };  // indices into arena
std::vector<Instr> arena;
```

---

**They survive the move: an index is still valid after reallocation.**
Every `Instr*` would now point into freed memory; an index is an offset
from wherever the buffer lives now.
