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

ART finds a child differently in each node type. Node4 and Node16 keep
sorted key bytes beside child pointers; Node16 compares all 16 keys with
{{c1::a single SIMD instruction::a CPU feature}}. Node48 holds
{{c2::a 256-entry byte index into 48 child slots::a lookup table}},
so finding a child costs one extra load. Node256 is the plain pointer array,
where the child is found by {{c3::using the key byte as the array index::how the slot is located}}.
