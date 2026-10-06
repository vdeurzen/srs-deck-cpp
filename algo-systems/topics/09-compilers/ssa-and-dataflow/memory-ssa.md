---
id: compiler-memory-ssa
kind: basic
version: 1
level: 4
tags: [compilers, ssa, alias-analysis, memory]
requires:
  - compiler-ssa-form
refs:
  - https://llvm.org/docs/MemorySSA.html
elaborate: Store-to-load forwarding needs the store a load actually reads. How would you find it by walking MemorySSA's def chain?
---

## LLVM's MemorySSA puts loads and stores into SSA form without first deciding what aliases what. How many memory variables does it version?

---

**One: all of memory.** Each store or call is a new-version
`MemoryDef`, each load a `MemoryUse`, and merges get a `MemoryPhi`.

Per-location names are impossible when pointers may alias, and the
MemorySSA docs report that partitioning into more variables did not pay.
Precision comes later: a **clobber walker** asks alias analysis which
earlier def really affects a given load.
