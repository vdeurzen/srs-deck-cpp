---
id: hashing-delete-tombstone
kind: basic
version: 1
level: 3
tags: [hashing, open-addressing]
requires:
  - hashing-probe-lookup-stop
refs:
  - Knuth, The Art of Computer Programming, vol. 3, 2nd ed., §6.4 (Algorithm R)
  - https://abseil.io/about/design/swisstables
---

## A linear-probing table has N = 8 slots, home slot `key % 8`. Slots 3, 4, 5 hold 3, 11, 19 (all home slot 3). Deleting 11 by writing "empty" into slot 4 breaks something. What?

---

**`contains(19)` now stops at the empty slot 4 and wrongly reports 19 absent.**

Lookups stop at the first gap, and 19 was placed *past* 11. So deletion
leaves a "deleted" marker (a tombstone) in slot 4: lookups probe past
it, and inserts may reuse it.
