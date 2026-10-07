---
id: ordered-balance-families
kind: cloze
version: 1
level: 2
tags: [trees, complexity]
requires:
  - ordered-why-balance
refs:
  - https://doi.org/10.1109/SFCS.1978.3
  - https://dl.acm.org/doi/10.1145/78973.78977
  - https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree
---

Three families keep a search tree's depth logarithmic whatever the
insertion order. AVL and red-black trees restore an invariant with
{{c1::rotations::a local restructuring}}. B-trees keep every leaf at the
same depth by {{c2::splitting and merging nodes::what happens to a full node}}.
Treaps and skip lists enforce no balance invariant: their expected
O(log n) comes from {{c3::random priorities or coin flips::where the shape comes from}},
so the bound is probabilistic rather than guaranteed.
