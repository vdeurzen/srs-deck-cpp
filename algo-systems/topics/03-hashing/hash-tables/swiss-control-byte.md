---
id: hash-swiss-control-byte
kind: basic
version: 1
level: 4
requires:
  - hash-swiss-table-metadata
tags: [hashing, open-addressing, simd]
refs:
  - https://github.com/abseil/abseil-cpp/blob/master/absl/container/internal/hashtable_control_bytes.h
  - https://abseil.io/about/design/swisstables
---

## A Swiss-table control byte records both the slot state (empty, deleted, full) and a hash filter for the key. How does one byte hold both?

---

**Top bit 0: full, low 7 bits are H2. Top bit 1: a special state.**

Abseil uses `kEmpty = 0b1000'0000`, `kDeleted = 0b1111'1110` and
`kSentinel = 0b1111'1111`. A 7-bit H2 never equals a special value, so
the compare that finds candidates cannot match an empty or deleted slot.
