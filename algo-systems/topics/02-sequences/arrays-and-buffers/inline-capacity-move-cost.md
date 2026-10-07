---
id: seq-inline-capacity-move-cost
kind: basic
version: 1
level: 3
requires:
  - seq-inline-capacity
  - cpp-core/raii-move-steals-handle
tags: [containers, move-semantics]
refs:
  - https://llvm.org/docs/ProgrammersManual.html#llvm-adt-smallvector-h
---

## Moving a `std::vector<std::string>` of 5 elements is three pointer copies. What does moving a `SmallVector<std::string, 8>` of 5 elements cost?

---

**Five element moves: O(size), not O(1).** The elements live inside the
source object, so there is no buffer to steal; each string is
move-constructed into the destination's inline buffer. Only a vector
that has spilled to the heap moves by stealing the pointer.
