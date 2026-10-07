---
id: hash-tombstone-fix
kind: basic
version: 1
level: 3
requires:
  - hash-tombstones
tags: [hashing, open-addressing]
refs:
  - https://en.wikipedia.org/wiki/Lazy_deletion
  - https://abseil.io/about/design/swisstables
---

## How does a *tombstone* let an open-addressed table erase a key without breaking other keys' probe runs?

---

**It is a third slot state, DELETED: searches step over it, inserts may reuse it.**

To a lookup the slot still looks occupied, so a probe run is never cut;
to an insert it is free. It is a purely local fix, and what most
implementations do, Swiss tables included.
