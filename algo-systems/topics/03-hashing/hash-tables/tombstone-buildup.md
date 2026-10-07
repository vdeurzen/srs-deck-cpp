---
id: hash-tombstone-buildup
kind: basic
version: 1
level: 4
requires:
  - hash-tombstone-fix
tags: [hashing, open-addressing]
elaborate: What metric would show you that a table of yours is full of tombstones?
refs:
  - https://abseil.io/about/design/swisstables
  - https://en.wikipedia.org/wiki/Lazy_deletion
---

## A session cache inserts and erases keys all day; `size()` stays near 1 000 in a 4 096-slot open-addressed table, yet lookups keep getting slower. Why?

---

**Tombstones count as occupied for probing but not for `size()`: effective load nears 1.**

Every erase leaves one, so probe runs lengthen while the table looks
nearly empty. Implementations count them and rehash, often at the same
capacity: a rehash the caller never asked for, which invalidates
iterators.
