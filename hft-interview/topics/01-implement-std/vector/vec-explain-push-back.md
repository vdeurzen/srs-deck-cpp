---
id: vec-explain-push-back
kind: explain
version: 1
level: 4
tags: [vector, exceptions, lifetime, implement-std]
requires:
  - vec-push-back-self-alias
  - vec-relocate-move-if-noexcept
  - vec-realloc-rollback
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://timsong-cpp.github.io/cppwp/n4950/vector.modifiers#2
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/vector.tcc
---
The interviewer: "Implement `std::vector::push_back(const T&)`." Talk it
through, from the common case to what happens when a copy throws.
---
- [ ] Fast path: when `n < cap`, `construct_at` a copy in the next raw slot, then bump `n` (never assign into raw storage)
- [ ] Slow path order: allocate the bigger buffer, construct the new element first (because `x` may refer into the old buffer: `v.push_back(v[0])`), relocate, destroy, deallocate, commit
- [ ] States the strong guarantee: if `push_back` throws, the vector is exactly as before, so nothing is committed until every step has succeeded
- [ ] Relocates with `std::move_if_noexcept`: a move that may throw falls back to a copy, so the old elements survive a failure
- [ ] On a throw, destroys only what was built in the new buffer, frees it and rethrows; unwinding won't destroy objects made with `construct_at`
