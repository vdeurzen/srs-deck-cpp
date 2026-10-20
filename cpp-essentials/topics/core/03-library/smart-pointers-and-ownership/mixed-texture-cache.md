---
id: smart-pointers-mixed-texture-cache
kind: basic
version: 1
level: 3
tags: [smart-pointers, ownership, mixed-recognition]
requires:
  - smart-pointers-weak-ptr-lock-intro
  - ptr-dangling
elaborate: Say where else a registry should find live objects without keeping dead ones alive.
refs:
  - https://en.cppreference.com/w/cpp/memory/weak_ptr
---

## A texture cache hands out shared textures. It must return a texture still in use, yet never keep an unused one alive. What should each cache entry hold?

---

**A `std::weak_ptr<Texture>`: it finds a live texture without owning it.**

Cue: "find it, but don't keep it alive". A `shared_ptr` entry would keep
every texture forever; a raw `Texture*` cannot tell a destroyed texture
from a live one, so it dangles. `lock()` turns a hit into an owner.
