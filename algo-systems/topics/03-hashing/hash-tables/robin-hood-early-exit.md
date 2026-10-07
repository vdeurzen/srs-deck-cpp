---
id: hash-robin-hood-early-exit
kind: basic
version: 1
level: 4
requires:
  - hash-robin-hood
tags: [hashing, open-addressing]
refs:
  - https://programming.guide/robin-hood-hashing.html
---

## Looking up a missing key in a Robin Hood table, you are 3 slots from its home and meet an occupant with PSL 1. Why can you stop and report "absent"?

---

**Keys in a run are sorted by home slot, and this occupant's home lies after yours.**

Its home is 2 slots past yours, so your key would sit before it: on
insert it would have taken this richer slot. A miss stops early, costing
about as much as a hit.
