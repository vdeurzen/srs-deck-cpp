---
id: tree-red-black-insert-fixup
kind: cloze
version: 1
level: 3
tags: [trees, red-black, rotations, invariants]
requires:
  - tree-red-black-invariant
  - tree-rotation
elaborate: Say in one sentence, as to an interviewer, why the red-uncle case can move the problem up the tree while the black-uncle case always ends it.
refs:
  - https://doi.org/10.1109/SFCS.1978.3
  - https://docs.kernel.org/core-api/rbtree.html
---

```
       20B        B = black, R = red
      /   \
    10R    30R    <- the uncle
    /
   5   <- new
```

An insert colours the new node {{c1::red::a colour}}, so no path gains a
black node. If its parent and uncle (the parent's sibling) are both red,
as here, a {{c2::recolouring::a change that moves no node}}
fixes it and moves the check two levels up. If the uncle is black (an
empty link counts as black), one or two {{c3::rotations::a local restructuring}}
end the repair.
