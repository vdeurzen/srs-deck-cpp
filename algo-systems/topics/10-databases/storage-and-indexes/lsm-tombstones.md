---
id: db-lsm-tombstones
kind: basic
version: 1
level: 4
tags: [databases, storage, lsm]
requires:
  - db-lsm-compaction
refs:
  - https://github.com/facebook/rocksdb/wiki/Delete-A-Range-Of-Keys
  - https://github.com/facebook/rocksdb/wiki/Compaction
elaborate: RocksDB's `DeleteRange` writes one tombstone covering a key range. What does that save over a million point deletes, and what must every read now check?
---

## After a mass `DELETE`, an LSM store grows for hours before it shrinks. Why?

---

**A delete writes a tombstone, kept until no older version can lie below it.**

The tombstone shadows older versions on lower levels; dropping it early
would resurrect them. Usually that means compaction carrying it to the
bottom (RocksDB drops it sooner if no lower file overlaps and no
snapshot needs it). Until then, tombstone and old values both take space.
