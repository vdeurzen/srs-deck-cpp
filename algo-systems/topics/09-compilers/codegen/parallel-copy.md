---
id: compiler-parallel-copy
kind: code
version: 1
level: 4
tags: [compilers, ssa, codegen, registers]
input: chips
choices:
  c1: ["!read_later", "true", "read_later", "src[src[d]] == src[d]"]
compile:
  harness: |
    constexpr Regs kStart{10, 11, 12, 13};
    static_assert(parallel_copy({0, 0, 1, 3}, kStart) == Regs{10, 10, 11, 13});  // r2<-r1<-r0
    static_assert(parallel_copy({1, 2, 3, 3}, kStart) == Regs{11, 12, 13, 13});  // r0<-r1<-r2<-r3
    static_assert(parallel_copy({3, 0, 0, 3}, kStart) == Regs{13, 10, 10, 13});  // r0 read twice, then overwritten
    int main() {}
requires:
  - compiler-phi-swap
refs:
  - https://doi.org/10.1109/CGO.2009.19
  - https://llvm.org/docs/CodeGenerator.html
elaborate: Where else does a simultaneous assignment get lowered to sequential moves — tuple assignment, a state machine's next-state update?
---

The φs at the top of a block form one **parallel copy**: every
`r[d] = r[src[d]]` reads its source before any of them writes. This one
contains no cycles. Complete the test that makes a move safe to emit.

```cpp
#include <array>
using Regs = std::array<int, 4>;

constexpr Regs parallel_copy(std::array<int, 4> src, Regs r) {  // src[d] == d: no copy
  for (int round = 0; round < 4; ++round)
    for (int d = 0; d < 4; ++d) {
      bool read_later = false;           // does a pending copy still read r[d]?
      for (int e = 0; e < 4; ++e) read_later |= src[e] != e && src[e] == d;
      if (src[d] != d && {{c1::!read_later}}) { r[d] = r[src[d]]; src[d] = d; }
    }
  return r;
}
```

---

**Emit a move only once no pending copy still reads its destination.**
That drains every chain from its far end: in `r2 ← r1 ← r0`, `r2` is
written first, while `r1` still holds the value it needs.

Emitting in declaration order (`true`) is the naive φ lowering, and it
overwrites `r1` before `r2` reads it. Checking the *source* instead of
the destination lets a move clobber a value someone else still needs.
