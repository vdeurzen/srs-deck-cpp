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
elaborate: Which line of your implementation would behave differently if `T`'s move constructor were `noexcept`?
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://timsong-cpp.github.io/cppwp/n4950/vector.modifiers#2
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/vector.tcc
---
The interviewer: "Implement `std::vector::push_back(const T&)`." Talk them
through your implementation.
---
- [ ] With spare capacity, `construct_at` a copy in the next raw slot, then bump `n`; never assign into raw storage
- [ ] When full, build the new element in the new buffer before relocating, because `x` may refer into the old one
- [ ] Gives the strong guarantee: nothing is committed until every step has succeeded, so a throw leaves the vector unchanged
- [ ] Relocates with `std::move_if_noexcept`, so a move that may throw falls back to a copy and the old elements survive
- [ ] On a throw, destroys only what it built in the new buffer, frees it and rethrows; unwinding won't destroy them
