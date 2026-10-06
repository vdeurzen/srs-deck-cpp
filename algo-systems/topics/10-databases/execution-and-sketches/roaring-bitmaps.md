---
id: db-roaring-bitmaps
kind: basic
version: 1
level: 5
tags: [databases, bitsets, indexing]
refs:
  - https://arxiv.org/abs/1603.06549
  - https://roaringbitmap.org/
---

## A bitmap index over a billion row ids is 125 MB per value, dense or not. What does Roaring do instead?

---

It splits the 32-bit universe into chunks of 2¹⁶ and picks a
**container type per chunk**, based on that chunk's actual density
and shape:

- **Array container** — a sorted `uint16` array, used while the chunk
  holds at most 4096 values (up to that, 2 bytes per value is no more
  than a bitmap's fixed 8 KiB).
- **Bitmap container** — a plain 8 KiB bitset, for dense chunks.
- **Run container** — (start, length) pairs, chosen by *number of
  runs* rather than count, for chunks that are long consecutive runs, which is the common case for sorted or clustered
  data.

So the structure adapts to whatever distribution it is given, rather
than betting on one. Crucially, the **set operations are defined pairwise
per container type**: array ∩ bitmap is a loop of bit tests, bitmap ∩
bitmap is a word-wise AND (vectorisable, and it can compute the
cardinality with `popcount` without materialising the result), run ∩
run is an interval intersection. Nine cases, each optimal for its
shapes.

Why it is everywhere (Lucene, Druid, ClickHouse, Pinot, InfluxDB,
Spark): index intersection is the core operation of a search or
analytics engine — `WHERE country = 'NL' AND status = 'open'` is an
AND of two posting lists — and Roaring makes that operation fast at
every density, while compressing to a fraction of a plain bitmap. It
also supports rank/select, which gives you "the 1000th matching row"
without decoding.

The alternatives it displaced are worth knowing: **word-aligned hybrid**
schemes (WAH, EWAH) run-length-encode whole words and must be scanned
sequentially to answer anything, so random access and skipping are
expensive. Roaring's two-level structure keeps random access O(1)-ish
and makes skipping a binary search over chunk keys.

Its limit is the universe: 32-bit ids per bitmap, with a 64-bit variant
built as a map of 32-bit Roarings, and — like every bitmap index — it
suits **read-mostly** data, since updating a compressed container
means rewriting it.
