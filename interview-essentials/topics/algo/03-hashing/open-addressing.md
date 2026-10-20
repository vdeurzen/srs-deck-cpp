---
id: hashing-open-addressing
kind: basic
version: 1
level: 2
tags: [hashing, open-addressing]
requires:
  - hashing-chaining
elaborate: "What must a lookup for an absent key do in this table that it need not do in a chained one?"
refs:
  - Knuth, The Art of Computer Programming, vol. 3, 2nd ed., §6.4
  - https://abseil.io/about/design/swisstables
---

## An open-addressing table has 8 slots and no lists. Key 11's slot, `11 % 8 = 3`, already holds 3. Where can 11 go?

---

**Into the next empty slot along a fixed probe sequence through the array, such as 4, 5, 6, ….**

The deciding difference from chaining: colliding keys live in the
slot array itself, not in lists hanging off it. No per-key allocations,
at the cost of keys crowding each other's slots.
