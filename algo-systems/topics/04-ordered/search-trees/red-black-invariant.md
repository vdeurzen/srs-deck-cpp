---
id: ordered-red-black-invariant
kind: cloze
version: 1
level: 3
tags: [trees]
requires:
  - ordered-balance-families
refs:
  - https://doi.org/10.1109/SFCS.1978.3
  - https://docs.kernel.org/core-api/rbtree.html
---

A red-black tree enforces two rules: no red node has a
{{c1::red child::a colour constraint}}, and every path from a node down
to a null leaf passes the same number of {{c2::black nodes::what is counted}}.
The longest root-to-null path can therefore be at most
{{c3::twice::a ratio}} as long as the shortest, which bounds the height by 2 log₂(n + 1).
