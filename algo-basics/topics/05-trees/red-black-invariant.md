---
id: tree-red-black-invariant
kind: cloze
version: 1
level: 3
tags: [trees, red-black, invariants]
requires:
  - interview-essentials/tree-balance-families
elaborate: Which C++ standard containers are usually built on this tree, and what guarantee do they get from its height bound?
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

A red-black tree has a black root and two rules. A red node never has a
{{c1::red child::a colour constraint}}. Every path from a node down to an
empty link passes the same number of {{c2::black nodes::what is counted}}
(two from 10 here, counting 10). So no such path is more than
{{c3::twice::a ratio}} as long as another: height O(log n).
