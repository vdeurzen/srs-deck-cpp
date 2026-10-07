---
id: sort-key-normalisation
kind: basic
version: 1
level: 5
tags: [sorting, databases, layout]
requires:
  - foundations-cache-cost-model
elaborate: An ART index needs keys as order-preserving byte strings too. What would a shared key encoder between index and sort buy?
refs:
  - https://dl.acm.org/doi/10.1145/1132960.1132964
---

## A database sorts 200-byte rows by `(country, ts DESC, price)`. What do the good implementations sort instead of the rows?

---

**(normalised key, row id) pairs: a fixed-width key whose `memcmp` order is the sort order.**

A ~16-byte pair instead of a 200-byte row is 12.5× less data per pass,
and the comparator collapses to one `memcmp`: no per-field branches.
Fixed width also opens radix sort. The cost is a final random-access
gather of rows.
