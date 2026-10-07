---
id: seq-inline-capacity
kind: basic
version: 1
level: 3
requires:
  - foundations-cache-cost-model
tags: [containers, allocators, compilers]
elaborate: Which vectors in your own code are created by the million and almost always hold fewer than eight elements?
refs:
  - https://llvm.org/docs/ProgrammersManual.html#llvm-adt-smallvector-h
  - https://en.cppreference.com/w/cpp/string/basic_string
---

## A compiler creates millions of operand lists, almost all with ≤ 4 entries. What does `llvm::SmallVector<Value*, 4>` buy over `std::vector<Value*>` there?

---

**No heap allocation, and the elements share the parent's cache line.**
Up to `N` elements live in a buffer inside the object; only growth past
`N` mallocs. That removes a malloc, a free and a dependent miss per list.
`std::string`'s SSO is the same idea (15 chars in libstdc++, 22 in libc++).
