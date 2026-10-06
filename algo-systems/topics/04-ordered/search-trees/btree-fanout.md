---
id: ordered-btree-fanout
kind: cloze
version: 1
level: 4
requires:
  - ordered-bplus-tree
tags: [trees, databases, external-memory]
refs:
  - https://en.wikipedia.org/wiki/B-tree
  - https://dl.acm.org/doi/10.1145/48529.48535
---

Size a B⁺-tree the way a storage engineer does. With 4 KiB pages, 8-byte
keys and 8-byte child pointers, one internal page holds about
{{c1::256::4096 / 16, minus a little header}} children, so the height
needed for `N` keys is {{c2::log base 256 of N::log_fanout N, rounded
up}}. For a billion keys that is {{c3::4::256³ ≈ 16.7 M, 256⁴ ≈ 4.3 B}}
levels — and since every level except the leaves is usually
{{c4::cached in the buffer pool::the top levels are hot and tiny}}, a
point lookup costs one or two actual I/Os.

Two consequences fall straight out of the arithmetic. Raising the page
size raises the fanout linearly but lowers the height only
{{c5::logarithmically::halving the height needs squaring the fanout}},
so 4 KiB, 8 KiB and 16 KiB pages give
heights of 4, 4 and 3 — the page size is chosen for write amplification
and I/O granularity, not for height. And **key size matters more than
anything else you control**: 64-byte keys cut the fanout to ~57 and add
**two** levels (4 → 6), which is the real argument for prefix compression, for keeping
variable-length keys out of the internal nodes, and for surrogate
integer keys in a wide index.
