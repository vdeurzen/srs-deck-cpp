---
id: tree-depth-vs-height
kind: basic
version: 1
level: 1
tags: [foundations, trees, vocabulary]
requires:
  - tree-recursive-def
refs:
  - https://xlinux.nist.gov/dads/HTML/depth.html
  - https://xlinux.nist.gov/dads/HTML/height.html
---

## Counting levels (the root has depth 1, a leaf has height 1), what are node p's depth and height?

```
        k
       / \
      c   p
         / \
        m   x
             \
              z
```

---

**Depth 2, height 3: depth counts down from the root, height up from below.**

Depth says where a node sits; height says how much hangs under it. They
meet at the extremes: the tree's height is the root's height, which
equals the largest depth, 4 here. Texts that count edges instead say
depth 1, height 2.
