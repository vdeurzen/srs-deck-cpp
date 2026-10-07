---
id: ordered-btree-page-size
kind: basic
version: 1
level: 4
requires:
  - ordered-btree-fanout
tags: [trees, databases, external-memory]
refs:
  - https://dl.acm.org/doi/10.1145/48529.48535
  - https://www.postgresql.org/docs/current/storage-page-layout.html
---

## A B⁺-tree over a billion 8-byte keys is 4 levels deep with 4 KiB pages. Why does moving to 8 KiB pages leave it at 4?

---

**Height falls only logarithmically with fanout: 512³ ≈ 134 M < 10⁹.**

Doubling the page doubles the fanout (256 → 512), but removing a level
needs the fanout cubed to cover N; it takes 16 KiB (1024³ ≈ 1.07 × 10⁹)
to reach 3. Page size is chosen for I/O granularity and write
amplification, not height.
