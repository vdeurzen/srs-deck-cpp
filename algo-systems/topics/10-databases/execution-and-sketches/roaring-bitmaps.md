---
id: db-roaring-bitmaps
kind: basic
version: 1
level: 4
tags: [databases, bitsets, indexing]
requires:
  - graph-bitset-graphs
refs:
  - https://arxiv.org/abs/1603.06549
  - https://roaringbitmap.org/
elaborate: Word-aligned hybrid schemes (WAH, EWAH) run-length-encode whole words. What does Roaring's two-level layout give `contains(x)` that they cannot?
---

## A plain bitmap index over a billion row ids is 125 MB per value, dense or not. What does Roaring do instead?

---

**It splits ids into chunks of 2¹⁶ and stores each chunk as a sorted array, a bitmap or runs.**

The format is chosen per chunk from its actual contents, so sparse, dense
and clustered regions each get their cheapest form. `AND`, `OR` and
friends are implemented for each pair of container types.
