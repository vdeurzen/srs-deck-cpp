---
id: tree-terms-height
kind: cloze
version: 1
level: 1
tags: [trees, vocabulary]
requires:
  - tree-terms
elaborate: "Say aloud how you would state a tree's height so that an interviewer who counts levels instead of edges agrees with your number."
refs:
  - https://xlinux.nist.gov/dads/HTML/height.html
  - https://en.wikipedia.org/wiki/Tree_(data_structure)
---

```
        8
       / \
      4   9
     / \
    2   6
       /
      5
```

A tree's height counts the edges on its longest path from the root down
to a leaf, so this tree's height is {{c1::3::a number}}.

---

The longest path is 8 → 4 → 6 → 5: three edges. A lone node has height
0, and by convention the empty tree has height −1. Some texts count the
nodes on that path (levels) and get one more, so say which you mean.
