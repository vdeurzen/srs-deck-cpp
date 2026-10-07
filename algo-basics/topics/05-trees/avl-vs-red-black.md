---
id: tree-avl-vs-red-black
kind: basic
version: 1
level: 3
tags: [trees, avl, red-black, containers]
requires:
  - tree-avl-height-bound
  - tree-red-black-insert-fixup
elaborate: Your map is built once and then only read. Which of the two would you pick, and would a sorted vector beat both?
refs:
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/stl_tree.h
  - https://doi.org/10.1109/SFCS.1978.3
  - https://docs.kernel.org/core-api/rbtree.html
---

## AVL trees are shallower than red-black trees. Why is libstdc++'s `std::map` a red-black tree anyway?

---

**Looser balance means less repair per insert and delete.**

AVL stays within ~1.44 log₂ n, red-black within 2 log₂ n, so AVL lookups
touch slightly fewer nodes. But a red-black delete needs at most three
rotations, while an AVL delete may rotate at every level up the path. For
a map updated as often as read, red-black wins.
