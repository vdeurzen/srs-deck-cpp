---
id: hash-backward-shift
kind: basic
version: 1
level: 4
requires:
  - hash-robin-hood
  - hash-tombstone-fix
tags: [hashing, open-addressing]
refs:
  - https://programming.guide/robin-hood-hashing.html
  - https://cs.uwaterloo.ca/research/tr/1986/CS-86-14.pdf
---

## How does a Robin Hood table erase a key without leaving a tombstone?

---

**Backward shift: move each following key back one slot until an empty slot or PSL 0.**

Each shifted key gets one step closer to home, so the invariant still
holds and no probe run has a hole. The table stays tombstone-free, so
delete-heavy traffic never degrades it. It needs linear probing.
