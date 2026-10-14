---
id: erasure-sbo-nothrow-move
kind: basic
version: 1
level: 4
tags: [type-erasure, callables, small-buffer, implement-std]
elaborate: Which of your own types holds a callable or a value inline, and what does its move constructor promise?
requires:
  - cpp-core/callables-explain-function-storage
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/any.class#3
  - https://timsong-cpp.github.io/cppwp/n4950/func.wrap.func.con
  - https://wg21.link/P0771R1
---

## Your `std::function`-style `Fn` keeps small targets in a buffer inside the object, and `Fn`'s move constructor is `noexcept`. What must be true of a target's type before `Fn` may store it inline?

---

**Its move constructor must not throw; any other target goes on the heap.**
Moving `Fn` move-constructs an inline target into the destination's
buffer, but only copies the pointer to a heap target. `std::any`
mandates exactly this rule for its small-object buffer. `std::function`
only recommends a buffer; its move is `noexcept` since C++20 (P0771R1).
