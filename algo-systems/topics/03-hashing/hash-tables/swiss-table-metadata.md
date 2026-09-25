---
id: hash-swiss-table-metadata
kind: basic
version: 1
level: 4
tags: [hashing, open-addressing, simd, memory-hierarchy]
refs:
  - https://abseil.io/about/design/swisstables
  - https://github.com/abseil/abseil-cpp/blob/master/absl/container/internal/raw_hash_set.h
---

## How does a Swiss table split the hash, and why does a one-byte metadata array make lookups so much faster?

---

The table keeps two parallel arrays: the slots, and a **control byte per
slot**. The hash is split in two:

- **H1**, the upper 57 bits, picks the starting *group* of 16 slots.
- **H2**, the low 7 bits, is stored in the control byte of an occupied
  slot as `0b0hhh'hhhh`. The two special values have the top bit set:
  `kEmpty = 0b1000'0000`, `kDeleted = 0b1111'1110`.

A lookup loads the group's 16 control bytes — one or two cache lines —
broadcasts H2 into a SIMD register, compares all 16 at once
(`_mm_cmpeq_epi8` plus `movemask`), and gets a 16-bit mask of *candidate*
matches. Only those slots get their keys compared. The same instruction
sequence also answers "is there an empty slot in this group?", which is
how probing knows to stop; if not, it moves quadratically to the next
group.

Why it wins:

- **One cache line answers 16 slots.** The metadata array is 1 byte per
  entry, so 16 slots' worth of filtering fits where a single 8-byte
  pointer would have gone.
- **H2 filters ~127 of every 128 non-matching keys** before any key is
  read, so the expensive comparison (and the miss on the key's own cache
  line) happens about once per lookup.
- **No pointer chasing, no per-node allocation**, and the metadata is
  scanned with data-parallel instructions rather than a branch per slot.

The trade-offs are the ones every flat table makes: rehash moves
elements, so no reference stability; iteration order is unspecified and
changes between runs; and a weak hash function hurts twice, because H1
and H2 come from the same bits. Abseil mitigates the last with per-table
hash salting, which also makes iteration order deliberately unstable so
callers cannot depend on it.

Go adopted the same design for its built-in `map` in Go 1.24, replacing
the older bucket-of-8 layout.
