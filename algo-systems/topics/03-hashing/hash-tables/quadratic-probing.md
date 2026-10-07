---
id: hash-quadratic-probing
kind: basic
version: 1
level: 3
requires:
  - hash-primary-clustering
tags: [hashing, open-addressing]
refs:
  - https://en.wikipedia.org/wiki/Quadratic_probing
---

## Quadratic probing visits `h, h+1, h+3, h+6, …`, so runs no longer merge. Which clustering does it still suffer?

---

**Secondary clustering: keys with the same home slot follow the same probe sequence.**

Two keys that collide at different points of each other's sequences now
diverge, but two keys with equal `h` still walk identical paths. Making
the step itself depend on the key (double hashing) removes that too.
