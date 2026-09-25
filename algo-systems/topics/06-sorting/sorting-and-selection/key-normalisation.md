---
id: sort-key-normalisation
kind: basic
version: 1
level: 5
tags: [sorting, databases, layout]
refs:
  - https://en.wikipedia.org/wiki/Key_normalization
  - https://db.in.tum.de/~leis/papers/morsels.pdf
---

## A database sorts 200-byte rows by `(country, ts DESC, price)`. What do the good implementations sort instead, and why?

---

They sort a **normalised key plus a row pointer**, not the rows.

*Normalised key* means the whole composite sort key is encoded into a
fixed-length byte string whose **plain `memcmp` order equals the desired
order**. Integers go big-endian with the sign bit flipped; floats get
the IEEE transform; descending fields are bit-inverted; strings are
truncated or padded to a prefix with the remainder handled by a
fallback comparison; NULLs get a leading marker byte.

What that buys:

- **The comparator collapses to `memcmp`** — no branches per field, no
  virtual calls, no re-deriving "is this column descending". One
  vectorised instruction sequence compares 8 or 16 bytes at a time.
- **The sorted payload is tiny.** A 16-byte (key, rowid) pair instead of
  a 200-byte row means 12× less data through the sort, which for an
  external sort is 12× less I/O and for an in-memory sort the difference
  between fitting in L2 and not.
- **Radix sort becomes available**, since the key is now a fixed-width
  byte string.
- **A prefix comparison usually decides.** Keep the first 4–8 bytes of
  the key *inline in the pointer struct* (the "key prefix" trick) and
  most comparisons never dereference the pointer at all — one cache miss
  per comparison saved, which is the single biggest win in practice.

The costs: encoding is a pass over the data and inflates some keys
(collation-aware string keys especially); the key must be decoded or the
row re-fetched at the end; and the final gather of rows in sorted order
is random access, which is why some engines sort (key, row) pairs
wholesale when rows are small.

The same idea outside databases: sort indices rather than heavy objects,
compare a cached hash or prefix before the full key, and design the key
so that ordering is a byte comparison. It is the sorting counterpart of
the ART rule that keys must become order-preserving byte strings.
