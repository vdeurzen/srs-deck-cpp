---
id: ordered-art-node-types
kind: cloze
version: 1
level: 5
requires:
  - ordered-adaptive-radix-tree
tags: [tries, databases, simd]
refs:
  - https://db.in.tum.de/~leis/papers/ART.pdf
---

ART has four node types, named for the most children each holds: Node4,
Node16, Node48 and Node256. Each finds a child differently. Node4 and
Node16 keep sorted key bytes beside child pointers; Node16 compares all 16 keys with
{{c1::a single SIMD instruction::a CPU feature}}. Node48 holds
{{c2::a 256-entry byte index into 48 child slots::a lookup table}},
so finding a child costs one extra load. In Node256 the child is found by {{c3::using the key byte as the array index::how the slot is located}}.
