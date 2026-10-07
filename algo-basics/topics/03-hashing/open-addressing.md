---
id: hashing-open-addressing
kind: basic
version: 1
level: 2
tags: [hashing, open-addressing]
requires:
  - hashing-chaining
refs:
  - Knuth, The Art of Computer Programming, vol. 3, 2nd ed., §6.4
  - https://abseil.io/about/design/swisstables
---

## An open-addressing table has 8 slots and no lists. Key 11's slot, `11 % 8 = 3`, already holds 3. Where can 11 go?

---

**Into another empty slot of the same array, found by a fixed probe sequence (e.g. 4, 5, 6, …).**

That is the deciding difference from chaining: colliding keys live in
the slot array itself, not in lists hanging off it. No node allocations
and better cache behaviour, at the cost of keys crowding each other's
slots.
