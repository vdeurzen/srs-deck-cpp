---
id: tree-inorder-iterative-worked
kind: basic
version: 1
level: 2
tags: [trees, traversal, worked-example]
requires:
  - tree-traversal-orders
  - linear-stack-adt
refs:
  - https://leetcode.com/problems/binary-tree-inorder-traversal/
  - Knuth, The Art of Computer Programming, Vol. 1, 3rd ed., §2.3.1, Algorithm T
---

Inorder without recursion: `cur` starts at the root, and a stack holds
nodes. Each pass: dive left, pushing every node met; pop one and visit
it; step to its right child. Repeat while `cur` is a node or the stack
is not empty.

```text
    2        pass  dive pushes  pop, visit  cur after  stack after  out
   / \       1     2, 1         1           null       2            1
  1   3      2     —            2           3          (empty)      1 2
             3     3            3           null       (empty)      1 2 3
```

## After pass 1, `cur` is null. Why does the loop run again?

---

**The stack still holds 2, whose visit and right subtree are pending.**

A pushed node waits for its left subtree, exactly as a recursive call
would. Only when `cur` is null *and* the stack is empty is every node
visited; after pass 3 both hold.
