---
id: hash-backward-shift
kind: basic
version: 2
level: 4
requires:
  - hash-robin-hood
  - hash-tombstone-fix
tags: [hashing, open-addressing]
elaborate: A delete-heavy cache never rehashes to clear tombstones. Why would it pick this erase over the tombstone one?
refs:
  - https://programming.guide/robin-hood-hashing.html
  - https://cs.uwaterloo.ca/research/tr/1986/CS-86-14.pdf
---

## A Robin Hood table erases a key by moving each following key back one slot, leaving no tombstone. Where must that shifting stop?

---

**At an empty slot or at a key with PSL 0, which is already home.**

Moving a PSL-0 key back would put it before its home slot, where no
lookup for it starts. Every key shifted gets one step closer to home, so
the invariant holds and no probe run has a hole. It needs linear probing.
