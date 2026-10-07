---
id: db-zone-maps
kind: basic
version: 1
level: 3
tags: [databases, indexes, layout]
requires:
  - db-columnar-encodings
refs:
  - https://duckdb.org/docs/stable/guides/performance/indexing
  - https://www.cidrdb.org/cidr2005/papers/P19.pdf
elaborate: The table is sorted by `(region, day)` instead. Why do the `day` zone maps now skip far less for a query on `day` alone?
---

## Each block of a column store records its column's min and max. What does `WHERE day = '2026-10-07'` do with them?

---

**It skips every block whose [min, max] range cannot contain that day, without reading it.**

On data loaded or sorted by `day`, almost every block is skipped, and
that is where most of a selective scan's speed comes from. On randomly
ordered data every range spans everything and nothing is skipped.
