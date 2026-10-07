---
id: tree-red-black-invariant
kind: cloze
version: 1
level: 3
tags: [trees, red-black, invariants]
requires:
  - tree-balance-families
refs:
  - https://doi.org/10.1109/SFCS.1978.3
  - https://docs.kernel.org/core-api/rbtree.html
---

```
           10B
          /   \
        5R     15B         B = black, R = red
       /  \
     3B    7B
```

A red-black tree colours each node, with a black root, and keeps two
rules. A red node never has a {{c1::red child::a colour constraint}}.
Every path from a node down to an empty link passes the same number of
{{c2::black nodes::what is counted}} (counting the starting node and not the empty link: two on every path from 10 here).
So the shortest path can be all black and the longest can at most
alternate red and black: no path is more than {{c3::twice::a ratio}} as
long as another, which keeps the height within 2 log₂(n + 1).
