---
id: hash-tombstones
kind: basic
version: 1
level: 3
tags: [hashing, open-addressing, misconception]
elaborate: Does a table in your own system ever see delete-heavy traffic? What would tell you its tombstones had taken over — and what would you measure?
refs:
  - https://abseil.io/about/design/swisstables
  - https://en.wikipedia.org/wiki/Lazy_deletion
---

## True or false: erasing from an open-addressed table is just marking the slot empty again.

---

**False, and doing it corrupts the table.** Probing stops at the first
empty slot — that is what makes an unsuccessful lookup terminate. If a
key sits at the end of a probe run and you clear a slot in the middle of
that run, the search for it now stops at the hole and reports "not
found" for a key that is still in the table.

The two repairs:

- **Tombstones**: mark the slot `DELETED` — a third state, distinct from
  empty. Probing treats it as occupied (keep going) but insertion may
  reuse it. Simple and local, and what most implementations do.
- **Backward-shift deletion**: repair the run immediately by moving the
  following elements back. Leaves the table tombstone-free, but only
  works when probing is linear (and is Robin Hood's natural partner).

Tombstones bring their own failure mode: they count as occupied for
probing but not for the element count, so a table that inserts and erases
in a loop fills with them, the *effective* load factor approaches 1, and
lookups slow to a crawl while `size()` says the table is nearly empty.
Implementations therefore track tombstones and rehash — often to the same
capacity — when there are too many. That is a rehash the caller did not
ask for and cannot see coming, and it invalidates iterators.

Two practical consequences. A delete-heavy open-addressed table needs its
tombstone policy checked, not assumed. And in Swiss tables, this is
exactly why `erase` must write the `kDeleted` control byte (0b1111'1110)
rather than `kEmpty` (0b1000'0000) — with one exception the
implementation does exploit: if the group you erased from has an empty
slot, the run cannot extend past it, and the slot can go straight back to
empty with no tombstone at all.
