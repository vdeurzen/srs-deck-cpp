---
id: seq-inline-capacity-choosing-n
kind: basic
version: 1
level: 3
requires:
  - seq-inline-capacity
tags: [containers, memory-hierarchy]
refs:
  - https://llvm.org/docs/ProgrammersManual.html#llvm-adt-smallvector-h
---

## Instructions have at most 64 operands, so someone writes `SmallVector<Value*, 64>` to never allocate. What does every instruction now pay?

---

**A 512-byte inline buffer, eight cache lines, in every instruction.**
The 64 × 8-byte slots are part of the object, paid for even when two
are used. Pick `N` from the typical count, not the maximum, and
let the rare case allocate.
