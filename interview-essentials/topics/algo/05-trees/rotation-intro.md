---
id: tree-rotation-intro
kind: basic
version: 2
level: 2
tags: [trees, bst, foundations]
requires:
  - tree-why-balance
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §13.2 (rotations)
  - https://en.wikipedia.org/wiki/Tree_rotation
elaborate: Say in one sentence, as to an interviewer, why a rotation can never break the BST rule.
---

This BST has height 3.

```text
2
 \
  4
 / \
3   5
     \
      6
```

## A *rotation* lifts 4 above its parent 2: 4 becomes the root, 2 its left child, and the height drops to 2. Where must 3, 4's old left child, go?

---

**To 2's right child: 3 lies between 2 and 4.**

```text
    4
   / \
  2   5
   \   \
    3   6
```

4's left slot now holds 2, and 2's right slot was freed when 4 moved
up. Only three links change and every key keeps its order, so balanced
BSTs can run a few rotations after an insert to keep the height
O(log n).
