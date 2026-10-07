---
id: hash-swiss-table-metadata
kind: basic
version: 1
level: 4
requires:
  - hash-chaining-vs-open-addressing
tags: [hashing, open-addressing, simd, memory-hierarchy]
refs:
  - https://abseil.io/about/design/swisstables
  - https://github.com/abseil/abseil-cpp/blob/master/absl/container/internal/raw_hash_set.h
---

## A Swiss table keeps one control byte per slot holding 7 bits of the key's hash. Why does a lookup read a group's 16 control bytes before reading any key?

```
ctrl:  [0x3a][0x80][0x15][0x3a] …16 bytes   ← one SIMD compare against H2
slots: [ k,v ][ —  ][ k,v ][ k,v ] …
```

---

**One SIMD compare filters all 16 slots; a non-matching key is rejected ~127 times in 128.**

So a lookup usually compares exactly one key and pays the miss on one
slot's line. The same compare finds empty slots, which ends the probe.
No pointers, no per-element allocation.
