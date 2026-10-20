---
id: ptr-dangling
kind: basic
version: 1
level: 2
tags: [pointers, lifetime]
requires:
  - ptr-dangling-local
  - life-delete-matches-new
  - ub-three-behaviours
elaborate: Go's garbage collector makes this impossible; say aloud which habit (setting the pointer to `nullptr`, or an owner type) you will use instead.
refs:
  - https://en.cppreference.com/w/cpp/language/lifetime
  - https://timsong-cpp.github.io/cppwp/n4950/basic.stc.general#4
---

## After `delete p;`, which uses of `p` are undefined behaviour?

---

**Going through it (`*p`, or a member access) and a second `delete`.** `p` is *dangling*:
the object's lifetime has ended, so `p` holds an invalid pointer value.
Copying or comparing that stale value is implementation-defined, not
undefined; only going *through* it is. Nothing in `p`'s bits reveals
this. Pointers to ended
locals dangle the same way.
