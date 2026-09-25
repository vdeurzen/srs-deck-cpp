---
id: seq-inline-capacity
kind: basic
version: 1
level: 3
tags: [containers, allocators, compilers]
refs:
  - https://llvm.org/docs/ProgrammersManual.html#llvm-adt-smallvector-h
  - https://en.cppreference.com/w/cpp/string/basic_string
---

## What is the small-buffer optimisation (`SmallVector<T, N>`, `std::string`'s SSO), what does it buy, and what does it break?

---

The container keeps room for `N` elements **inside itself** and only
touches the heap when it outgrows them. `llvm::SmallVector<Value*, 4>` is
LLVM's default container for exactly this reason: almost every
instruction has a handful of operands, almost every basic block a handful
of predecessors, and a compiler creates millions of such vectors. Turning
"a malloc, a free and a pointer chase" into "a few bytes in the parent
object" removes both the allocation and the cache miss — the elements
are in the same cache line as the header that names them. `std::string`
does the same with a 15-character inline buffer in libstdc++ and 22 in
libc++.

What it breaks:

- **`sizeof` explodes.** `SmallVector<T, 32>` is a large object; putting
  one in a container copies all of it, and hot structures get fat. Pick
  `N` from the actual distribution — the 90th percentile, not the max.
- **Moving stops being cheap.** A heap vector's move steals a pointer;
  an inline one has to move `min(size, N)` elements one by one, so moves
  go from O(1) to O(N) and are no longer `noexcept` for a throwing `T`.
- **References are not stable across growth** — same as `vector`, but
  now the *first* growth also changes the address, which surprises people
  who took a pointer to the inline storage.
- **Self-reference hazards**: the inline buffer is part of the object, so
  a naive move constructor that memcpy's the header leaves the new object
  pointing at the old object's inline array. This is the classic SSO
  implementation bug.

The rule of thumb that survives all of that: use inline capacity where
allocations are frequent, short-lived and small — compiler IR, parser
scratch, per-message state in a hot loop — and plain `vector` where the
data is long-lived or big enough that one allocation is noise.
