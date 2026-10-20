---
id: tree-bst-search-worked
kind: basic
version: 1
level: 1
tags: [trees, bst, worked-example]
requires:
  - interview-essentials/tree-bst-rule
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree#Searching
---

## Searching this BST for 6: at each node, stop on a match, else go left if 6 is smaller and right if it is larger.

```
      8
     / \
    4   12
   / \
  2   6
```

| at | compare | next |
|---|---|---|
| 8 | 6 < 8 | left, to 4 |
| 4 | 6 > 4 | right, to 6 |
| 6 | 6 == 6 | found, 3 nodes compared |

Why may the search skip 12 without ever comparing 6 against it?

---

**Every key in 8's right subtree is larger than 8, so none can be 6.**

The BST rule holds at every node, so one comparison rules out a whole
subtree. Each step goes one level down, so a search never compares more
nodes than the tree has levels.
