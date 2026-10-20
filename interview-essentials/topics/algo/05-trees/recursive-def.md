---
id: tree-recursive-def
kind: basic
version: 1
level: 1
tags: [foundations, trees, recursion]
elaborate: Which function you have written had "nothing" as its base case and "one piece plus smaller copies of the whole" as its recursive case?
refs:
  - https://xlinux.nist.gov/dads/HTML/binarytree.html
  - https://en.wikipedia.org/wiki/Binary_tree#Recursive_definition
  - https://oeis.org/A000108
---

## A binary tree is either empty, or a node with a left binary tree and a right binary tree. How many different binary trees have exactly 2 nodes?

---

**2: the second node is either the root's left subtree or its right one.**

```
  o
 /
o
```

```
o
 \
  o
```

Left and right are different places, so the same two nodes make two
trees. Every tree question splits like this: a root plus two smaller
trees, down to the empty one.
