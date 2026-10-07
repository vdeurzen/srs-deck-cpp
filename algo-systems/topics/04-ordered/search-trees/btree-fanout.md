---
id: ordered-btree-fanout
kind: cloze
version: 2
level: 4
requires:
  - ordered-bplus-tree
tags: [trees, databases, external-memory]
refs:
  - https://dl.acm.org/doi/10.1145/48529.48535
  - https://dl.acm.org/doi/10.1145/356770.356776
---

Size a B⁺-tree the way a storage engineer does. With 4 KiB pages, 8-byte
keys and 8-byte child pointers, one internal page holds about
{{c1::256::a count of children}} children, so a tree over a billion keys
is {{c2::4::a number of levels}} levels deep.
