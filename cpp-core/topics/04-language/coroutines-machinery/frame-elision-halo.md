---
id: coroutines-frame-elision-halo
kind: basic
version: 1
level: 4
tags: [coroutines, performance]
requires:
  - coroutines-frame-allocation
refs:
  - https://wg21.link/p0981
  - https://en.cppreference.com/w/cpp/language/coroutines#Dynamic_allocation
---

## When may a compiler keep a coroutine frame off the heap?

---

**When it can prove the frame's lifetime is nested in the caller's and
the handle never escapes**: HALO (P0981), typically after inlining a
generator consumed by a loop in the same translation unit; the frame
then sits in the caller's stack frame. An optimisation, never a
guarantee: a hot path that must not allocate needs a pooled
`operator new`.
