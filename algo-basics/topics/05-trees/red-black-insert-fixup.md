---
id: tree-red-black-insert-fixup
kind: cloze
version: 1
level: 3
tags: [trees, red-black, rotations, invariants]
requires:
  - tree-red-black-invariant
  - tree-rotation
refs:
  - https://doi.org/10.1109/SFCS.1978.3
  - https://docs.kernel.org/core-api/rbtree.html
---

```
          20B                  20B           B = black, R = red
         /   \                 /
       10R    30R            10R
       /                     /
     5    <- new           5    <- new
    uncle 30 is red       uncle is an empty link: black
```

A red-black insert colours the new node {{c1::red::a colour}}, so no
path gains a black node; the only rule it can break involves its
parent's colour. If the parent's sibling (the uncle) is red, as on the left, a
{{c2::recolouring::a change that moves no node}} fixes it: parent and
uncle turn black, the grandparent red, and the check moves two levels up.
If the uncle is black, as on the right, one or two {{c3::rotations::a local restructuring}}
plus a colour fix-up finish the repair there.
