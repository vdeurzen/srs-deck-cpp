---
id: tree-avl-vs-red-black
kind: basic
version: 1
level: 3
tags: [trees, avl, red-black, containers]
elaborate: Your map is built once and then only read. Which of the two would you pick, and would a sorted vector beat both?
refs:
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/stl_tree.h
  - https://doi.org/10.1109/SFCS.1978.3
  - https://docs.kernel.org/core-api/rbtree.html
requires:
  - tree-balance-families
  - tree-why-balance
---

## AVL trees are shallower than red-black trees. Why is libstdc++'s `std::map` a red-black tree anyway?

---

**Looser balance makes deletes cheap: at most 3 rotations, against one per level for AVL.**

AVL stays within ~1.44 log₂ n, red-black within 2 log₂ n, so AVL lookups
touch slightly fewer nodes. Inserts cost about the same (AVL at most one
single or double rotation, red-black two). Maps that erase often favour
red-black.
