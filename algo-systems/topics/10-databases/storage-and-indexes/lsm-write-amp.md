---
id: db-lsm-write-amp
kind: code
version: 1
level: 4
tags: [databases, storage, lsm, amplification]
input: chips
choices:
  c1: ["T * L", "L", "T + L", "T"]
compile:
  harness: |
    static_assert(write_amp_tiered(10, 4) == 4);
    static_assert(write_amp_levelled(10, 4) == 40);
    static_assert(write_amp_levelled(4, 5) == 20);
    int main() {}
requires:
  - db-lsm-compaction
refs:
  - https://github.com/facebook/rocksdb/wiki/Compaction
  - https://doi.org/10.1145/3183713.3196927
elaborate: RocksDB lets you raise the size ratio T. Which of the two estimates gets worse, and what do reads gain?
---

`L` levels sit below the memtable and each is `T` times the size of the
one above. Tiering writes a byte once per level. Under levelling, a level
receives a merge each time the level above fills. Complete the
estimate of how often a byte is written over its life.

```cpp
// Bytes written to the device per byte inserted (WAL not counted).
constexpr int write_amp_tiered(int /*T*/, int L) { return L; }
constexpr int write_amp_levelled(int T, int L)   { return {{c1::T * L}}; }
```

---

**About `T` rewrites per level, so `T·L` overall.** A level fills over
`T` merges from the level above, and every merge rewrites the level's
overlapping resident data along with the new arrivals. "Once per level"
is the tiering figure. With `T = 10` and four levels that is ~40× against
4×: the price levelling pays for one run per level. It is an upper-end
estimate; measured RocksDB figures are typically 10–30×.
