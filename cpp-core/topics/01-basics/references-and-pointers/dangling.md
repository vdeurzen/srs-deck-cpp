---
id: ptr-dangling
kind: basic
version: 1
level: 2
tags: [pointers, lifetime]
requires:
  - raii-storage-durations
refs:
  - https://en.cppreference.com/w/cpp/language/lifetime
  - https://timsong-cpp.github.io/cppwp/n4950/basic.stc.general#4
---

## After `delete p;`, which uses of `p` are undefined behaviour?

---

**Indirection (`*p`, `p->m`) and a second `delete`.** `p` is *dangling*:
the object's lifetime has ended, so `p` holds an invalid pointer value.
Copying or comparing that stale value is implementation-defined, not
undefined; only going *through* it is. Nothing in `p`'s bits reveals
this, which is what generation-checked handles fix. Pointers to ended
locals dangle the same way.
