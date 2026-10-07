---
id: ordered-offset-pagination
kind: basic
version: 1
level: 4
requires:
  - ordered-order-statistics
  - ordered-bplus-range-scan
tags: [trees, databases, ranking]
elaborate: Keyset pagination (`WHERE id > last_seen LIMIT 20`) avoids the cost. What does it give up?
refs:
  - https://www.postgresql.org/docs/current/queries-limit.html
  - https://www.postgresql.org/docs/current/btree.html
---

## PostgreSQL 18 runs `ORDER BY id LIMIT 20 OFFSET 1000000` using a B-tree index on `id`. How much index work does the `OFFSET` cost?

---

**O(offset): all million skipped rows are still read, then thrown away.**

The B-tree stores no subtree counts, so it cannot jump to the
millionth entry; it walks the leaf chain. A size-augmented tree could
select it in O(log n), at the price of updating counts on every insert
path, up to the root.
