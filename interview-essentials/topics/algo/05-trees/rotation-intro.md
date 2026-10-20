---
id: tree-rotation-intro
kind: basic
version: 1
level: 2
tags: [trees, bst, foundations]
requires:
  - tree-why-balance
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §13.2 (rotations)
  - https://en.wikipedia.org/wiki/Tree_rotation
elaborate: Say in one sentence, as to an interviewer, why a rotation can never break the BST rule.
---

Inserting 1, 2, 3 in that order into a plain BST gives a chain of
height 2.

```text
1
 \
  2
   \
    3
```

## One local relinking turns it into a BST of height 1 with the same keys. Which node becomes the root?

---

**2: lifting 2 above its parent 1 is a rotation; 1 becomes 2's left child.**

```text
  2
 / \
1   3
```

Only a few links change, and every key keeps the same keys on its left
and right, so the BST rule still holds. Balanced BSTs run a few
rotations after an insert to keep the height O(log n).
