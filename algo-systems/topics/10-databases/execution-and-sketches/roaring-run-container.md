---
id: db-roaring-run-container
kind: basic
version: 1
level: 4
tags: [databases, bitsets, compression]
requires:
  - db-roaring-array-threshold
refs:
  - https://github.com/RoaringBitmap/RoaringFormatSpec
  - https://arxiv.org/abs/1603.06549
---

## Two Roaring chunks each hold 30 000 ids: one as 3 long runs, the other scattered. Why are they stored differently?

---

**A run container costs 4 bytes per run: 14 bytes for three runs, not an 8 KiB bitmap.**

Both chunks have the same count but not the same shape. A run container
stores a run count plus `(start, length − 1)` pairs, so it is chosen by
the number of runs; the scattered chunk has thousands and stays a bitmap.
