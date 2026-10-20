---
id: tree-bst-delete-cases
kind: cloze
version: 2
level: 2
tags: [trees, bst]
elaborate: "Why would the in-order predecessor work just as well as the successor here? Say which subtree it comes from."
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree#Deletion
requires:
  - tree-bst-delete-two-worked
---

```
       50
      /  \
    30    70
         /
       60
         \
          65
```

Deleting 50, which has two children, copies in its
{{c1::in-order successor::a node named by its place in sorted order}},
here 60, and then removes 60 instead, by the one-child case: 65 takes
60's place.

---

The successor is the smallest key in 50's right subtree. Copying it up
keeps every key on the left smaller and every key on the right larger.
