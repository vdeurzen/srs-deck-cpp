---
id: compiler-parallel-copy
kind: code
version: 1
level: 4
tags: [compilers, ssa, codegen, registers]
input: chips
choices:
  c1: ["readers == 0", "true", "readers > 0", "src[src[d]] == src[d]", "readers == 0 || src[src[d]] == src[d]"]
compile:
  harness: |
    using Regs = std::array<int, 4>;
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

A block's φs form one **parallel copy**: every `r[d] = r[src[d]]` reads
before any writes; `src[d] == d` is no copy. No cycles here. Complete the
test that makes a move safe to emit.

```cpp
#include <array>
constexpr std::array<int, 4> parallel_copy(std::array<int, 4> src, std::array<int, 4> r) {
  for (int round = 0; round < 4; ++round)
    for (int d = 0; d < 4; ++d) {
      int readers = 0;
      for (int e = 0; e < 4; ++e) readers += src[e] != e && src[e] == d;
      if (src[d] != d && {{c1::readers == 0}}) { r[d] = r[src[d]]; src[d] = d; }
    }
  return r;
}
```

---

**Emit a move only once no pending copy still reads its destination.**
That drains every chain from its far end: in `r2 ← r1 ← r0`, `r2` is
written first, while `r1` still holds the value it needs.

`true` (declaration order) overwrites `r1` before `r2` reads it.
Testing the *source* instead lets a move clobber a value another copy
still needs, and `||` lets the same clobber through.
