---
id: sort-key-normalisation
kind: basic
version: 2
level: 5
tags: [sorting, databases, layout]
requires:
  - interview-essentials/foundations-cache-cost-model
elaborate: An ART index needs keys as order-preserving byte strings too. What would a shared key encoder between index and sort buy?
refs:
  - https://dl.acm.org/doi/10.1145/1132960.1132964
---

## A database sorts 200-byte rows by `(country, ts DESC, price)` by sorting small (normalised key, row id) pairs instead of the rows. What property makes the key "normalised"?

---

**It is a fixed-width byte string whose `memcmp` order is the sort order.**

So the comparator collapses to one `memcmp`, with no per-field branches,
and radix sort becomes possible. A ~16-byte pair instead of a 200-byte
row is 12.5× less data per pass; the cost is a final random-access
gather of rows.
