---
id: hash-swiss-erase-empty
kind: basic
version: 1
level: 5
requires:
  - hash-tombstone-fix
  - hash-swiss-control-byte
tags: [hashing, open-addressing, simd]
refs:
  - https://github.com/abseil/abseil-cpp/blob/master/absl/container/internal/raw_hash_set.cc
---

## Abseil's `erase` sometimes writes `kEmpty` instead of a tombstone. When is that safe?

---

**When every 16-slot window containing the slot also holds an empty slot.**

A probe stops at any group with an empty slot, so no search could ever
have passed through this slot to reach another key. Abseil checks the
runs of full slots on both sides (`WasNeverFull`); otherwise it writes
`kDeleted`.
