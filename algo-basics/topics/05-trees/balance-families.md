---
id: tree-balance-families
kind: cloze
version: 1
level: 2
tags: [trees, complexity]
requires:
  - tree-why-balance
refs:
  - https://doi.org/10.1109/SFCS.1978.3
  - https://doi.org/10.1007/BF00288683
  - https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree
---

Balanced search trees keep the height O(log n) whatever the insertion
order, by repairing the shape after every insert and delete. AVL and
red-black trees are binary and restore their balance rule with
{{c1::rotations::a local restructuring}}, which reshape a few links but
keep the keys in order. B-trees hold many keys per node and keep every
leaf at the same depth by {{c2::splitting and merging nodes::structural operations on whole nodes}}.
