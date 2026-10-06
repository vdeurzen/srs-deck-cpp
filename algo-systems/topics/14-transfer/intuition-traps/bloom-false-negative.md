---
id: trap-bloom-false-negative
kind: basic
version: 1
level: 3
tags: [transfer, misconception, sketches, probabilistic]
elaborate: If you put a filter in front of an expensive lookup, what happens on a false positive — and would you ever notice it in production?
refs:
  - https://dl.acm.org/doi/10.1145/362686.362692
  - https://en.wikipedia.org/wiki/Bloom_filter
---

## True or false: a Bloom filter is approximate, so it can occasionally say "not present" for something that is present.

---

**False, and the asymmetry is the entire reason the structure is
useful.** Insertion sets `k` bits; a query checks those same `k` bits.
If the element was inserted, its bits were set and can never be
un-set — so a "no" is **certain**. Only "yes" can be wrong, when other
elements happened to set all `k` of the queried bits.

That one-sidedness is what lets a filter be used as a *skip*:

- An LSM engine asks the per-SSTable filter before reading the file.
  "No" means skip it, with certainty — and false positives cost a
  wasted read, never a missing row.
- A CDN asks before caching an object, so only objects requested
  twice are cached ("one-hit wonders" are not) — a false positive
  wastes some cache space, never a response.
- A database join asks a semi-join filter before scanning the probe
  side.

In every case the correctness of the system depends only on the "no"
being trustworthy, and the false positive rate is a *performance*
parameter you trade against memory.

Two ways the guarantee is actually lost, both worth knowing:

- **Deletion.** Clearing an element's bits would also clear bits other
  elements rely on, immediately creating false negatives. A plain
  Bloom filter therefore has no `remove`; use a counting Bloom filter
  or a cuckoo filter if you need one.
- **Rebuilding from a stale source.** A filter regenerated from a
  snapshot that misses recent inserts reports "no" for keys that are
  present. The bug is in the pipeline, not the structure, and it is
  the one that actually happens.

The mirror-image trap belongs to the count-min sketch: its error is
one-sided the *other* way (never an underestimate), so `estimate == 0`
is trustworthy while a large estimate might be inflated by
collisions. When you use a sketch, the first question is always
**which direction can it be wrong in**, because that decides what you
are allowed to conclude.
